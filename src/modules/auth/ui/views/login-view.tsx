"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FloatingInput } from "@/components/create-trip/floating-input";
import { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export default function LoginPageView() {

    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const loginMutation = useMutation(trpc.auth.login.mutationOptions({
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
            router.push("/create-trip")
        },
    }))

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        loginMutation.mutate(data)
    }
    return (
        <div className="relative min-h-screen w-full bg-[#F54927] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_40%,rgba(0,0,0,0.05)_100%)] flex items-center justify-center px-6 py-10 overflow-hidden">
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
                    <h1 className="text-5xl font-extrabold leading-tight">Welcome Back</h1>
                    <p className="text-white/70 text-lg leading-relaxed">
                        Continue your travel journey. Log in to manage your trips and explore new destinations.
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => <FloatingInput field={field} label="Email Address" />}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => <FloatingInput field={field} label="Password" type="password" />}
                            />

                            <Button
                                type="submit"
                                className="relative w-full px-6 py-6 text-lg font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 before:absolute before:inset-0 before:rounded-xl before:border-t before:border-white/30 before:pointer-events-none"
                            >
                                Login
                            </Button>
                        </form>
                    </Form>

                    <div className="pt-4 flex flex-col sm:flex-row sm:justify-between text-sm text-white/70">
                        <p>
                            Don’t have an account?{" "}
                            <Link href="/register" className="text-white hover:text-white/90 underline underline-offset-4 transition">
                                Sign up
                            </Link>
                        </p>
                        <Link href="/" className="text-white hover:text-white/90 underline underline-offset-4 transition mt-2 sm:mt-0">
                            Back to Home
                        </Link>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 relative bg-[#2A2A2A] overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop"
                        alt="Login Travel"
                        fill
                        className="object-cover opacity-95 hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </div>
        </div>
    );
}
