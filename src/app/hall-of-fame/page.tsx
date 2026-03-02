"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Shield, Zap, Target, Award, ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useGameStore } from "@/store/gameStore";

const BADGES = [
    { id: "starter", name: "Etiquette Initiate", desc: "Completed your first professional module.", icon: Target, color: "from-blue-400 to-blue-600", xp: 0 },
    { id: "pro-writer", name: "Logic Wordsmith", desc: "Mastered the Email Basics module with 100% accuracy.", icon: Zap, color: "from-duo-green to-green-600", xp: 120 },
    { id: "social-expert", name: "Vibe Master", desc: "Reached a Social Vibe Score of 10 in a live scenario.", icon: Sparkles, color: "from-duo-orange to-red-500", xp: 250 },
    { id: "leader", name: "Executive Presence", desc: "Maintained 'Professional' image for 5 consecutive days.", icon: Shield, color: "from-slate-700 to-slate-900", xp: 500 },
    { id: "diamond", name: "Diamond Legend", desc: "Ranked in the top 1% of the WorkEtiq leaderboard.", icon: Star, color: "from-duo-yellow to-yellow-600", xp: 1000 },
];

export default function HallOfFame() {
    const { xp } = useGameStore();
    const [selectedBadge, setSelectedBadge] = useState<any>(null);

    return (
        <div className="min-h-screen bg-[#0F172A] text-white pt-24 pb-32 relative overflow-hidden">
            {/* Cinematic Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-duo-blue/20 to-transparent blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-duo-green/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-16">
                    <Link href="/game-select">
                        <motion.button
                            whileHover={{ x: -5 }}
                            className="flex items-center gap-2 text-white/60 hover:text-white font-bold transition-colors"
                        >
                            <ChevronLeft size={20} /> Back to Path
                        </motion.button>
                    </Link>
                    <div className="text-right">
                        <p className="text-duo-blue font-black uppercase tracking-[0.3em] text-sm mb-1">Career Milestones</p>
                        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">Hall of <span className="text-duo-yellow">Fame</span></h1>
                    </div>
                </div>

                {/* 3D Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {BADGES.map((badge, i) => {
                        const isUnlocked = xp >= badge.xp;
                        return (
                            <motion.div
                                key={badge.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                onClick={() => setSelectedBadge(badge)}
                                className={`group relative cursor-pointer ${!isUnlocked && "grayscale opacity-50"}`}
                            >
                                {/* Floating Glass Case */}
                                <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-sm -z-10 transition-all group-hover:bg-white/10 group-hover:border-white/20 shadow-2xl" />

                                <div className="p-10 flex flex-col items-center text-center">
                                    {/* The Badge */}
                                    <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${badge.color} p-0.5 shadow-2xl relative mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="w-full h-full rounded-full bg-slate-900/40 backdrop-blur-md flex items-center justify-center border border-white/30">
                                            <badge.icon size={56} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                                        </div>

                                        {/* Unlocked Shine */}
                                        {isUnlocked && (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-[-15px] border-2 border-dashed border-white/10 rounded-full pointer-events-none"
                                            />
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-black uppercase italic tracking-tight mb-2">{badge.name}</h3>
                                    <p className="text-white/60 font-bold text-sm leading-tight max-w-[200px] mb-6">{badge.desc}</p>

                                    {!isUnlocked && (
                                        <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                                            <Award size={14} className="text-white/40" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Requires {badge.xp} XP</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Main Trophy Display */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-32 relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-[60px] p-20 border-b-[16px] border-slate-950 shadow-2xl overflow-hidden text-center"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-duo-yellow/5 rounded-full blur-[100px]" />
                    <Trophy size={120} className="mx-auto text-duo-yellow mb-8 animate-bounce" />
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">The WorkEtiq Champion</h2>
                    <p className="text-white/60 font-bold text-xl max-w-2xl mx-auto mb-10">Complete the legendary path to claim the ultimate professional honor. Only for the most logical office survivors.</p>
                    <div className="inline-block bg-duo-blue text-white font-black px-12 py-5 rounded-3xl shadow-xl border-b-8 border-blue-900 uppercase tracking-widest text-xl">
                        {xp} / 1500 XP to Legend
                    </div>
                </motion.div>
            </div>

            {/* Selection Modal */}
            <AnimatePresence>
                {selectedBadge && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedBadge(null)}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            className="relative bg-slate-900 rounded-[50px] p-12 max-w-xl w-full border border-white/10 shadow-3xl text-center"
                        >
                            <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${selectedBadge.color} p-1 mx-auto mb-10`}>
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                                    <selectedBadge.icon size={80} className="text-white" />
                                </div>
                            </div>
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{selectedBadge.name}</h2>
                            <p className="text-white/60 font-bold text-lg leading-relaxed mb-8">{selectedBadge.desc}</p>
                            <button
                                onClick={() => setSelectedBadge(null)}
                                className="w-full bg-duo-blue py-5 rounded-3xl font-black uppercase tracking-widest text-xl border-b-8 border-blue-800 hover:scale-[1.02] transition-transform"
                            >
                                Awesome
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
