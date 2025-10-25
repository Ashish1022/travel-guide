"use client";

import React, { JSX } from "react";
import { useRouter } from "next/navigation";
import { Plane, MapPin, Calendar, Sparkles, TrendingUp, Globe } from "lucide-react";
import { suggestedTrips } from "@/constant/suggested-trips";
import { SuggestedTrip } from "@/types";


export default function LandingPage(): JSX.Element {
  const router = useRouter();

  const handleCreateTrip = (): void => {
    router.push("/create-trip");
  };

  const handleViewTrip = (tripId: number): void => {
    router.push(`/suggested-trip?id=${tripId}`);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#F54927] via-[#E54520] to-[#D63516]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16 pt-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Plane className="w-12 h-12 text-white" />
            <h1 className="text-6xl font-extrabold text-white">TripCraft</h1>
          </div>
          <p className="text-white/90 text-2xl mb-8 max-w-2xl mx-auto">
            Your AI-powered travel companion for unforgettable journeys
          </p>
          <button
            onClick={handleCreateTrip}
            className="bg-white text-[#F54927] hover:bg-white/90 px-10 py-7 text-xl rounded-2xl font-bold shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="w-6 h-6 mr-2 inline" />
            Create Your Dream Trip
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#1E1E1E] rounded-3xl p-8 text-center hover:bg-[#252525] transition-all hover:scale-105 duration-300">
            <div className="w-16 h-16 bg-linear-to-br from-[#F54927] to-[#D63516] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Personalized Itineraries</h3>
            <p className="text-white/70">Tailored travel plans based on your interests and budget</p>
          </div>

          <div className="bg-[#1E1E1E] rounded-3xl p-8 text-center hover:bg-[#252525] transition-all hover:scale-105 duration-300">
            <div className="w-16 h-16 bg-linear-to-br from-[#F54927] to-[#D63516] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Day-by-Day Planning</h3>
            <p className="text-white/70">Detailed schedules with activities, meals, and accommodations</p>
          </div>

          <div className="bg-[#1E1E1E] rounded-3xl p-8 text-center hover:bg-[#252525] transition-all hover:scale-105 duration-300">
            <div className="w-16 h-16 bg-linear-to-br from-[#F54927] to-[#D63516] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Local Insights</h3>
            <p className="text-white/70">Cost estimates, travel tips, and cultural information</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-white" />
            <h2 className="text-4xl font-bold text-white">Popular Destinations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedTrips.map((trip: SuggestedTrip) => (
              <div
                key={trip.id}
                className="bg-[#1E1E1E] rounded-2xl overflow-hidden hover:bg-[#252525] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] cursor-pointer group border border-white/5 hover:border-[#F54927]/50"
                onClick={() => handleViewTrip(trip.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#1E1E1E] to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-[#F54927] rounded-full text-white text-xs font-bold shadow-lg">
                      {trip.budget}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{trip.destination}</h3>

                  <div className="flex items-center gap-2 mb-3 text-white/70 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{trip.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.highlights.map((highlight: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#2A2A2A] text-white/80 text-xs rounded-lg border border-white/5"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <button
                    className="w-full bg-linear-to-r from-[#F54927] to-[#D63516] hover:from-[#d63d1f] hover:to-[#c02d15] text-white font-semibold py-2 rounded-xl transition-all hover:shadow-lg"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleViewTrip(trip.id);
                    }}
                  >
                    View Itinerary
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-3xl p-12 text-center mt-16 border border-white/10">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Explore?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let our AI create a personalized travel itinerary just for you. From budget planning to daily activities, we've got you covered.
          </p>
          <button
            onClick={handleCreateTrip}
            className="bg-linear-to-r from-[#F54927] to-[#D63516] hover:from-[#d63d1f] hover:to-[#c02d15] text-white px-12 py-7 text-xl rounded-2xl font-bold shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105"
          >
            Start Planning Now
          </button>
        </div>
      </div>
    </div>
  );
}