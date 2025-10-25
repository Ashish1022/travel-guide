"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FloatingInputProps {
    field: any;
    label: string;
    type?: string;
}

export const FloatingInput = ({ field, label, type = "text" }: FloatingInputProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "number") {
            const value = e.target.value;
            field.onChange(value === "" ? undefined : Number(value));
        } else {
            field.onChange(e.target.value);
        }
    };

    return (
        <FormItem className="relative">
            <FormControl>
                <div className="relative w-full">
                    <Input
                        type={type}
                        value={field.value ?? ""}
                        onChange={handleChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        placeholder=" "
                        className="peer bg-[#2A2A2A] text-white px-4 pt-6 pb-2 h-14 text-base rounded-lg w-full transition-all duration-300 border-0 focus:ring-2 focus:ring-[#F54927] placeholder-transparent"
                    />
                    <FormLabel
                        className={cn(
                            "absolute left-4 transition-all duration-300 pointer-events-none",
                            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60",
                            "peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#F54927]",
                            field.value ? "top-1.5 text-xs text-[#F54927]" : "top-4 text-base text-white/60"
                        )}
                    >
                        {label}
                    </FormLabel>
                </div>
            </FormControl>
            <FormMessage className="text-red-400 text-sm mt-1" />
        </FormItem>
    );
};