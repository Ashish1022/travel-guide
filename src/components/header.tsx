"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        TripCraft
                    </span>
                </Link>


                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <Button
                            className="relative w-fit px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button
                            className="relative w-fit px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white hover:text-white/80 transition"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10">
                    <div className="flex flex-col items-center py-4 space-y-4">


                        <div className="flex flex-col gap-3 mt-4 w-4/5">
                            <Link href="/login" onClick={() => setMenuOpen(false)}>
                                <Button className="w-full px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/register" onClick={() => setMenuOpen(false)}>
                                <Button className="w-full px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
