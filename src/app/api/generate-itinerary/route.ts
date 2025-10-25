import { Activity, Highlight, Itinerary, RequestBody, UnsplashResponse } from "@/types"
import { GoogleGenAI } from "@google/genai"

export const maxDuration = 30

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

async function fetchPlaceImage(placeName: string, destination: string): Promise<string> {
    try {
        const query = encodeURIComponent(`${placeName} ${destination}`)
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape`,
            {
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
                }
            }
        )
        const data = await response.json() as UnsplashResponse
        return data.results[0]?.urls?.regular || ""
    } catch (error) {
        console.error("Error fetching image:", error)
        return ""
    }
}

async function fetchDestinationImage(destination: string): Promise<string> {
    try {
        const query = encodeURIComponent(destination)
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape`,
            {
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
                }
            }
        )
        const data = await response.json() as UnsplashResponse
        return data.results[0]?.urls?.regular || ""
    } catch (error) {
        console.error("Error fetching destination image:", error)
        return ""
    }
}

async function generateWithRetry(prompt: string, maxRetries = 3) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const stream = await ai.models.generateContentStream({
                model: "gemini-2.5-pro",
                contents: prompt,
            })
            return stream
        } catch (error) {
            const isLastAttempt = attempt === maxRetries - 1
            const errorObj = error as { status?: number; message?: string }
            const isOverloaded = errorObj?.status === 503 ||
                errorObj?.message?.includes('overloaded') ||
                errorObj?.message?.includes('UNAVAILABLE')

            if (isOverloaded && !isLastAttempt) {
                const waitTime = Math.pow(2, attempt + 1) * 1000
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

                        if (process.env.UNSPLASH_ACCESS_KEY) {
                            const destinationImage = await fetchDestinationImage(destination)
                            itinerary.destinationImage = destinationImage

                            if (itinerary.highlights && Array.isArray(itinerary.highlights)) {
                                const highlightPromises = itinerary.highlights.slice(0, 3).map(async (highlight: Highlight) => {
                                    if (highlight.name) {
                                        const image = await fetchPlaceImage(highlight.name, destination)
                                        highlight.image = image
                                    }
                                })
                                await Promise.all(highlightPromises)
                            }

                            if (itinerary.days && Array.isArray(itinerary.days)) {
                                for (const day of itinerary.days) {
                                    if (day.activities && Array.isArray(day.activities)) {
                                        const activityPromises = day.activities.slice(0, 2).map(async (activity: Activity) => {
                                            if (activity.name || activity.location) {
                                                const searchTerm = activity.location || activity.name
                                                const image = await fetchPlaceImage(searchTerm, destination)
                                                activity.image = image
                                            }
                                        })
                                        await Promise.all(activityPromises)
                                    }
                                }
                            }
                        }

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