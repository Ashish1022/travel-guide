import * as z from "zod";

export const tripFormSchema = z.object({
    destination: z.string().min(2, "Destination must be at least 2 characters").max(100, "Destination is too long"),
    startDate: z.date({
        message: "Start date is required",
    }),
    endDate: z.date({
        message: "End date is required",
    }),
    persons: z.number().min(1, "At least 1 person required").max(50, "Maximum 50 persons allowed"),
    interest: z.enum(["adventure", "relaxation", "cultural", "family", "romantic"], {
        message: "Please select an interest",
    }),
    budget: z.enum(["budget", "moderate", "luxury"], {
        message: "Please select a budget",
    }),
}).refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
});

export type TripFormValues = z.infer<typeof tripFormSchema>;