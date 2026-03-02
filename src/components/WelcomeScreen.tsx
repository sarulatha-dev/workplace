"use client";

import { motion } from "framer-motion";
import { JasaMascot } from "./JasaMascot";
import { Sparkles, Play } from "lucide-react";

interface WelcomeScreenProps {
    onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-blue-100 via-white to-emerald-50 flex flex-col items-center justify-center p-6 text-duo-dark overflow-hidden"
        >
            {/* Color Sprinkles (Small Floating Shapes) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, Math.random() * -50 - 20, 0],
                            x: [0, Math.random() * 40 - 20, 0],
                            rotate: [0, 180, 360],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className={`absolute w-4 h-4 rounded-lg opacity-20 ${["bg-duo-blue", "bg-duo-green", "bg-duo-yellow", "bg-duo-orange", "bg-duo-emerald", "bg-duo-blue-dark"][i % 6]
                            }`}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            {/* Background Decorative Circles - Soft & Airy */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-duo-blue/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-duo-green/10 rounded-full blur-[150px] translate-x-1/4 translate-y-1/4" />
            <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-duo-yellow/5 rounded-full blur-[100px] -z-10" />

            {/* Mascot Container */}
            <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                className="relative mb-20 md:mb-24"
            >
                {/* Speech Bubble (Duolingo Style) */}
                <motion.div
                    initial={{ opacity: 0, x: -30, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute -top-16 -right-56 md:-top-20 md:-right-64 bg-white text-duo-dark p-6 md:p-8 rounded-[30px] shadow-2xl border-4 border-slate-100 z-20 max-w-[300px] md:max-w-xs"
                >
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rotate-45 border-l-4 border-b-4 border-slate-100" />
                    <p className="text-xl md:text-2xl font-black italic tracking-tighter leading-none uppercase">
                        WELCOME TO THE <br />
                        <span className="text-duo-blue">WORKPLACE ETIQUETTE</span> GAME!
                    </p>
                </motion.div>

                <JasaMascot pose="waving" className="w-64 h-64 md:w-96 md:h-96 relative z-10" />
            </motion.div>

            {/* Title / CTA */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center z-10"
            >
                <div className="flex items-center justify-center gap-3 mb-6 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border-2 border-slate-100 shadow-sm">
                    <Sparkles size={20} className="text-duo-yellow" fill="currentColor" />
                    <span className="text-sm font-black uppercase tracking-[0.3em] text-duo-blue">JASA 2.0 IS READY</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-12 text-duo-dark">
                    ARE YOU <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-duo-blue via-duo-green to-blue-400 drop-shadow-sm">READY?</span>
                </h1>

                <button
                    onClick={onStart}
                    className="group relative duo-button duo-button-green text-3xl md:text-4xl h-24 px-16 md:px-24 uppercase italic flex items-center gap-5 hover:scale-105 active:translate-y-2 active:border-b-0 transition-all font-black shadow-xl"
                >
                    <Play fill="currentColor" size={36} />
                    LET&apos;S GO!
                </button>
            </motion.div>

            {/* Decorative Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mesh-bg" />
        </motion.div>
    );
};
