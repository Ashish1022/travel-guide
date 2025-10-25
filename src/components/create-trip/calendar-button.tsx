"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface CalendarButtonProps {
    field: any;
    label: string;
}

const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const CalendarButton = ({ field, label }: CalendarButtonProps) => {
    return (
        <FormItem className="relative w-full">
            <FormLabel
                className={cn(
                    "absolute left-4 pointer-events-none transition-all duration-300 z-10",
                    field.value ? "top-1.5 text-xs text-[#F54927]" : "top-4 text-base text-white/60"
                )}
            >
                {label}
            </FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-full h-14 text-base text-left bg-[#2A2A2A] rounded-lg px-4 transition-all duration-300 border-0 focus:ring-2 focus:ring-[#F54927] hover:bg-[#2A2A2A]",
                                field.value ? "pt-6 pb-2 text-white" : "pt-0 pb-0 text-transparent"
                            )}
                        >
                            {field.value ? formatDate(field.value) : "."}
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#2A2A2A] border border-white/10 rounded-xl shadow-lg">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        className="bg-[#2A2A2A] text-white rounded-xl"
                    />
                </PopoverContent>
            </Popover>
            <FormMessage className="text-red-400 text-sm mt-1" />
        </FormItem>
    );
};