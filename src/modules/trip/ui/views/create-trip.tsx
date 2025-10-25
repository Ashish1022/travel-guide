"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FloatingInput } from "@/components/create-trip/floating-input";
import { CalendarButton } from "@/components/create-trip/calendar-button";
import { FloatingSelect } from "@/components/create-trip/floating-select";
import { tripFormSchema, TripFormValues } from "@/lib/validations/trip-form";
import { Skeleton } from "@/components/ui/skeleton";

import { useTRPC } from "@/trpc/client";

export const CreateTripView = ({ userId }: { userId: string }) => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

    const form = useForm<TripFormValues>({
        resolver: zodResolver(tripFormSchema),
        defaultValues: {
            destination: "",
            persons: undefined,
            interest: undefined,
            budget: undefined,
            startDate: undefined,
            endDate: undefined,
        },
        mode: "onSubmit",
    });

    const interestOptions = [
        { value: "adventure", label: "Adventure" },
        { value: "relaxation", label: "Relaxation" },
        { value: "cultural", label: "Cultural" },
        { value: "family", label: "Family" },
        { value: "romantic", label: "Romantic" },
    ];

    const budgetOptions = [
        { value: "budget", label: "Budget" },
        { value: "moderate", label: "Moderate" },
        { value: "luxury", label: "Luxury" },
    ];

    const createTripMutation = useMutation({
        ...trpc.trip.createTrip.mutationOptions({
            onError: (error) => {
                toast.error(error.message);
                setLoading(false);
            },
            onSuccess: async (data) => {
                await queryClient.invalidateQueries(trpc.trip.getUserTrips.queryFilter());
                toast.success("Trip created successfully!");
                if (data?.id) sessionStorage.setItem("tripId", data.id);
                router.push("/trip-results");
            },
        }),
    });

    const onSubmit = async (data: TripFormValues) => {
        setLoading(true);

        const numberOfDays =
            Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;

        const payload = {
            userId,
            destination: data.destination,
            numberOfDays,
            numberOfPeople: data.persons ?? 1,
            budget: data.budget ?? "moderate",
            interests: [data.interest ?? "adventure"],
        };

        const tripData = {
            destination: data.destination,
            startDate: data.startDate.toISOString(),
            endDate: data.endDate.toISOString(),
            interests: data.interest,
            budget: data.budget,
            travelers: data.persons,
        };
        sessionStorage.setItem("tripData", JSON.stringify(tripData));

        try {
            await createTripMutation.mutateAsync(payload);
        } catch (err) {
            console.error("createTrip mutate failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-[#F54927] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_40%,rgba(0,0,0,0.05)_100%)] flex items-center justify-center px-6 py-12 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/10 animate-pulse"
                        style={{
                            width: `${Math.random() * 80 + 20}px`,
                            height: `${Math.random() * 80 + 20}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-3xl overflow-hidden bg-[#1E1E1E] shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center text-white space-y-8">
                    <h1 className="text-5xl font-extrabold leading-tight">Create Your Trip</h1>
                    <p className="text-white/70 text-lg leading-relaxed">
                        Plan your next adventure with ease. Fill in the details below to start your journey.
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="destination"
                                render={({ field }) => <FloatingInput field={field} label="Travel Destination" />}
                            />

                            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => <CalendarButton field={field} label="Trip Start" />}
                                />

                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => <CalendarButton field={field} label="Trip End" />}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="persons"
                                render={({ field }) => <FloatingInput field={field} label="Number of Persons" type="number" />}
                            />

                            <FormField
                                control={form.control}
                                name="interest"
                                render={({ field }) => <FloatingSelect field={field} label="Interests" options={interestOptions} />}
                            />

                            <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => <FloatingSelect field={field} label="Budget" options={budgetOptions} />}
                            />

                            <Button
                                type="submit"
                                disabled={createTripMutation.isPending}
                                className="relative w-full px-6 py-6 text-lg font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 disabled:opacity-50"
                            >
                                {createTripMutation.isPending ? "Creating Trip..." : "Generate Itinerary"}
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="w-full lg:w-1/2 relative bg-[#2A2A2A] overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop"
                        alt="Trip Illustration"
                        className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </div>
        </div>
    );
};



export const CreateTripSkeleton = () => {
    return (
        <div className="relative min-h-screen w-full bg-[#F54927] flex items-center justify-center px-6 py-12 overflow-hidden">
            <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-3xl overflow-hidden bg-[#1E1E1E] shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center space-y-8">
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-3/4 bg-white/10" />
                        <Skeleton className="h-5 w-full bg-white/10" />
                        <Skeleton className="h-5 w-2/3 bg-white/10" />
                    </div>

                    <div className="space-y-6 mt-8">
                        <Skeleton className="h-14 w-full bg-white/10 rounded-xl" />
                        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0">
                            <Skeleton className="h-14 w-full bg-white/10 rounded-xl" />
                            <Skeleton className="h-14 w-full bg-white/10 rounded-xl" />
                        </div>
                        <Skeleton className="h-14 w-full bg-white/10 rounded-xl" />
                        <Skeleton className="h-14 w-full bg-white/10 rounded-xl" />
                        <Skeleton className="h-14 w-full bg-white/10 rounded-xl" />
                        <Skeleton className="h-16 w-full bg-white/10 rounded-xl" />
                    </div>
                </div>

                <div className="w-full lg:w-1/2 bg-[#2A2A2A] relative overflow-hidden">
                    <Skeleton className="absolute inset-0 w-full h-full bg-white/10" />
                </div>
            </div>
        </div>
    );
};
