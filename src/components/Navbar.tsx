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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b-[3px] border-white/20 h-20 flex items-center px-6 md:px-12 justify-between shadow-lg shadow-black/5">
            <Link href="/" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:shadow-md transition-all group-hover:scale-105 border border-slate-100">
                    <img src="/logo.png" alt="WorkEtiq Logo" className="w-9 h-9 object-contain" />
                </div>
                <div className="flex flex-col">
                    <span className="font-display font-black text-2xl leading-none text-duo-dark tracking-tighter uppercase italic">WorkEtiq</span>
                    <span className="text-[12px] font-black text-duo-blue uppercase tracking-[0.2em] leading-none mt-1 opacity-70">Learning Edition 2.0</span>
                </div>
            </Link>

            <div className="flex items-center gap-4 md:gap-6 justify-end">
                {mounted ? (
                    <>
                        <Link href="/" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100/50 text-duo-gray hover:text-duo-blue hover:bg-white transition-all hover:scale-110 shadow-sm">
                            <Home size={24} strokeWidth={3} />
                        </Link>

                        <Link href="/leaderboard" className="flex items-center gap-3 font-black group px-4 py-2 bg-duo-blue/5 backdrop-blur-md rounded-2xl border-2 border-duo-blue/20 hover:bg-duo-blue/10 transition-all shadow-sm" title="Current League">
                            <Shield size={20} className="text-duo-blue stroke-[3px]" />
                            <span className="text-sm text-duo-blue uppercase tracking-widest">{league}</span>
                        </Link>

                        <Link href="/hall-of-fame" className="flex items-center gap-3 font-black group px-4 py-2 bg-duo-yellow/5 backdrop-blur-md rounded-2xl border-2 border-duo-yellow/20 hover:bg-duo-yellow/10 transition-all shadow-sm" title="Hall of Fame">
                            <Trophy size={20} className="text-duo-yellow stroke-[3px]" />
                            <span className="text-sm text-duo-yellow uppercase tracking-widest hidden md:inline">Hall of Fame</span>
                        </Link>

                        <div className="flex items-center gap-3 font-black group px-4 py-2 bg-white/50 backdrop-blur-md rounded-2xl border-2 border-duo-yellow/20 shadow-sm" title="XP Points">
                            <Zap size={22} fill="#FFC800" className="text-duo-yellow" />
                            <span className="text-xl text-duo-dark tabular-nums">{xp}</span>
                        </div>

                        <div className="flex items-center gap-3 font-black group px-4 py-2 bg-white/50 backdrop-blur-md rounded-2xl border-2 border-duo-orange/20 shadow-sm" title="Lives">
                            <Heart size={22} fill="#FF4B4B" className="text-duo-orange" />
                            <span className="text-xl text-duo-dark tabular-nums">{lives}</span>
                        </div>

                        <div className="flex items-center gap-3 font-black group px-4 py-2 bg-white/50 backdrop-blur-md rounded-2xl border-2 border-duo-green/20 shadow-sm" title="Daily Streak">
                            <Trophy size={22} fill="#58CC02" className="text-duo-green" />
                            <span className="text-xl text-duo-dark tabular-nums">{streak}</span>
                        </div>
                    </>
                ) : (
                    <div className="h-12 w-64 bg-slate-100/50 animate-pulse rounded-2xl backdrop-blur-sm" />
                )}
            </div>
        </nav>
    );
};
