import { Activity, Highlight, Itinerary, RequestBody, UnsplashResponse } from "@/types"
import { GoogleGenAI } from "@google/genai"

export const maxDuration = 30

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

interface PexelsResponse {
    photos?: Array<{
        src?: {
            large?: string;
        };
    }>;
}

interface WeatherResponse {
    main?: {
        temp?: number;
        humidity?: number;
    };
    weather?: Array<{
        main?: string;
        description?: string;
    }>;
}

// Fetch weather data
async function fetchWeather(destination: string): Promise<{
    temperature: string;
    condition: string;
    humidity: string;
    description: string;
} | null> {
    try {
        const query = encodeURIComponent(destination)
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        )

        if (!response.ok) {
            console.error(`Weather API error: ${response.status}`)
            return null
        }

        const data = await response.json() as WeatherResponse

        return {
            temperature: data.main?.temp ? `${Math.round(data.main.temp)}°C` : "N/A",
            condition: data.weather?.[0]?.main || "N/A",
            humidity: data.main?.humidity ? `${data.main.humidity}%` : "N/A",
            description: data.weather?.[0]?.description || "N/A"
        }
    } catch (error) {
        console.error("Error fetching weather:", error)
        return null
    }
}

// Use Pexels instead of Unsplash for better rate limits
async function fetchPlaceImagePexels(placeName: string, destination: string): Promise<string> {
    try {
        const query = encodeURIComponent(`${placeName} ${destination}`)
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${query}&per_page=1&orientation=landscape`,
            {
                headers: {
                    Authorization: process.env.PEXELS_API_KEY || ""
                }
            }
        )

        if (!response.ok) {
            console.error(`Pexels API error: ${response.status}`)
            return ""
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
            return ""
        }

        const data = await response.json() as PexelsResponse
        return data.photos?.[0]?.src?.large || ""
    } catch (error) {
        console.error("Error fetching image from Pexels:", error)
        return ""
    }
}

async function fetchDestinationImagePexels(destination: string): Promise<string> {
    try {
        const query = encodeURIComponent(destination)
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${query}&per_page=1&orientation=landscape`,
            {
                headers: {
                    Authorization: process.env.PEXELS_API_KEY || ""
                }
            }
        )

        if (!response.ok) {
            console.error(`Pexels API error: ${response.status}`)
            return ""
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
            return ""
        }

        const data = await response.json() as PexelsResponse
        return data.photos?.[0]?.src?.large || ""
    } catch (error) {
        console.error("Error fetching destination image from Pexels:", error)
        return ""
    }
}

async function generateWithRetry(prompt: string, maxRetries = 3) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const stream = await ai.models.generateContentStream({
                model: "gemini-2.5-flash",
                contents: prompt,
            })
            return stream
        } catch (error) {
            const isLastAttempt = attempt === maxRetries - 1
            const errorObj = error as { status?: number; message?: string }
            const isOverloaded = errorObj?.status === 503 ||
                errorObj?.message?.includes('overloaded') ||
                errorObj?.message?.includes('UNAVAILABLE')

            const isRateLimited = errorObj?.status === 429 ||
                errorObj?.message?.includes('RESOURCE_EXHAUSTED') ||
                errorObj?.message?.includes('quota')

            if ((isOverloaded || isRateLimited) && !isLastAttempt) {
                const waitTime = isRateLimited ? 60000 : Math.pow(2, attempt + 1) * 1000
                console.log(`Waiting ${waitTime}ms before retry...`)
                await new Promise(resolve => setTimeout(resolve, waitTime))
                continue
            }

            throw error
        }
    }
    throw new Error("Max retries exceeded")
}

export async function POST(request: Request) {
    try {
        const body = await request.json() as RequestBody
        const { destination, startDate, endDate, interests, budget, travelers } = body

        const start = new Date(startDate)
        const end = new Date(endDate)
        const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

        const prompt = `You are an expert travel planner. Create a detailed ${duration}-day travel itinerary for ${destination} for ${travelers} traveler(s) with a ${budget} budget.

User interests: ${interests}

CRITICAL: You must respond with ONLY valid JSON. Do not include any text before or after the JSON. Do not use markdown code blocks. Start directly with { and end with }.

Required JSON format:
{
  "destination": "${destination}",
  "duration": ${duration},
  "bestTime": "month/season",
  "estimatedBudget": {
    "total": "total budget range",
    "perPerson": "per person cost",
    "breakdown": {
      "accommodation": "cost range with description",
      "food": "daily food cost range",
      "transportation": "transport cost estimate",
      "activities": "activities cost range"
    }
  },
  "highlights": [
    {
      "name": "highlight name",
      "description": "brief description",
      "estimatedCost": "cost if applicable"
    }
  ],
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "activities": [
        {
          "name": "activity name",
          "description": "brief description",
          "duration": "estimated time",
          "cost": "estimated cost per person",
          "location": "specific location name"
        }
      ],
      "meals": [
        {
          "type": "Breakfast/Lunch/Dinner",
          "suggestion": "restaurant or food type",
          "estimatedCost": "cost per person",
          "cuisine": "cuisine type"
        }
      ],
      "accommodation": {
        "type": "hotel/hostel/resort type",
        "priceRange": "cost per night",
        "area": "recommended area/neighborhood"
      }
    }
  ],
  "travelTips": [
    "practical tip 1",
    "practical tip 2",
    "practical tip 3"
  ],
  "localInfo": {
    "currency": "local currency",
    "language": "primary language(s)",
    "transport": "main transportation options",
    "safety": "brief safety notes"
  }
}

Provide realistic cost estimates based on the ${budget} budget level (budget/moderate/luxury). Be specific with activity names and locations so images can be fetched. Return ONLY the JSON, nothing else.`

        const stream = await generateWithRetry(prompt)
        const encoder = new TextEncoder()
        let fullResponse = ""

        const readableStream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        const text = chunk.text
                        if (text) {
                            fullResponse += text
                            controller.enqueue(encoder.encode(text))
                        }
                    }

                    try {
                        let cleanedText = fullResponse.trim()

                        if (cleanedText.startsWith('```json')) {
                            cleanedText = cleanedText.slice(7)
                        } else if (cleanedText.startsWith('```')) {
                            cleanedText = cleanedText.slice(3)
                        }

                        if (cleanedText.endsWith('```')) {
                            cleanedText = cleanedText.slice(0, -3)
                        }

                        cleanedText = cleanedText.trim()
                        const itinerary = JSON.parse(cleanedText) as Itinerary

                        // Fetch all data in parallel with limited requests
                        const dataPromises = []

                        // 1. Fetch weather (1 request)
                        if (process.env.OPENWEATHER_API_KEY) {
                            dataPromises.push(
                                fetchWeather(destination)
                                    .then(weather => {
                                        if (weather) {
                                            itinerary.weather = weather
                                        }
                                    })
                                    .catch(err => console.error("Weather fetch failed:", err))
                            )
                        }

                        // 2. Fetch destination image (1 request)
                        if (process.env.PEXELS_API_KEY) {
                            dataPromises.push(
                                fetchDestinationImagePexels(destination)
                                    .then(img => {
                                        if (img) itinerary.destinationImage = img
                                    })
                                    .catch(err => console.error("Destination image failed:", err))
                            )

                            // 3. Fetch ONLY first 2 highlights (2 requests)
                            if (itinerary.highlights && Array.isArray(itinerary.highlights)) {
                                itinerary.highlights.slice(0, 2).forEach((highlight: Highlight, idx) => {
                                    if (highlight.name) {
                                        dataPromises.push(
                                            fetchPlaceImagePexels(highlight.name, destination)
                                                .then(img => {
                                                    if (img) highlight.image = img
                                                })
                                                .catch(err => console.error(`Highlight ${idx} image failed:`, err))
                                        )
                                    }
                                })
                            }

                            // 4. Fetch ONLY first activity of first day (1 request)
                            if (itinerary.days && Array.isArray(itinerary.days) && itinerary.days[0]) {
                                const firstDay = itinerary.days[0]
                                if (firstDay.activities && Array.isArray(firstDay.activities) && firstDay.activities[0]) {
                                    const firstActivity = firstDay.activities[0] as Activity
                                    const searchTerm = firstActivity.location || firstActivity.name
                                    if (searchTerm) {
                                        dataPromises.push(
                                            fetchPlaceImagePexels(searchTerm, destination)
                                                .then(img => {
                                                    if (img) firstActivity.image = img
                                                })
                                                .catch(err => console.error("First activity image failed:", err))
                                        )
                                    }
                                }
                            }
                        }

                        // Wait for all data fetches (max 5 requests total)
                        await Promise.allSettled(dataPromises)

                        const enhancedData = JSON.stringify({
                            type: 'images',
                            data: itinerary
                        })
                        controller.enqueue(encoder.encode(`\n\n__IMAGES__${enhancedData}`))
                    } catch (parseError) {
                        console.error("Error parsing or enhancing response:", parseError)
                    }

                    controller.close()
                } catch (error) {
                    console.error("Stream error:", error)
                    controller.error(error)
                }
            },
            cancel() {
                console.log("Stream cancelled by client")
            }
        })

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        })
    } catch (error) {
        console.error("Error generating itinerary:", error)

        const errorObj = error as { status?: number; message?: string }
        const errorMessage = errorObj?.status === 503 || errorObj?.message?.includes('overloaded')
            ? "The AI service is currently busy. Please try again in a few moments."
            : "Failed to generate itinerary. Please try again."

        return Response.json({
            error: errorMessage,
            details: errorObj?.message
        }, {
            status: errorObj?.status || 500
        })
    }
}