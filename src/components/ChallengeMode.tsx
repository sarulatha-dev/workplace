"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutGrid,
    Type,
    Mic,
    ListChecks,
    ArrowRight,
    ArrowLeft,
    Users,
    User,
    Bot
} from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { useState } from "react";

import { JasaMascot } from "./JasaMascot";

interface ChallengeModeProps {
    onSelect: (type: 'mcq' | 'matching' | 'typing' | 'voice') => void;
    onBack: () => void;
    title: string;
}

export const ChallengeMode = ({ onSelect, onBack, title }: ChallengeModeProps) => {
    const { setPlayMode, playMode, multiType } = useGameStore();
    const [step, setStep] = useState<'selection' | 'multiplayer'>('selection');

    const MODES = [
        { id: 'mcq', name: 'Professional MCQ', icon: ListChecks, color: 'bg-duo-blue', desc: 'Pick the right logic.', xp: 120 },
        { id: 'matching', name: 'Match Cards', icon: LayoutGrid, color: 'bg-duo-green', desc: 'Connect the concepts.', xp: 100 },
        { id: 'typing', name: 'Type Response', icon: Type, color: 'bg-duo-orange', desc: 'Write the etiquette.', xp: 110 },
        { id: 'voice', name: 'Speak Logic', icon: Mic, color: 'bg-duo-yellow', desc: 'Voice your tone.', xp: 80 }
    ] as const;

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-display">
            {/* High-Energy Background Layers */}
            <div className="absolute inset-0 mesh-bg opacity-[0.08] pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-duo-blue/10 rounded-full blur-[160px] animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-duo-green/10 rounded-full blur-[140px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-duo-orange/5 rounded-full blur-[200px]" />

            {/* Floating Glass Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 20, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bg-white/20 backdrop-blur-sm rounded-full pointer-events-none"
                    style={{
                        width: Math.random() * 100 + 40,
                        height: Math.random() * 100 + 40,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        zIndex: 1
                    }}
                />
            ))}

            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
                <button onClick={onBack} className="group flex items-center gap-3 text-duo-gray font-black uppercase tracking-widest hover:text-duo-dark mb-16 transition-all hover:-translate-x-2 text-xl">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
                        <ArrowLeft size={24} strokeWidth={4} />
                    </div>
                    RETURN TO MAP
                </button>

                <AnimatePresence mode="wait">
                    {step === 'selection' ? (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="flex flex-col items-center"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                                <motion.div
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", damping: 10 }}
                                >
                                    <JasaMascot pose="pointing" tip="Ready for your next mission?" className="w-48 h-48 md:w-56 md:h-56" />
                                </motion.div>
                                <div className="text-center md:text-left">
                                    <h2 className="font-display text-4xl md:text-6xl font-black text-duo-dark mb-2 uppercase tracking-tighter leading-tight">
                                        {title}
                                    </h2>
                                    <p className="font-sans text-base md:text-lg font-bold text-duo-blue uppercase tracking-[0.2em] opacity-80">
                                        Engineering Professional Excellence
                                    </p>
                                </div>
                            </div>

                            {/* Play Mode Toggle - Premium Tactical Style */}
                            <div className="flex gap-1 mb-12 p-1.5 bg-white/40 backdrop-blur-md rounded-2xl w-full max-w-md border border-white/50 shadow-xl relative z-20">
                                <button
                                    onClick={() => setPlayMode('single')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-black text-sm transition-all duration-500 ${playMode === 'single' ? 'bg-white shadow-md text-duo-blue' : 'text-slate-400 hover:text-duo-dark opacity-60'}`}
                                >
                                    <User size={20} strokeWidth={3} /> <span className="tracking-widest capitalize">SOLO MISSION</span>
                                </button>
                                <button
                                    onClick={() => setStep('multiplayer')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-black text-sm transition-all duration-500 ${playMode === 'multi' ? 'bg-white shadow-md text-duo-orange' : 'text-slate-400 hover:text-duo-dark opacity-60'}`}
                                >
                                    <Users size={20} strokeWidth={3} /> <span className="tracking-widest capitalize">SQUAD BATTLE</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full group/list">
                                {MODES.map((mode) => (
                                    <motion.button
                                        key={mode.id}
                                        whileHover={{ y: -6, scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => onSelect(mode.id)}
                                        className="relative group flex items-start md:items-center gap-8 p-8 md:p-10 text-left bg-white/30 backdrop-blur-xl hover:bg-white/50 transition-all border-b-[8px] border-white/20 shadow-xl rounded-3xl overflow-hidden"
                                    >
                                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${mode.color} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform flex-shrink-0 z-10`}>
                                            <mode.icon size={44} strokeWidth={2.5} />
                                        </div>
                                        <div className="flex-1 z-10 min-w-0">
                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                <span className="text-[10px] md:text-xs font-black px-4 py-2 bg-white/50 text-slate-500 rounded-lg tracking-widest uppercase border border-white/20 whitespace-nowrap">Est. 5 Min</span>
                                                <span className="text-[10px] md:text-xs font-black px-4 py-2 bg-duo-blue text-white rounded-lg tracking-widest uppercase shadow-lg shadow-blue-200 whitespace-nowrap">+{mode.xp} XP</span>
                                            </div>
                                            <h4 className="font-display text-2xl md:text-3xl font-black text-duo-dark mb-1 leading-tight uppercase tracking-tight break-words whitespace-normal">{mode.name}</h4>
                                            <p className="font-sans text-sm md:text-base text-duo-gray font-bold opacity-80 leading-tight break-words whitespace-normal">{mode.desc}</p>
                                        </div>
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-all shadow-inner z-10 flex-shrink-0">
                                            <ArrowRight size={20} strokeWidth={4} className="text-duo-gray/50 group-hover:text-duo-blue group-hover:translate-x-1 transition-all" />
                                        </div>

                                        {/* Shimmer Effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 pointer-events-none" />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="multiplayer"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="text-center py-20"
                        >
                            <h2 className="text-7xl md:text-9xl font-black text-duo-dark mb-8 italic tracking-tighter leading-none">ARENA COMBAT</h2>
                            <p className="text-2xl md:text-3xl font-bold text-duo-blue uppercase mb-20 tracking-widest opacity-80">Choose your opponent</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -12 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { setPlayMode('multi', 'friends'); setStep('selection'); }}
                                    className="duo-card p-16 md:p-24 bg-white/60 backdrop-blur-xl border-duo-blue border-b-[20px] rounded-[56px] shadow-2xl relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-duo-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Users size={120} strokeWidth={2.5} className="mx-auto mb-10 text-duo-blue group-hover:scale-110 transition-transform" />
                                    <h4 className="text-4xl md:text-5xl font-black text-duo-dark mb-6 italic uppercase tracking-tighter">INVITE CREW</h4>
                                    <p className="text-duo-gray font-bold text-2xl leading-snug">Share a logic code and race to the buzzer.</p>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05, y: -12 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { setPlayMode('multi', 'bot'); setStep('selection'); }}
                                    className="duo-card p-16 md:p-24 bg-white/60 backdrop-blur-xl border-duo-orange border-b-[20px] rounded-[56px] shadow-2xl relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-duo-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Bot size={120} strokeWidth={2.5} className="mx-auto mb-10 text-duo-orange group-hover:rotate-12 transition-transform" />
                                    <h4 className="text-4xl md:text-5xl font-black text-duo-dark mb-6 italic uppercase tracking-tighter">PLAY JASABOT</h4>
                                    <p className="text-duo-gray font-bold text-2xl leading-snug">Challenge JasaBot. He reacts fast!</p>
                                </motion.button>
                            </div>

                            <button
                                onClick={() => setStep('selection')}
                                className="mt-24 text-duo-blue font-black underline decoration-[8px] underline-offset-[16px] uppercase tracking-[0.3em] text-2xl hover:text-duo-dark transition-all hover:scale-105"
                            >
                                Return to Single Player
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
