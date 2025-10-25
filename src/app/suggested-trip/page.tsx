"use client";

import { JSX, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    DollarSign,
    Clock,
    Utensils,
    Hotel,
    Info,
    Star,
    Navigation
} from "lucide-react";
import { predefinedItineraries } from "@/constant/suggested-trips";
import type { TripData, Activity, Meal } from "@/types";

export const dynamic = "force-dynamic"

export default function SuggestedTripPage(): JSX.Element {
    const searchParams = useSearchParams();
    const [tripData, setTripData] = useState<TripData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const tripId = searchParams.get('id');
        if (tripId && tripId in predefinedItineraries) {
            setTripData(predefinedItineraries[tripId as unknown as keyof typeof predefinedItineraries]);
        }
        setLoading(false);
    }, [searchParams]);

    const handleBack = (): void => {
        window.location.href = "/";
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-linear-to-br from-[#F54927] to-[#D63516] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-white text-2xl font-bold">Loading your itinerary...</div>
                </div>
            </div>
        );
    }

    if (!tripData) {
        return (
            <div className="min-h-screen w-full bg-linear-to-br from-[#F54927] to-[#D63516] flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="text-white text-2xl font-bold mb-4">No trip selected</div>
                    <button
                        onClick={handleBack}
                        className="bg-white text-[#F54927] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-[#F54927] via-[#E54520] to-[#D63516] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={handleBack}
                    className="text-white hover:bg-white/10 mb-6 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Home</span>
                </button>

                <div className="bg-[#1E1E1E] rounded-3xl shadow-2xl overflow-hidden">
                    <div className="relative">
                        <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
                            <img
                                src={tripData.destinationImage}
                                alt={tripData.destination}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#1E1E1E] via-[#1E1E1E]/70 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
                            <div className="flex items-center gap-2 mb-3">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <span className="text-white/90 text-sm">Curated Itinerary</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-white">
                                {tripData.destination}
                            </h1>
                            <div className="flex flex-wrap gap-4 sm:gap-6 text-base sm:text-lg">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Calendar className="w-5 h-5 text-white" />
                                    <span className="text-white font-medium">{tripData.duration} Days</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <DollarSign className="w-5 h-5 text-white" />
                                    <span className="text-white font-medium">{tripData.estimatedBudget.total}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <MapPin className="w-5 h-5 text-white" />
                                    <span className="text-white font-medium">{tripData.bestTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-12 border-b border-white/10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <DollarSign className="w-8 h-8 text-[#F54927]" />
                            Budget Breakdown
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-linear-to-br from-[#2A2A2A] to-[#222] p-6 rounded-xl border border-white/5 hover:border-[#F54927]/50 transition-all">
                                <Hotel className="w-8 h-8 text-[#F54927] mb-3" />
                                <h3 className="text-white/60 text-sm mb-1">Accommodation</h3>
                                <p className="text-white font-bold text-xl">{tripData.estimatedBudget.breakdown.accommodation}</p>
                            </div>
                            <div className="bg-linear-to-br from-[#2A2A2A] to-[#222] p-6 rounded-xl border border-white/5 hover:border-[#F54927]/50 transition-all">
                                <Utensils className="w-8 h-8 text-[#F54927] mb-3" />
                                <h3 className="text-white/60 text-sm mb-1">Food & Dining</h3>
                                <p className="text-white font-bold text-xl">{tripData.estimatedBudget.breakdown.food}</p>
                            </div>
                            <div className="bg-linear-to-br from-[#2A2A2A] to-[#222] p-6 rounded-xl border border-white/5 hover:border-[#F54927]/50 transition-all">
                                <Navigation className="w-8 h-8 text-[#F54927] mb-3" />
                                <h3 className="text-white/60 text-sm mb-1">Transportation</h3>
                                <p className="text-white font-bold text-xl">{tripData.estimatedBudget.breakdown.transportation}</p>
                            </div>
                            <div className="bg-linear-to-br from-[#2A2A2A] to-[#222] p-6 rounded-xl border border-white/5 hover:border-[#F54927]/50 transition-all">
                                <Star className="w-8 h-8 text-[#F54927] mb-3" />
                                <h3 className="text-white/60 text-sm mb-1">Activities</h3>
                                <p className="text-white font-bold text-xl">{tripData.estimatedBudget.breakdown.activities}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-12 border-b border-white/10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Star className="w-8 h-8 text-[#F54927]" />
                            Trip Highlights
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tripData.highlights.map((highlight, index) => (
                                <div
                                    key={index}
                                    className="bg-linear-to-br from-[#2A2A2A] to-[#222] rounded-xl overflow-hidden border border-white/5 hover:border-[#F54927]/50 transition-all hover:scale-105 duration-300"
                                >
                                    <div className="relative w-full h-52 overflow-hidden">
                                        <img
                                            src={highlight.image}
                                            alt={highlight.name}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 right-3 bg-[#F54927] text-white px-3 py-1 rounded-full text-sm font-bold">
                                            {highlight.estimatedCost}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-white font-bold text-lg mb-2">{highlight.name}</h3>
                                        <p className="text-white/70 text-sm leading-relaxed">{highlight.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 sm:p-12 space-y-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <Calendar className="w-8 h-8 text-[#F54927]" />
                            Daily Itinerary
                        </h2>
                        {tripData.days.map((day) => (
                            <div
                                key={day.day}
                                className="bg-linear-to-br from-[#2A2A2A] to-[#222] rounded-2xl p-6 sm:p-8 space-y-6 border border-white/5 hover:border-[#F54927]/30 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#F54927] to-[#D63516] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        {day.day}
                                    </div>
                                    <div>
                                        <p className="text-[#F54927] text-sm font-semibold">Day {day.day}</p>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white">{day.title}</h3>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[#F54927] font-semibold text-lg mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5" />
                                        Activities
                                    </h4>
                                    <div className="space-y-4">
                                        {day.activities.map((activity: Activity, idx: number) => (
                                            <div key={idx} className="bg-[#1E1E1E] rounded-xl p-4 flex flex-col sm:flex-row gap-4 border border-white/5">
                                                <div className="relative w-full sm:w-36 h-36 shrink-0 rounded-lg overflow-hidden">
                                                    <img
                                                        src={activity.image}
                                                        alt={activity.name}
                                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h5 className="text-white font-bold text-lg mb-2">{activity.name}</h5>
                                                    <p className="text-white/70 text-sm mb-3 leading-relaxed">{activity.description}</p>
                                                    <div className="flex flex-wrap gap-3 text-sm">
                                                        <span className="text-white/60 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
                                                            <Clock className="w-4 h-4" />
                                                            {activity.duration}
                                                        </span>
                                                        <span className="text-[#F54927] font-bold flex items-center gap-1.5 bg-[#F54927]/10 px-3 py-1 rounded-full">
                                                            <DollarSign className="w-4 h-4" />
                                                            {activity.cost}
                                                        </span>
                                                        <span className="text-white/60 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
                                                            <MapPin className="w-4 h-4" />
                                                            {activity.location}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[#F54927] font-semibold text-lg mb-3 flex items-center gap-2">
                                        <Utensils className="w-5 h-5" />
                                        Meals
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {day.meals.map((meal: Meal, idx: number) => (
                                            <div key={idx} className="bg-[#1E1E1E] p-4 rounded-xl border border-white/5 hover:border-[#F54927]/30 transition-all">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-2 h-2 rounded-full bg-[#F54927]"></div>
                                                    <span className="text-white font-bold text-sm">{meal.type}</span>
                                                </div>
                                                <p className="text-white/90 text-sm mb-2 font-medium">{meal.suggestion}</p>
                                                <p className="text-white/50 text-xs mb-2 italic">{meal.cuisine}</p>
                                                <p className="text-[#F54927] font-bold text-sm">{meal.estimatedCost}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[#F54927] font-semibold text-lg mb-3 flex items-center gap-2">
                                        <Hotel className="w-5 h-5" />
                                        Accommodation
                                    </h4>
                                    <div className="bg-[#1E1E1E] p-5 rounded-xl border border-white/5">
                                        <div className="space-y-2">
                                            <p className="text-white font-bold text-base">{day.accommodation.type}</p>
                                            <div className="flex flex-wrap gap-4 text-sm">
                                                <span className="text-white/70 flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4 text-[#F54927]" />
                                                    {day.accommodation.area}
                                                </span>
                                                <span className="text-[#F54927] font-bold flex items-center gap-1.5">
                                                    <DollarSign className="w-4 h-4" />
                                                    {day.accommodation.priceRange}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 sm:p-12 border-t border-white/10 space-y-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <Info className="w-8 h-8 text-[#F54927]" />
                                Travel Tips
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tripData.travelTips.map((tip: string, idx: number) => (
                                    <div key={idx} className="bg-linear-to-br from-[#2A2A2A] to-[#222] p-5 rounded-xl text-white/90 flex items-start gap-3 border border-white/5 hover:border-[#F54927]/50 transition-all">
                                        <div className="w-6 h-6 rounded-full bg-[#F54927] flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-white text-xs font-bold">{idx + 1}</span>
                                        </div>
                                        <p className="leading-relaxed">{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <Navigation className="w-8 h-8 text-[#F54927]" />
                                Local Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-linear-to-br from-[#2A2A2A] to-[#222] p-6 rounded-xl border border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-[#F54927]/10 flex items-center justify-center mb-3">
                                        <DollarSign className="w-6 h-6 text-[#F54927]" />
                                    </div>
                                    <h3 className="text-[#F54927] font-bold mb-2 text-sm">Currency</h3>
                                    <p className="text-white/90 text-sm leading-relaxed">{tripData.localInfo.currency}</p>
                                </div>
                                <div className="bg-linear-to-br from-[#2A2A2A] to-[#222] p-6 rounded-xl border border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-[#F54927]/10 flex items-center justify-center mb-3">
                                        <Info className="w-6 h-6 text-[#F54927]" />
                                    </div>
                                    <h3 className="text-[#F54927] font-bold mb-2 text-sm">Language</h3>
                                    <p className="text-white/90 text-sm leading-relaxed">{tripData.localInfo.language}</p>
                                </div>
                                <div className="bg-linear-to-br from-[#2A2A2A] to-[#222] p-6 rounded-xl border border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-[#F54927]/10 flex items-center justify-center mb-3">
                                        <Navigation className="w-6 h-6 text-[#F54927]" />
                                    </div>
                                    <h3 className="text-[#F54927] font-bold mb-2 text-sm">Transport</h3>
                                    <p className="text-white/90 text-sm leading-relaxed">{tripData.localInfo.transport}</p>
                                </div>
                                <div className="bg-linear-to-br from-[#2A2A2A] to-[#222] p-6 rounded-xl border border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-[#F54927]/10 flex items-center justify-center mb-3">
                                        <Info className="w-6 h-6 text-[#F54927]" />
                                    </div>
                                    <h3 className="text-[#F54927] font-bold mb-2 text-sm">Safety</h3>
                                    <p className="text-white/90 text-sm leading-relaxed">{tripData.localInfo.safety}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}