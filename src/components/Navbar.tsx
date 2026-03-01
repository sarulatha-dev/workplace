"use client";

import { useGameStore } from "@/store/gameStore";
import { Heart, Trophy, Zap, Home, Shield } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const { xp, lives, streak, league } = useGameStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-duo-gray/10 h-16 flex items-center px-4 md:px-8 justify-between">
            <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-duo-blue rounded-xl flex items-center justify-center font-black text-white text-2xl shadow-[0_3px_0_0_#1899D6] group-hover:scale-105 transition-transform">W</div>
                <div className="flex flex-col">
                    <span className="font-display font-black text-xl leading-none text-duo-dark tracking-tight">WorkEtiq</span>
                    <span className="text-[10px] font-black text-duo-blue uppercase tracking-widest leading-none">Learning Edition</span>
                </div>
            </Link>

            <div className="flex items-center gap-4 md:gap-8 justify-end">
                {mounted ? (
                    <>
                        <Link href="/" className="p-2 text-duo-gray hover:text-duo-blue transition-colors">
                            <Home size={28} strokeWidth={3} />
                        </Link>

                        <Link href="/leaderboard" className="flex items-center gap-2 font-black group px-3 py-1 bg-duo-blue/10 rounded-2xl border-2 border-duo-blue/20" title="Current League">
                            <Shield size={20} className="text-duo-blue" />
                            <span className="text-sm text-duo-blue uppercase tracking-tighter">{league}</span>
                        </Link>

                        <div className="flex items-center gap-2 font-black group px-3 py-1 bg-duo-yellow/10 rounded-2xl border-2 border-duo-yellow/20" title="XP Points">
                            <Zap size={20} fill="#FFC800" className="text-duo-yellow" />
                            <span className="text-lg text-duo-dark">{xp}</span>
                        </div>

                        <div className="flex items-center gap-2 font-black group px-3 py-1 bg-duo-orange/10 rounded-2xl border-2 border-duo-orange/20" title="Lives">
                            <Heart size={20} fill="#FF4B4B" className="text-duo-orange" />
                            <span className="text-lg text-duo-dark">{lives}</span>
                        </div>

                        <div className="flex items-center gap-2 font-black group px-3 py-1 bg-duo-green/10 rounded-2xl border-2 border-duo-green/20" title="Daily Streak">
                            <Trophy size={20} fill="#58CC02" className="text-duo-green" />
                            <span className="text-lg text-duo-dark">{streak}</span>
                        </div>
                    </>
                ) : (
                    <div className="h-10 w-48 bg-gray-100 animate-pulse rounded-2xl" />
                )}
            </div>
        </nav>
    );
};
