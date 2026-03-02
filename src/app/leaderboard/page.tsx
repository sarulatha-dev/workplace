"use client";

import { JasaMascot } from "@/components/JasaMascot";
import { motion } from "framer-motion";
import { Trophy, Zap, ArrowLeft, Shield, Award, Crown, Star, Medal } from "lucide-react";
import Link from "next/link";
import { useGameStore } from "@/store/gameStore";

const LEAGUE_STYLING = {
    Bronze: { color: "text-[#CD7F32]", bg: "bg-[#CD7F32]/10", border: "border-[#CD7F32]", icon: Shield, gradient: "from-[#CD7F32]" },
    Gold: { color: "text-[#FFD700]", bg: "bg-[#FFD700]/10", border: "border-[#FFD700]", icon: Award, gradient: "from-[#FFD700]" },
    Diamond: { color: "text-[#56C2E0]", bg: "bg-[#56C2E0]/10", border: "border-[#56C2E0]", icon: Crown, gradient: "from-[#56C2E0]" },
};

const RANK_META = [
    { rank: 2, podiumH: "h-32", podiumColor: "from-slate-300 to-slate-400", label: "2nd", medal: "🥈", labelColor: "text-slate-500" },
    { rank: 1, podiumH: "h-48", podiumColor: "from-yellow-400 to-amber-500", label: "1st", medal: "🥇", labelColor: "text-amber-600" },
    { rank: 3, podiumH: "h-24", podiumColor: "from-amber-600 to-orange-700", label: "3rd", medal: "🥉", labelColor: "text-amber-800" },
];

const leaders = [
    { name: "Saru", score: 1250, rank: 1, league: "Diamond", role: "CEO", avatar: "🎯" },
    { name: "Expert", score: 1100, rank: 2, league: "Diamond", role: "Director", avatar: "💼" },
    { name: "LogicBot", score: 950, rank: 3, league: "Gold", role: "Manager", avatar: "🤖" },
    { name: "ProMentor", score: 800, rank: 4, league: "Gold", role: "Senior", avatar: "📚" },
    { name: "DuoFan", score: 750, rank: 5, league: "Bronze", role: "Intern", avatar: "⭐" },
];

const rankBadgeColor = (rank: number) => rank === 1 ? "bg-yellow-400 text-white" : rank === 2 ? "bg-slate-300 text-slate-700" : rank === 3 ? "bg-amber-600 text-white" : "bg-duo-gray/20 text-duo-gray";

export default function LeaderboardPage() {
    const { xp, league, badges, currentRole } = useGameStore();
    const currentStyle = LEAGUE_STYLING[league as keyof typeof LEAGUE_STYLING];
    const top3 = leaders.filter(l => l.rank <= 3).sort((a, b) => {
        const order = [2, 1, 3];
        return order.indexOf(a.rank) - order.indexOf(b.rank);
    });

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-display text-duo-dark pt-24 pb-32">
            {/* Background elements */}
            <div className="absolute inset-0 mesh-bg opacity-[0.03] pointer-events-none" />
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-duo-blue/5 rounded-full blur-[120px]" />
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-duo-green/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Header */}
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 bg-duo-yellow/10 text-duo-dark font-black uppercase tracking-widest text-sm px-6 py-3 rounded-full mb-6 border border-duo-yellow/30">
                        <Trophy size={16} fill="currentColor" className="text-duo-yellow" /> Global Rankings
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-duo-dark">
                        Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-duo-yellow to-duo-orange">Fame</span>
                    </h1>
                    <p className="text-duo-gray font-bold text-xl mt-4 uppercase tracking-widest">Workplace Logic Champions</p>
                </motion.div>

                {/* ── WINNER PODIUM ── */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
                    className="mb-10"
                >
                    <div className="flex items-end justify-center gap-6 mb-4">
                        {RANK_META.map((meta) => {
                            const player = leaders.find(l => l.rank === meta.rank)!;
                            return (
                                <div key={meta.rank} className="flex flex-col items-center gap-3">
                                    {/* Crown for 1st */}
                                    {meta.rank === 1 && (
                                        <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-4xl">👑</motion.div>
                                    )}
                                    {/* Avatar Circle */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className={`${meta.rank === 1 ? 'w-24 h-24 text-4xl' : 'w-16 h-16 text-2xl'} rounded-full bg-white border-4 flex items-center justify-center shadow-2xl`}
                                        style={{ borderColor: meta.rank === 1 ? '#FFD700' : meta.rank === 2 ? '#C0C0C0' : '#CD7F32' }}
                                    >
                                        {player.avatar}
                                    </motion.div>
                                    {/* Name & Score */}
                                    <div className="text-center">
                                        <p className={`font-black uppercase tracking-tight ${meta.rank === 1 ? 'text-2xl' : 'text-lg'} text-duo-dark`}>{player.name}</p>
                                        <p className="text-duo-gray font-bold text-sm uppercase">{player.role}</p>
                                        <div className="flex items-center justify-center gap-1 mt-1">
                                            <Zap size={12} fill="currentColor" className="text-duo-blue" />
                                            <span className="font-black text-duo-dark text-sm">{player.score} XP</span>
                                        </div>
                                    </div>
                                    {/* Podium Block */}
                                    <motion.div
                                        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                                        transition={{ delay: 0.4 + meta.rank * 0.1, type: "spring" }}
                                        style={{ transformOrigin: "bottom" }}
                                        className={`${meta.podiumH} ${meta.rank === 1 ? 'w-40' : 'w-32'} bg-gradient-to-t ${meta.podiumColor} rounded-t-2xl flex flex-col items-center justify-start pt-4 shadow-2xl relative overflow-hidden`}
                                    >
                                        <span className="text-white font-black text-5xl opacity-40 italic">{meta.label}</span>
                                        <span className="text-3xl mt-2">{meta.medal}</span>
                                        {/* Shine effect */}
                                        <div className="absolute top-0 left-0 right-0 h-px bg-white/50" />
                                        <div className="absolute top-0 left-4 w-8 h-full bg-white/10 skew-x-12" />
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Podium base */}
                    <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-b-2xl mx-4 shadow-md" />
                </motion.div>

                {/* ── FULL RANKINGS ── */}
                <div className="mb-10">
                    <div className="flex items-center gap-6 mb-4">
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-duo-gray/40">Global Standings</h3>
                        <div className="h-1 flex-1 bg-duo-gray/5 rounded-full" />
                    </div>

                    <div className="flex flex-col gap-1">
                        {leaders.map((leader, i) => (
                            <motion.div
                                key={leader.rank}
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.07 }}
                                whileHover={{ x: 8, scale: 1.01 }}
                                className={`flex items-center gap-4 p-3 rounded-2xl border-b-[4px] transition-all relative ${leader.name === "Saru"
                                    ? "bg-gradient-to-r from-duo-green to-green-400 text-white border-[#46A202] shadow-[0_8px_24px_rgba(88,204,2,0.25)]"
                                    : "bg-white text-duo-dark border-slate-100/50 hover:border-duo-blue/20 hover:shadow-xl shadow-md"
                                    }`}
                            >
                                {/* Rank Badge */}
                                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0 ${rankBadgeColor(leader.rank)}`}>
                                    {leader.rank}
                                </span>

                                {/* Avatar */}
                                <span className="text-3xl">{leader.avatar}</span>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-3">
                                            {leader.name}
                                            {leader.league === "Diamond" && <Crown size={18} className={leader.name === "Saru" ? "text-white" : "text-blue-400 animate-pulse"} />}
                                        </h4>
                                        {leader.rank <= 3 && (
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${leader.name === "Saru" ? 'bg-white/20 text-white' : 'bg-duo-blue/10 text-duo-blue'}`}>
                                                Top {leader.rank === 1 ? '1%' : leader.rank === 2 ? '3%' : '5%'}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 ${leader.name === "Saru" ? "text-white/70" : "text-duo-gray"}`}>
                                        {leader.role} · {leader.league}
                                        <span className="opacity-40">|</span>
                                        <span className="flex items-center gap-1">
                                            <Zap size={12} fill="currentColor" /> {Math.floor(95 - leader.rank * 2)}% Consistency
                                        </span>
                                    </p>
                                </div>

                                {/* Score */}
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-3xl font-black tracking-tighter">{leader.score}</p>
                                        <p className={`text-xs font-black uppercase opacity-60`}>XP</p>
                                    </div>
                                    <Zap size={28} fill="currentColor" className={leader.name === "Saru" ? "text-white" : "text-duo-blue"} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Your Profile Card */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                    className={`duo-card p-10 mb-16 border-4 ${currentStyle.border} bg-white shadow-2xl`}
                >
                    <div className="flex flex-col lg:flex-row items-center gap-10">
                        <div className="relative flex-shrink-0">
                            <JasaMascot pose="cheering" showCelebration={false} className="w-40 h-40" />
                        </div>
                        <div className="flex-1 text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                                <currentStyle.icon size={32} className={currentStyle.color} />
                                <p className={`text-4xl font-black uppercase italic ${currentStyle.color}`}>{league}</p>
                            </div>
                            <p className="text-5xl font-black text-duo-dark uppercase italic tracking-tighter mb-2">{currentRole}</p>
                            <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
                                <Zap size={24} fill="currentColor" className="text-duo-blue" />
                                <p className="text-3xl font-black text-duo-dark">{xp} <span className="text-duo-gray text-xl">XP</span></p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {badges.length > 0 ? badges.map((b, i) => (
                                <motion.div key={i} whileHover={{ scale: 1.15, rotate: 5 }} className="w-14 h-14 rounded-2xl bg-duo-yellow/10 border-4 border-duo-yellow flex items-center justify-center text-duo-yellow shadow-lg">
                                    <Award size={28} />
                                </motion.div>
                            )) : (
                                <p className="text-duo-gray font-bold text-sm uppercase tracking-widest">Play to earn badges!</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <div className="text-center">
                    <Link href="/game-select">
                        <button className="duo-button duo-button-blue text-2xl h-20 px-16 flex items-center gap-6 mx-auto uppercase italic shadow-2xl">
                            <ArrowLeft size={32} strokeWidth={3} /> BACK TO MISSIONS
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
