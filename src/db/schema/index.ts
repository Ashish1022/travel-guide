import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, pgEnum, uuid, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const budgetRangeEnum = pgEnum("budget_range", ["budget", "moderate", "luxury"]);
export const tripStatusEnum = pgEnum("trip_status", ["draft", "planned", "ongoing", "completed", "cancelled"]);
export const mealTypeEnum = pgEnum("meal_type", ["breakfast", "lunch", "dinner", "snack"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const trips = pgTable("trips", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),

    destination: varchar("destination", { length: 255 }).notNull(),
    numberOfDays: integer("number_of_days").notNull(),
    numberOfPeople: integer("number_of_people").notNull(),
    budget: text("budget").notNull(),
    interests: text("interests").array(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const itineraries = pgTable("itineraries", {
    id: uuid("id").primaryKey().defaultRandom(),
    tripId: uuid("trip_id").references(() => trips.id, { onDelete: "cascade" }).notNull(),

    destination: varchar("destination", { length: 255 }).notNull(),
    destinationImage: text("destination_image"),
    duration: integer("duration").notNull(),
    bestTime: varchar("best_time", { length: 255 }),

    estimatedBudgetTotal: varchar("estimated_budget_total", { length: 100 }),
    estimatedBudgetPerPerson: varchar("estimated_budget_per_person", { length: 100 }),
    budgetAccommodation: varchar("budget_accommodation", { length: 100 }),
    budgetFood: varchar("budget_food", { length: 100 }),
    budgetTransportation: varchar("budget_transportation", { length: 100 }),
    budgetActivities: varchar("budget_activities", { length: 100 }),

    travelTips: text("travel_tips").array(),
    localCurrency: varchar("local_currency", { length: 100 }),
    localLanguage: varchar("local_language", { length: 100 }),
    localTransport: text("local_transport"),
    localSafety: text("local_safety"),

    isFavorite: boolean("is_favorite").default(false),
    rating: integer("rating"),

    itinerary: jsonb("itinerary"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const highlights = pgTable("highlights", {
    id: uuid("id").primaryKey().defaultRandom(),
    itineraryId: uuid("itinerary_id").references(() => itineraries.id, { onDelete: "cascade" }).notNull(),

    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    estimatedCost: varchar("estimated_cost", { length: 100 }),
    image: text("image"),
    orderIndex: integer("order_index").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const itineraryDays = pgTable("itinerary_days", {
    id: uuid("id").primaryKey().defaultRandom(),
    itineraryId: uuid("itinerary_id").references(() => itineraries.id, { onDelete: "cascade" }).notNull(),

    dayNumber: integer("day_number").notNull(),
    title: varchar("title", { length: 255 }).notNull(),

    accommodationType: varchar("accommodation_type", { length: 255 }),
    accommodationPriceRange: varchar("accommodation_price_range", { length: 100 }),
    accommodationArea: varchar("accommodation_area", { length: 255 }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activities = pgTable("activities", {
    id: uuid("id").primaryKey().defaultRandom(),
    itineraryDayId: uuid("itinerary_day_id").references(() => itineraryDays.id, { onDelete: "cascade" }).notNull(),

    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    duration: varchar("duration", { length: 100 }),
    cost: varchar("cost", { length: 100 }),
    location: varchar("location", { length: 255 }),
    image: text("image"),

    orderIndex: integer("order_index").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const meals = pgTable("meals", {
    id: uuid("id").primaryKey().defaultRandom(),
    itineraryDayId: uuid("itinerary_day_id").references(() => itineraryDays.id, { onDelete: "cascade" }).notNull(),

    type: mealTypeEnum("type").notNull(),
    suggestion: text("suggestion").notNull(),
    estimatedCost: varchar("estimated_cost", { length: 100 }),
    cuisine: varchar("cuisine", { length: 255 }),

    orderIndex: integer("order_index").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
    trips: many(trips),
}));

export const tripsRelations = relations(trips, ({ one, many }) => ({
    user: one(users, {
        fields: [trips.userId],
        references: [users.id],
    }),
    itineraries: many(itineraries),
}));

export const itinerariesRelations = relations(itineraries, ({ one, many }) => ({
    trip: one(trips, {
        fields: [itineraries.tripId],
        references: [trips.id],
    }),
    highlights: many(highlights),
    days: many(itineraryDays),
}));

export const highlightsRelations = relations(highlights, ({ one }) => ({
    itinerary: one(itineraries, {
        fields: [highlights.itineraryId],
        references: [itineraries.id],
    }),
}));

export const itineraryDaysRelations = relations(itineraryDays, ({ one, many }) => ({
    itinerary: one(itineraries, {
        fields: [itineraryDays.itineraryId],
        references: [itineraries.id],
    }),
    activities: many(activities),
    meals: many(meals),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
    itineraryDay: one(itineraryDays, {
        fields: [activities.itineraryDayId],
        references: [itineraryDays.id],
    }),
}));

export const mealsRelations = relations(meals, ({ one }) => ({
    itineraryDay: one(itineraryDays, {
        fields: [meals.itineraryDayId],
        references: [itineraryDays.id],
    }),
}));

export type ItineraryWithDetails = {
    itinerary: typeof itineraries.$inferSelect;
    highlights: Array<typeof highlights.$inferSelect>;
    days: Array<{
        day: typeof itineraryDays.$inferSelect;
        activities: Array<typeof activities.$inferSelect>;
        meals: Array<typeof meals.$inferSelect>;
    }>;
};

export type InsertItineraryFromAI = {
    tripId: string;
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
            type: "breakfast" | "lunch" | "dinner" | "snack";
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
};