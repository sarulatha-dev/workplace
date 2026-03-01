"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useState } from "react";

interface BuzzerProps {
    onBuzz: () => void;
    disabled?: boolean;
    active?: boolean;
    playerName?: string;
    playerColor?: string;
    size?: "sm" | "md" | "lg";
}

export const Buzzer = ({
    onBuzz,
    disabled = false,
    active = false,
    playerName,
    playerColor = "#EF4444",
    size = "lg"
}: BuzzerProps) => {
    const [isPressed, setIsPressed] = useState(false);

    const playBuzzSound = () => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.type = "square";
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.error("Audio context failed", e);
        }
    };

    const handlePress = () => {
        if (disabled || active) return;
        setIsPressed(true);
        playBuzzSound();
        onBuzz();
        setTimeout(() => setIsPressed(false), 200);
    };

    const sizeClasses = {
        sm: "w-24 h-24",
        md: "w-36 h-36",
        lg: "w-48 h-48"
    };

    const iconSize = {
        sm: 32,
        md: 48,
        lg: 64
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <motion.button
                whileHover={!disabled && !active ? { scale: 1.05 } : {}}
                whileTap={!disabled && !active ? { scale: 0.95 } : {}}
                onClick={handlePress}
                disabled={disabled || active}
                className={`relative ${sizeClasses[size]} rounded-full border-4 sm:border-8 transition-all flex items-center justify-center
          ${active
                        ? "border-slate-900 shadow-[0_0_50px_rgba(59,130,246,0.3)]"
                        : "border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                    }
          ${disabled ? "opacity-30 grayscale cursor-not-allowed shadow-none" : "cursor-pointer"}
        `}
                style={{ backgroundColor: active ? "#F8FAFC" : playerColor }}
            >
                <div className={`rounded-full border-2 sm:border-4 border-slate-900 flex items-center justify-center ${active ? 'animate-pulse bg-slate-100' : 'bg-white/20'}`} style={{ width: '80%', height: '80%' }}>
                    <Zap size={iconSize[size]} className={active ? "text-accent" : "text-white"} fill="currentColor" />
                </div>

                {/* Glow ring */}
                <div className={`absolute inset-0 rounded-full border-2 border-accent/30 animate-ping ${active ? 'block' : 'hidden'}`} />
            </motion.button>

            {playerName && (
                <div className="text-center">
                    <span className={`text-xs sm:text-sm font-black uppercase tracking-widest px-3 py-1 brutalist-border ${active ? 'bg-accent text-white' : 'bg-white text-slate-900'}`}>
                        {active ? `MASTERED BY ${playerName}` : playerName}
                    </span>
                </div>
            )}
        </div>
    );
};
