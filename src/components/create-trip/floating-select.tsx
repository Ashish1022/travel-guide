"use client";

import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FloatingSelectProps {
    field: any;
    label: string;
    options: { value: string; label: string }[];
}

export const FloatingSelect = ({ field, label, options }: FloatingSelectProps) => {
    return (
        <FormItem className="relative">
            <FormLabel
                className={cn(
                    "absolute left-4 pointer-events-none transition-all duration-300 z-10",
                    field.value ? "top-1 text-xs text-[#F54927]" : "top-3 text-base text-white/60"
                )}
            >
                {label}
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                    <SelectTrigger className="bg-[#2A2A2A] text-white text-base rounded-lg w-full px-4 py-6 h-14 flex items-center transition-all duration-300 border-0 focus:ring-2 focus:ring-[#F54927]">
                        <SelectValue />
                    </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#2A2A2A] text-white border border-white/10">
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="focus:bg-white/10">
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <FormMessage className="text-red-400 text-sm mt-1" />
        </FormItem>
    );
};