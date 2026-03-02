"use client";

import { motion, AnimatePresence } from "framer-motion";
import { JasaMascot } from "./JasaMascot";
import { ArrowRight, Sparkles, X, ChevronRight, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface GameIntroProps {
    onClose: () => void;
}

const STEPS = [
    {
        title: "WELCOME TO THE ARENA",
        subtitle: "I'M JASA, YOUR PROFESSIONAL MENTOR.",
        pose: "waving" as const,
        bg: "bg-duo-blue/10",
        accent: "text-duo-blue",
        text: "The modern workspace is changing fast. I'm here to help you master the logic of professional excellence through high-energy challenges."
    },
    {
        title: "THE LOGIC MISSION",
        subtitle: "BEYOND THE CORPORATE MANUAL",
        pose: "pointing" as const,
        bg: "bg-duo-green/10",
        accent: "text-duo-green",
        text: "Forget boring HR slides. Here, you'll practice real-world scenarios in real-time. From email tone to ethical decision-making, we cover it all."
    },
    {
        title: "FOUR WAYS TO PLAY",
        subtitle: "TRAIN YOUR OFFICE SUPERPOWERS",
        pose: "thinking" as const,
        bg: "bg-duo-orange/10",
        accent: "text-duo-orange",
        text: "Pick your challenge: professional MCQs, logic card matching, AI-powered response typing, or voice-etiquette practice. Master them all!"
    },
    {
        title: "CLAIM YOUR CROWN",
        subtitle: "CLIMB TO DIAMOND LEAGUE",
        pose: "cheering" as const,
        bg: "bg-duo-yellow/10",
        accent: "text-duo-yellow",
        text: "Earn XP, unlock elite professional badges, and climb the global leaderboard. Ready to prove you're the ultimate professional?"
    }
];

export const GameIntro = ({ onClose }: GameIntroProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            onClose();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/40 backdrop-blur-xl"
        >
            <motion.div
                initial={{ scale: 0.9, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl border-b-[12px] border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[500px]"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-duo-gray hover:text-duo-dark transition-colors"
                >
                    <X size={24} strokeWidth={3} />
                </button>

                {/* Left Side: Mascot & Visual */}
                <div className={`w-full md:w-2/5 p-12 flex flex-col items-center justify-center relative transition-colors duration-500 ${STEPS[currentStep].bg}`}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="relative"
                        >
                            <JasaMascot pose={STEPS[currentStep].pose} className="w-64 h-64 md:w-80 md:h-80" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side: Content */}
                <div className="flex-1 p-10 md:p-16 flex flex-col justify-center text-center md:text-left">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -30, opacity: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-100 rounded-full">
                                <Sparkles size={16} className={STEPS[currentStep].accent} fill="currentColor" />
                                <span className={`text-xs font-black uppercase tracking-widest ${STEPS[currentStep].accent}`}>Mission Briefing {currentStep + 1}/{STEPS.length}</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-duo-dark mb-2 tracking-tighter uppercase italic leading-[0.85]">
                                {STEPS[currentStep].title}
                            </h2>
                            <p className={`text-xl font-black uppercase tracking-widest mb-10 ${STEPS[currentStep].accent} opacity-80`}>
                                {STEPS[currentStep].subtitle}
                            </p>
                            <p className="text-2xl font-bold text-duo-gray mb-12 leading-relaxed italic">
                                &quot;{STEPS[currentStep].text}&quot;
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center justify-center md:justify-start gap-4 mt-auto pt-6">
                        <button
                            onClick={onClose}
                            className="text-lg font-black text-duo-gray hover:text-duo-dark uppercase tracking-widest px-8"
                        >
                            Skip
                        </button>
                        <button
                            onClick={nextStep}
                            className={`flex items-center gap-4 text-white font-black text-2xl h-20 px-12 rounded-[24px] shadow-lg transition-transform active:translate-y-1 active:border-b-0 border-b-8
                                ${currentStep === STEPS.length - 1 ? 'bg-duo-green border-green-700' : 'bg-duo-blue border-blue-700'}`}
                        >
                            {currentStep === STEPS.length - 1 ? "LET&apos;S PLAY" : "NEXT"}
                            <ChevronRight size={28} strokeWidth={4} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
