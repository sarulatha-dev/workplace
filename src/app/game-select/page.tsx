"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Users, MessageSquare, Shirt, Scale, Star, Zap, ChevronRight, Trophy, Flame } from "lucide-react";
import Link from "next/link";
import { useGameStore } from "@/store/gameStore";

const LEVELS = [
    {
        id: "emails-1", name: "Email Basics", icon: Mail,
        color: "bg-duo-blue", glow: "shadow-blue-300/50",
        border: "border-blue-500", bgLight: "bg-blue-50",
        textColor: "text-duo-blue", href: "/quiz/email",
        desc: "Master professional writing, tone management, and effective inbox navigation. Learn to write emails that get results while maintaining absolute clarity and respect.",
        xp: 120, difficulty: "Starter",
    },
    {
        id: "meetings-1", name: "Meeting Pro", icon: Users,
        color: "bg-duo-green", glow: "shadow-green-300/50",
        border: "border-green-500", bgLight: "bg-green-50",
        textColor: "text-duo-green", href: "/quiz/meeting",
        desc: "Dominate the modern workspace by mastering active listening, collaborative leading, and professional meeting logic. Turn every sync into a productive session.",
        xp: 100, difficulty: "Intermediate",
    },
    {
        id: "comm-1", name: "Communication", icon: MessageSquare,
        color: "bg-duo-orange", glow: "shadow-red-300/50",
        border: "border-red-400", bgLight: "bg-red-50",
        textColor: "text-duo-orange", href: "/quiz/comm",
        desc: "Master the art of feedback, tone modulation, and verbal precision. Learn to convey complex ideas simply and effectively in high-pressure environments.",
        xp: 110, difficulty: "Starter",
    },
    {
        id: "dress-1", name: "Office Image", icon: Shirt,
        color: "bg-duo-yellow", glow: "shadow-yellow-300/50",
        border: "border-yellow-500", bgLight: "bg-yellow-50",
        textColor: "text-yellow-500", href: "/quiz/dress",
        desc: "Understand the silent language of leadership through professional image, body language logic, and workplace appearance standards across cultures.",
        xp: 80, difficulty: "Starter",
    },
    {
        id: "ethics-1", name: "Career Ethics", icon: Scale,
        color: "bg-slate-800", glow: "shadow-slate-300/50",
        border: "border-slate-700", bgLight: "bg-slate-50",
        textColor: "text-slate-700", href: "/quiz/ethics",
        desc: "Navigate workplace boundaries, ethical decision-making, and professional integrity. Build a reputation for excellence that lasts throughout your entire career.",
        xp: 140, difficulty: "Advanced",
    },
];

const DIFF_COLOR: Record<string, string> = {
    Starter: "bg-green-100 text-green-700",
    Intermediate: "bg-blue-100 text-blue-700",
    Advanced: "bg-red-100 text-red-700",
};

export default function GameSelect() {
    const { xp } = useGameStore();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-32 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-duo-blue/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-duo-green/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Header */}
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 bg-duo-blue/10 text-duo-blue font-black uppercase tracking-widest text-sm px-6 py-3 rounded-full mb-6 border border-duo-blue/20">
                        <Flame size={16} fill="currentColor" /> Your Learning Journey
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-duo-dark mb-4">Learning <span className="text-duo-green">Path</span></h1>
                    <div className="bg-slate-900 text-white rounded-3xl p-6 mb-4 max-w-2xl mx-auto shadow-2xl relative overflow-hidden border-b-8 border-slate-700">
                        <p className="text-sm font-black text-duo-blue uppercase tracking-widest mb-1">Mission Briefing</p>
                        <p className="text-lg font-bold italic tracking-tight opacity-90 leading-tight">"Mastering professional logic is a journey, not a sprint. Complete all 5 modules to earn the Diamond League badge."</p>
                    </div>
                    <div className="inline-flex items-center gap-3 mt-4 bg-white border-4 border-duo-blue/20 rounded-2xl px-6 py-3 shadow-lg">
                        <Zap size={24} fill="currentColor" className="text-duo-blue" />
                        <span className="font-black text-duo-dark text-xl">{xp} XP Earned</span>
                    </div>
                </motion.div>

                {/* Map Path */}
                <div className="relative">
                    {/* Animated connecting path */}
                    <svg className="absolute top-16 left-1/2 -translate-x-1/2 w-64 h-[calc(100%-120px)] -z-10" viewBox="0 0 100 1000" preserveAspectRatio="none">
                        <motion.path
                            d="M 50 0 Q 80 120 50 250 Q 20 380 50 500 Q 80 630 50 750 Q 20 880 50 1000"
                            fill="none" stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" strokeDasharray="12 8"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </svg>

                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2, delayChildren: 0.5 }
                            }
                        }}
                        className="flex flex-col gap-10"
                    >
                        {LEVELS.map((level, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <LevelNode key={level.id} level={level} index={i} isEven={isEven} />
                            );
                        })}
                    </motion.div>
                </div>

                {/* Bottom Progress Card */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 duo-card bg-gradient-to-br from-duo-blue to-blue-600 text-white p-12 text-center border-b-[12px] border-blue-800 shadow-2xl relative z-10"
                >
                    <Trophy size={64} className="mx-auto mb-6 animate-bounce" strokeWidth={2} />
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Complete All Modules</h3>
                    <p className="text-white/80 font-bold text-xl mb-8">Reach Diamond League and claim the WorkEtiq Champion badge!</p>
                    <div className="h-4 bg-white/20 rounded-full overflow-hidden mx-4">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (xp / 800) * 100)}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-duo-yellow rounded-full"
                        />
                    </div>
                    <p className="mt-4 font-black text-white/70 text-sm uppercase tracking-widest">{xp} / 800 XP to Diamond</p>
                </motion.div>
            </div>
        </div>
    );
}

const GOSSIP_TIPS = [
    "Rumor has it: Sending 'Quick question?' without the question is a level 10 ethics violation.",
    "Logic Check: If you CC everyone, you CC no one. Mastery is in the precision.",
    "Pro-Tip: Jasa says 'Kind regards' is the office version of 'I'm done here'.",
    "Meeting Hack: If you're 5 minutes early, you're on time. If you're on time, you're late.",
    "Dress Code: A blazer hides the fact that you're wearing a pajama top. (Don't tell HR).",
];

function LevelNode({ level, index, isEven }: { level: any, index: number, isEven: boolean }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [showTip, setShowTip] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        // Subtle magnetic effect (increased divisor for clarity)
        const x = (e.clientX - rect.left - rect.width / 2) / 40;
        const y = (e.clientY - rect.top - rect.height / 2) / 40;
        setMousePos({ x, y });
    };

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, x: isEven ? -100 : 100, scale: 0.8 },
                show: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 12 } }
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => {
                setMousePos({ x: 0, y: 0 });
                setShowTip(false);
            }}
            className={`flex items-center gap-10 ${isEven ? "flex-row" : "flex-row-reverse"}`}
        >
            {/* Level Node */}
            <Link href={level.href} className="flex-shrink-0 group perspective-1000 relative">
                {/* Office Gossip Tip */}
                <AnimatePresence>
                    {showTip && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -80, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl z-50 w-64 border-b-4 border-slate-700 pointer-events-none"
                        >
                            <p className="text-[10px] font-black uppercase tracking-widest text-duo-blue mb-1">Office Gossip</p>
                            <p className="text-xs font-bold leading-tight italic">"{GOSSIP_TIPS[index % GOSSIP_TIPS.length]}"</p>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    animate={{
                        rotateY: mousePos.x * 2,
                        rotateX: -mousePos.y * 2,
                        scale: showTip ? 1.1 : 1
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className="relative"
                >
                    {/* Glow ring */}
                    <div className={`absolute inset-0 rounded-[40px] ${level.color} opacity-0 group-hover:opacity-30 blur-2xl transition-all scale-150`} />

                    <div className={`w-24 h-24 rounded-[28px] flex items-center justify-center text-white border-b-[6px] shadow-xl ${level.glow} relative z-10
                        ${level.color} ${level.border} group-hover:-translate-y-1.5 transition-all`}>
                        <level.icon size={36} strokeWidth={2.5} className="drop-shadow-md" />
                    </div>

                    {/* Star Badge */}
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + index * 0.1 }}
                        className="absolute -top-4 -right-4 bg-duo-yellow p-2 rounded-2xl border-4 border-white shadow-xl z-20"
                    >
                        <Star size={20} fill="currentColor" className="text-white" />
                    </motion.div>

                    {/* XP float pop */}
                    <motion.div
                        initial={{ y: 0, opacity: 0 }} whileHover={{ y: -20, opacity: 1 }}
                        className={`absolute -top-10 left-1/2 -translate-x-1/2 ${level.color} text-white font-black text-sm px-4 py-1.5 rounded-full whitespace-nowrap`}
                    >
                        +{level.xp} XP
                    </motion.div>
                </motion.div>
            </Link>

            {/* Info Card */}
            <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                animate={{ x: mousePos.x, y: mousePos.y }}
                className={`flex-1 duo-card bg-white p-6 border-b-[5px] ${level.border} shadow-lg relative overflow-hidden max-w-lg transition-shadow hover:shadow-2xl`}
            >
                {/* Color accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${level.color}`} />

                <div className="flex items-start justify-between mb-3">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Module {index + 1}</p>
                        <h3 className={`text-2xl font-black uppercase italic tracking-tighter leading-none ${level.textColor}`}>{level.name}</h3>
                    </div>
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider ${DIFF_COLOR[level.difficulty] || "bg-slate-100 text-slate-600"}`}>
                        {level.difficulty}
                    </span>
                </div>

                <p className="text-slate-600 font-medium text-base mb-5 leading-snug">{level.desc}</p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-1.5">
                        {[...Array(3)].map((_, j) => (
                            <Star key={j} size={18} fill="currentColor" className="text-duo-yellow" />
                        ))}
                    </div>
                    <Link href={level.href}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`duo-button ${level.color} text-white font-black text-base px-8 py-2.5 flex items-center gap-2 border-b-4 ${level.border}`}
                        >
                            PLAY <ChevronRight size={18} strokeWidth={4} />
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}
