import { z } from "zod";
import { activities, highlights, InsertItineraryFromAI, itineraries, itineraryDays, meals, trips } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const tripRouter = createTRPCRouter({
    createTrip: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                destination: z.string().min(2),
                numberOfDays: z.number().min(1),
                numberOfPeople: z.number().min(1),
                budget: z.string(),
                interests: z.array(z.string()),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const newTrip = await ctx.db
                .insert(trips)
                .values({
                    userId: input.userId,
                    destination: input.destination,
                    numberOfDays: input.numberOfDays,
                    numberOfPeople: input.numberOfPeople,
                    budget: input.budget,
                    interests: input.interests,
                })
                .returning();

            return newTrip[0];
        }),

    getUserTrips: protectedProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.select().from(trips).where(eq(trips.userId, input.userId));
        }),

    saveItinerary: protectedProcedure
        .input(
            z.object({
                tripId: z.string(),
                itinerary: z.any(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const data = input.itinerary as InsertItineraryFromAI;

            const [itinerary] = await ctx.db
                .insert(itineraries)
                .values({
                    tripId: input.tripId,
                    destination: data.destination,
                    destinationImage: data.destinationImage,
                    duration: data.duration,
                    bestTime: data.bestTime,
                    estimatedBudgetTotal: data.estimatedBudget?.total,
                    estimatedBudgetPerPerson: data.estimatedBudget?.perPerson,
                    budgetAccommodation: data.estimatedBudget?.breakdown?.accommodation,
                    budgetFood: data.estimatedBudget?.breakdown?.food,
                    budgetTransportation: data.estimatedBudget?.breakdown?.transportation,
                    budgetActivities: data.estimatedBudget?.breakdown?.activities,
                    travelTips: data.travelTips,
                    localCurrency: data.localInfo?.currency,
                    localLanguage: data.localInfo?.language,
                    localTransport: data.localInfo?.transport,
                    localSafety: data.localInfo?.safety,
                })
                .returning();

            if (data.highlights?.length) {
                await ctx.db.insert(highlights).values(
                    data.highlights.map((h, i) => ({
                        itineraryId: itinerary.id,
                        name: h.name,
                        description: h.description,
                        estimatedCost: h.estimatedCost,
                        image: h.image,
                        orderIndex: i,
                    }))
                );
            }

            for (const day of data.days) {
                const [dayRecord] = await ctx.db
                    .insert(itineraryDays)
                    .values({
                        itineraryId: itinerary.id,
                        dayNumber: day.day,
                        title: day.title,
                        accommodationType: day.accommodation?.type,
                        accommodationPriceRange: day.accommodation?.priceRange,
                        accommodationArea: day.accommodation?.area,
                    })
                    .returning();

                if (day.activities?.length) {
                    await ctx.db.insert(activities).values(
                        day.activities.map((a, i) => ({
                            itineraryDayId: dayRecord.id,
                            name: a.name,
                            description: a.description,
                            duration: a.duration,
                            cost: a.cost,
                            location: a.location,
                            image: a.image,
                            orderIndex: i,
                        }))
                    );
                }

                if (day.meals?.length) {
                    await ctx.db.insert(meals).values(
                        day.meals.map((m, i) => ({
                            itineraryDayId: dayRecord.id,
                            type: m.type,
                            suggestion: m.suggestion,
                            estimatedCost: m.estimatedCost,
                            cuisine: m.cuisine,
                            orderIndex: i,
                        }))
                    );
                }
            }

            return itinerary;
        }),
});
