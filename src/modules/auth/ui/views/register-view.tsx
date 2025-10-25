"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpSchema = z.object({
    otp: z.string().min(6, "Please enter the complete OTP code"),
});

type SignupFormData = z.infer<typeof signupSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

export default function RegisterPageView() {
    const [showOTP, setShowOTP] = useState(false);
    const [userData, setUserData] = useState<SignupFormData | null>(null);
    const [canResend, setCanResend] = useState(true);
    const [timer, setTimer] = useState(60);
    const router = useRouter();

    const trpc = useTRPC();

    const registerMutation = useMutation(
        trpc.auth.register.mutationOptions({
            onError: (error) => toast.error(error.message),
            onSuccess: (_, variables) => {
                setUserData(variables);
                setShowOTP(true);
                startResendTimer();
                toast.success("OTP sent to your email!");
            },
        })
    );

    const verifyMutation = useMutation(
        trpc.auth.verify.mutationOptions({
            onError: (error) => toast.error(error.message),
            onSuccess: () => {
                toast.success("Email verified successfully!");
                router.push("/create-trip");
            },
        })
    );

    const signupForm = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const otpForm = useForm<OTPFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const onSignupSubmit = (data: SignupFormData) => {
        registerMutation.mutate(data);
    };

    const onOTPSubmit = (data: OTPFormData) => {
        if (!userData) return;
        verifyMutation.mutate({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            otp: data.otp,
        });
    };

    const handleResendOTP = () => {
        if (userData?.email) {
            registerMutation.mutate(userData);
            startResendTimer();
        }
    };

    const startResendTimer = () => {
        setCanResend(false);
        setTimer(60);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
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
                <div className="w-full lg:w-1/2 relative bg-[#2A2A2A] overflow-hidden order-2 lg:order-1">
                    <Image
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop"
                        alt="Signup Travel"
                        fill
                        className="object-cover opacity-95 hover:scale-105 transition-transform duration-700"
                    />
                </div>

                <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center text-white space-y-8 order-1 lg:order-2">
                    {!showOTP ? (
                        <>
                            <div>
                                <h1 className="text-5xl font-extrabold leading-tight">
                                    Join the Journey
                                </h1>
                                <p className="text-white/70 text-lg leading-relaxed mt-4">
                                    Sign up to start planning your dream trips and exploring new
                                    destinations.
                                </p>
                            </div>

                            <Form {...signupForm}>
                                <form
                                    onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                                    className="space-y-6"
                                >
                                    <FormField
                                        control={signupForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/90">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="John Doe"
                                                        className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/40 h-12 rounded-xl"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-300" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={signupForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/90">Email Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/40 h-12 rounded-xl"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-300" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={signupForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/90">Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/40 h-12 rounded-xl"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-300" />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="relative w-full px-6 py-6 text-lg font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300"
                                        disabled={registerMutation.isPending}
                                    >
                                        {registerMutation.isPending ? "Sending OTP..." : "Sign Up"}
                                    </Button>
                                </form>
                            </Form>

                            <div className="pt-4 flex flex-col sm:flex-row sm:justify-between text-sm text-white/70">
                                <p>
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="text-white hover:text-white/90 underline underline-offset-4 transition"
                                    >
                                        Login
                                    </Link>
                                </p>
                                <Link
                                    href="/"
                                    className="text-white hover:text-white/90 underline underline-offset-4 transition mt-2 sm:mt-0"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                onClick={() => setShowOTP(false)}
                                className="text-white/70 hover:text-white hover:bg-white/10 flex items-center gap-2 text-sm w-fit px-0"
                            >
                                ← Back
                            </Button>

                            <div>
                                <h1 className="text-5xl font-extrabold leading-tight">
                                    Verify Your Email
                                </h1>
                                <p className="text-white/70 text-lg leading-relaxed mt-4">
                                    We've sent a 6-digit code to{" "}
                                    <span className="text-white font-medium">{userData?.email}</span>
                                </p>
                            </div>

                            <Form {...otpForm}>
                                <form
                                    onSubmit={otpForm.handleSubmit(onOTPSubmit)}
                                    className="space-y-8"
                                >
                                    <FormField
                                        control={otpForm.control}
                                        name="otp"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/90 text-base">
                                                    Enter OTP Code
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center justify-center">
                                                        <InputOTP
                                                            maxLength={6}
                                                            {...field}
                                                            containerClassName="gap-3 space-x-1"
                                                        >
                                                            <InputOTPGroup>
                                                                {[0, 1, 2].map((i) => (
                                                                    <InputOTPSlot
                                                                        key={i}
                                                                        index={i}
                                                                        className="w-14 h-16 text-2xl font-bold bg-white/10 backdrop-blur-md border-white/20 text-white data-[active=true]:border-white/40 data-[active=true]:ring-white/40 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                                                                    />
                                                                ))}
                                                            </InputOTPGroup>
                                                            <InputOTPSeparator className="text-white/40" />
                                                            <InputOTPGroup>
                                                                {[3, 4, 5].map((i) => (
                                                                    <InputOTPSlot
                                                                        key={i}
                                                                        index={i}
                                                                        className="w-14 h-16 text-2xl font-bold bg-white/10 backdrop-blur-md border-white/20 text-white data-[active=true]:border-white/40 data-[active=true]:ring-white/40 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                                                                    />
                                                                ))}
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-red-300 text-center" />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        disabled={otpForm.watch("otp").length !== 6 || verifyMutation.isPending}
                                        className="relative w-full px-6 py-6 text-lg font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 disabled:opacity-50"
                                    >
                                        {verifyMutation.isPending ? "Verifying..." : "Verify Email"}
                                    </Button>

                                    <div className="text-center">
                                        <p className="text-white/70 text-sm">
                                            Didn&apos;t receive the code?{" "}
                                            <Button
                                                type="button"
                                                variant="link"
                                                onClick={handleResendOTP}
                                                disabled={!canResend || registerMutation.isPending}
                                                className="text-white hover:text-white/90 underline underline-offset-4 transition font-medium p-0 h-auto"
                                            >
                                                {canResend
                                                    ? "Resend OTP"
                                                    : `Resend in ${timer}s`}
                                            </Button>
                                        </p>
                                    </div>
                                </form>
                            </Form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
