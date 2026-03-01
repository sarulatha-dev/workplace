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

interface ChallengeModeProps {
    onSelect: (type: 'mcq' | 'matching' | 'typing' | 'voice') => void;
    onBack: () => void;
    title: string;
}

export const ChallengeMode = ({ onSelect, onBack, title }: ChallengeModeProps) => {
    const { setPlayMode, playMode, multiType } = useGameStore();
    const [step, setStep] = useState<'selection' | 'multiplayer'>('selection');

    const MODES = [
        { id: 'mcq', name: 'Professional MCQ', icon: ListChecks, color: 'bg-duo-blue', desc: 'Pick the right logic.' },
        { id: 'matching', name: 'Match Cards', icon: LayoutGrid, color: 'bg-duo-green', desc: 'Connect the concepts.' },
        { id: 'typing', name: 'Type Response', icon: Type, color: 'bg-duo-orange', desc: 'Write the etiquette.' },
        { id: 'voice', name: 'Speak Logic', icon: Mic, color: 'bg-duo-yellow', desc: 'Voice your tone.' }
    ] as const;

    return (
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <button onClick={onBack} className="flex items-center gap-3 text-duo-gray font-black uppercase tracking-widest hover:text-duo-dark mb-12 transition-all hover:-translate-x-2 text-xl md:text-2xl">
                <ArrowLeft size={32} strokeWidth={4} /> RETURN TO MAP
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
                        <h2 className="text-6xl md:text-8xl font-black text-duo-dark mb-6 uppercase italic tracking-tighter text-center">
                            {title}
                        </h2>
                        <p className="text-2xl md:text-3xl font-bold text-duo-gray uppercase tracking-widest mb-16 text-center">
                            Pick your training intensity
                        </p>

                        {/* Play Mode Toggle */}
                        <div className="flex gap-4 mb-16 p-3 bg-gray-100/80 rounded-[40px] w-full max-w-2xl border-4 border-white shadow-xl">
                            <button
                                onClick={() => setPlayMode('single')}
                                className={`flex-1 flex items-center justify-center gap-4 py-6 px-8 rounded-[30px] font-black text-2xl transition-all ${playMode === 'single' ? 'bg-white shadow-lg text-duo-blue scale-105' : 'text-duo-gray hover:text-duo-dark'}`}
                            >
                                <User size={32} /> SINGLE
                            </button>
                            <button
                                onClick={() => setStep('multiplayer')}
                                className={`flex-1 flex items-center justify-center gap-4 py-6 px-8 rounded-[30px] font-black text-2xl transition-all ${playMode === 'multi' ? 'bg-white shadow-lg text-duo-orange scale-105' : 'text-duo-gray hover:text-duo-dark'}`}
                            >
                                <Users size={32} /> MULTI
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            {MODES.map((mode) => (
                                <motion.button
                                    key={mode.id}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => onSelect(mode.id)}
                                    className="duo-card group flex items-start md:items-center gap-8 p-10 md:p-12 text-left bg-white hover:border-duo-blue transition-all border-b-[12px]"
                                >
                                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl ${mode.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform flex-shrink-0`}>
                                        <mode.icon size={48} strokeWidth={3} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-3xl md:text-4xl font-black text-duo-dark mb-2 leading-tight uppercase italic">{mode.name}</h4>
                                        <p className="text-duo-gray font-bold text-xl md:text-2xl">{mode.desc}</p>
                                    </div>
                                    <ArrowRight size={40} className="text-duo-gray/30 group-hover:text-duo-blue group-hover:translate-x-4 transition-all hidden md:block" />
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
                        className="text-center py-16"
                    >
                        <h2 className="text-6xl md:text-8xl font-black text-duo-dark mb-6 italic tracking-tighter">ARENA COMBAT</h2>
                        <p className="text-2xl font-bold text-duo-gray uppercase mb-16 tracking-widest">Who are you competing with?</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -10 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => { setPlayMode('multi', 'friends'); setStep('selection'); }}
                                className="duo-card p-16 bg-white border-duo-blue border-b-[16px]"
                            >
                                <Users size={96} className="mx-auto mb-8 text-duo-blue group-hover:animate-bounce" />
                                <h4 className="text-4xl font-black text-duo-dark mb-4 italic uppercase">INVITE CREW</h4>
                                <p className="text-duo-gray font-bold text-2xl">Share a logic code and race to the buzzer.</p>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -10 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => { setPlayMode('multi', 'bot'); setStep('selection'); }}
                                className="duo-card p-16 bg-white border-duo-orange border-b-[16px]"
                            >
                                <Bot size={96} className="mx-auto mb-8 text-duo-orange group-hover:animate-spin" />
                                <h4 className="text-4xl font-black text-duo-dark mb-4 italic uppercase">PLAY JASABOT</h4>
                                <p className="text-duo-gray font-bold text-2xl">Challenge JasaBot. He reacts fast!</p>
                            </motion.button>
                        </div>

                        <button
                            onClick={() => setStep('selection')}
                            className="mt-16 text-duo-blue font-black underline decoration-[6px] underline-offset-[12px] uppercase tracking-[0.2em] text-2xl hover:text-duo-dark transition-colors"
                        >
                            Return to Single Player
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
