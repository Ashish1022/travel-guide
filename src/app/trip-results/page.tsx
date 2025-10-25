"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Clock, Utensils, Hotel } from "lucide-react";
import { Loading } from "@/components/create-trip/loading";
import Image from "next/image";

interface Itinerary {
  destination: string;
  destinationImage?: string;
  duration: number;
  bestTime: string;
  estimatedBudget: {
    total: string;
    perPerson: string;
    breakdown: {
      accommodation: string;
      food: string;
      transportation: string;
      activities: string;
    };
  };
  highlights: Array<{
    name: string;
    description: string;
    estimatedCost?: string;
    image?: string;
  }>;
  days: Array<{
    day: number;
    title: string;
    activities: Array<{
      name: string;
      description: string;
      duration: string;
      cost: string;
      location: string;
      image?: string;
    }>;
    meals: Array<{
      type: string;
      suggestion: string;
      estimatedCost: string;
      cuisine: string;
    }>;
    accommodation: {
      type: string;
      priceRange: string;
      area: string;
    };
  }>;
  travelTips?: string[];
  localInfo?: {
    currency: string;
    language: string;
    transport: string;
    safety: string;
  };
}

const TripResults = () => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streamedText, setStreamedText] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const tripDataStr = sessionStorage.getItem("tripData");

        if (!tripDataStr) {
          router.push("/create-trip");
          return;
        }

        const tripData = JSON.parse(tripDataStr);

        const response = await fetch("/api/generate-itinerary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tripData),
        });

        if (!response.ok) {
          throw new Error("Failed to generate itinerary");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";
        let enhancedData = null;

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            accumulatedText += chunk;
            
            // Check for enhanced data with images
            if (chunk.includes('__IMAGES__')) {
              const parts = accumulatedText.split('__IMAGES__');
              const imagesText = parts[1];
              
              try {
                const enhanced = JSON.parse(imagesText);
                if (enhanced.type === 'images') {
                  enhancedData = enhanced.data;
                }
              } catch (e) {
                console.error('Error parsing enhanced data:', e);
              }
            }
            
            setStreamedText(accumulatedText);
          }

          // Parse the complete JSON
          try {
            let jsonData;
            
            if (enhancedData) {
              jsonData = enhancedData;
            } else {
              // Remove markdown code blocks if present
              let cleanedText = accumulatedText.trim();

              // Remove ```json or ``` at the start
              if (cleanedText.startsWith('```json')) {
                cleanedText = cleanedText.slice(7);
              } else if (cleanedText.startsWith('```')) {
                cleanedText = cleanedText.slice(3);
              }

              // Remove ``` at the end
              if (cleanedText.endsWith('```')) {
                cleanedText = cleanedText.slice(0, -3);
              }

              cleanedText = cleanedText.trim();
              jsonData = JSON.parse(cleanedText);
            }

            setItinerary(jsonData);
            setLoading(false);
          } catch (e) {
            console.error("Failed to parse JSON:", e);
            console.error("Accumulated text:", accumulatedText);
            setError("Failed to parse itinerary data");
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to generate itinerary. Please try again.");
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [router]);

  const handleBack = () => {
    router.push("/create-trip");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#F54927] flex items-center justify-center px-6">
        <div className="text-center space-y-6">
          <p className="text-white text-2xl font-bold">{error}</p>
          <Button
            onClick={handleBack}
            className="bg-white text-[#F54927] hover:bg-white/90 px-8 py-6 text-lg rounded-xl"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!itinerary) return null;

  return (
    <div className="min-h-screen w-full bg-[#F54927] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_40%,rgba(0,0,0,0.05)_100%)] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="text-white hover:bg-white/10 mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Form
        </Button>

        <div className="bg-[#1E1E1E] rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Header with Destination Image */}
          <div className="relative">
            {itinerary.destinationImage && (
              <div className="relative w-full h-80 overflow-hidden">
                <Image
                  src={itinerary.destinationImage}
                  alt={itinerary.destination}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/50 to-transparent" />
              </div>
            )}
            <div className={`${itinerary.destinationImage ? 'absolute bottom-0 left-0 right-0' : 'bg-linear-to-r from-[#F54927] to-[#d63d1f]'} p-12 text-white`}>
              <h1 className="text-5xl font-extrabold mb-4">{itinerary.destination}</h1>
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{itinerary.duration} Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span>{typeof itinerary.estimatedBudget === 'string' ? itinerary.estimatedBudget : itinerary.estimatedBudget.total}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Best Time: {itinerary.bestTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Breakdown */}
          {typeof itinerary.estimatedBudget !== 'string' && (
            <div className="p-12 border-b border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">Budget Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#2A2A2A] p-6 rounded-xl">
                  <Hotel className="w-8 h-8 text-[#F54927] mb-3" />
                  <h3 className="text-white/60 text-sm mb-1">Accommodation</h3>
                  <p className="text-white font-semibold text-lg">{itinerary.estimatedBudget.breakdown.accommodation}</p>
                </div>
                <div className="bg-[#2A2A2A] p-6 rounded-xl">
                  <Utensils className="w-8 h-8 text-[#F54927] mb-3" />
                  <h3 className="text-white/60 text-sm mb-1">Food</h3>
                  <p className="text-white font-semibold text-lg">{itinerary.estimatedBudget.breakdown.food}</p>
                </div>
                <div className="bg-[#2A2A2A] p-6 rounded-xl">
                  <MapPin className="w-8 h-8 text-[#F54927] mb-3" />
                  <h3 className="text-white/60 text-sm mb-1">Transportation</h3>
                  <p className="text-white font-semibold text-lg">{itinerary.estimatedBudget.breakdown.transportation}</p>
                </div>
                <div className="bg-[#2A2A2A] p-6 rounded-xl">
                  <DollarSign className="w-8 h-8 text-[#F54927] mb-3" />
                  <h3 className="text-white/60 text-sm mb-1">Activities</h3>
                  <p className="text-white font-semibold text-lg">{itinerary.estimatedBudget.breakdown.activities}</p>
                </div>
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="p-12 border-b border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Trip Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerary.highlights.map((highlight, index) => {
                const isString = typeof highlight === 'string';
                const name = isString ? highlight : highlight.name;
                const description = isString ? null : highlight.description;
                const cost = isString ? null : highlight.estimatedCost;
                const image = isString ? null : highlight.image;

                return (
                  <div
                    key={index}
                    className="bg-[#2A2A2A] rounded-xl overflow-hidden hover:bg-[#333] transition-colors"
                  >
                    {image && (
                      <div className="relative w-full h-48">
                        <Image
                          src={image}
                          alt={name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-white font-semibold text-lg mb-2">{name}</p>
                      {description && (
                        <p className="text-white/70 text-sm mb-2">{description}</p>
                      )}
                      {cost && (
                        <p className="text-[#F54927] font-semibold text-sm">{cost}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Itinerary */}
          <div className="p-12 space-y-8">
            <h2 className="text-3xl font-bold text-white mb-8">Daily Itinerary</h2>
            {itinerary.days.map((day) => (
              <div
                key={day.day}
                className="bg-[#2A2A2A] rounded-2xl p-8 space-y-6 hover:bg-[#333] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F54927] flex items-center justify-center text-white font-bold text-lg">
                    {day.day}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{day.title}</h3>
                </div>

                <div className="space-y-6">
                  {/* Activities */}
                  <div>
                    <h4 className="text-[#F54927] font-semibold text-lg mb-4">Activities</h4>
                    <div className="space-y-4">
                      {day.activities.map((activity, idx) => {
                        const isString = typeof activity === 'string';
                        const name = isString ? activity : activity.name;
                        const description = isString ? null : activity.description;
                        const duration = isString ? null : activity.duration;
                        const cost = isString ? null : activity.cost;
                        const location = isString ? null : activity.location;
                        const image = isString ? null : activity.image;

                        return (
                          <div key={idx} className="bg-[#1E1E1E] rounded-xl p-4 flex gap-4">
                            {image && (
                              <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={image}
                                  alt={name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h5 className="text-white font-semibold text-lg mb-2">{name}</h5>
                              {description && (
                                <p className="text-white/70 text-sm mb-3">{description}</p>
                              )}
                              <div className="flex flex-wrap gap-4 text-sm">
                                {duration && (
                                  <span className="text-white/60 flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {duration}
                                  </span>
                                )}
                                {cost && (
                                  <span className="text-[#F54927] font-semibold flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    {cost}
                                  </span>
                                )}
                                {location && (
                                  <span className="text-white/60 flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {location}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Meals */}
                  <div>
                    <h4 className="text-[#F54927] font-semibold text-lg mb-3">Meals</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {day.meals.map((meal, idx) => {
                        const isString = typeof meal === 'string';
                        const type = isString ? ['Breakfast', 'Lunch', 'Dinner'][idx] : meal.type;
                        const suggestion = isString ? meal : meal.suggestion;
                        const cost = isString ? null : meal.estimatedCost;
                        const cuisine = isString ? null : meal.cuisine;

                        return (
                          <div key={idx} className="bg-[#1E1E1E] p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <Utensils className="w-4 h-4 text-[#F54927]" />
                              <span className="text-white font-semibold text-sm">{type}</span>
                            </div>
                            <p className="text-white/80 text-sm mb-2">{suggestion}</p>
                            {cuisine && (
                              <p className="text-white/60 text-xs mb-1">{cuisine}</p>
                            )}
                            {cost && (
                              <p className="text-[#F54927] font-semibold text-sm">{cost}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Accommodation */}
                  <div>
                    <h4 className="text-[#F54927] font-semibold text-lg mb-3">Accommodation</h4>
                    <div className="bg-[#1E1E1E] p-4 rounded-xl">
                      {typeof day.accommodation === 'string' ? (
                        <p className="text-white/80">{day.accommodation}</p>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Hotel className="w-5 h-5 text-[#F54927]" />
                            <span className="text-white font-semibold">{day.accommodation.type}</span>
                          </div>
                          <p className="text-white/70 text-sm">Area: {day.accommodation.area}</p>
                          <p className="text-[#F54927] font-semibold">{day.accommodation.priceRange}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Travel Tips & Local Info */}
          {(itinerary.travelTips || itinerary.localInfo) && (
            <div className="p-12 border-t border-white/10 space-y-8">
              {itinerary.travelTips && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Travel Tips</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {itinerary.travelTips.map((tip, idx) => (
                      <div key={idx} className="bg-[#2A2A2A] p-4 rounded-xl text-white/90 flex items-start gap-3">
                        <span className="text-[#F54927] text-xl font-bold">•</span>
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {itinerary.localInfo && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Local Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#2A2A2A] p-6 rounded-xl">
                      <h3 className="text-[#F54927] font-semibold mb-2">Currency</h3>
                      <p className="text-white/90">{itinerary.localInfo.currency}</p>
                    </div>
                    <div className="bg-[#2A2A2A] p-6 rounded-xl">
                      <h3 className="text-[#F54927] font-semibold mb-2">Language</h3>
                      <p className="text-white/90">{itinerary.localInfo.language}</p>
                    </div>
                    <div className="bg-[#2A2A2A] p-6 rounded-xl">
                      <h3 className="text-[#F54927] font-semibold mb-2">Transport</h3>
                      <p className="text-white/90">{itinerary.localInfo.transport}</p>
                    </div>
                    <div className="bg-[#2A2A2A] p-6 rounded-xl">
                      <h3 className="text-[#F54927] font-semibold mb-2">Safety</h3>
                      <p className="text-white/90">{itinerary.localInfo.safety}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripResults;