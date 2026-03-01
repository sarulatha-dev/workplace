"use client";

import { JasaMascot } from "@/components/JasaMascot";
import { motion } from "framer-motion";
import {
  Rocket, Trophy, Map as MapIcon, Mail, Users, MessageSquare,
  Shirt, Scale, Zap, ArrowRight, Star, CheckCircle, Target, Award
} from "lucide-react";
import Link from "next/link";
import { useGameStore } from "@/store/gameStore";

const GAME_MODES = [
  { id: "email", name: "Email Pro", icon: Mail, color: "bg-duo-blue", border: "border-blue-500", glow: "shadow-blue-200", desc: "Master professional writing, tone, and inbox management.", xp: 120 },
  { id: "meeting", name: "Meetings", icon: Users, color: "bg-duo-green", border: "border-green-500", glow: "shadow-green-200", desc: "Shine in collaborations, active listening, and leading sessions.", xp: 100 },
  { id: "comm", name: "Speak Up", icon: MessageSquare, color: "bg-duo-orange", border: "border-red-400", glow: "shadow-orange-200", desc: "Master clear tone, feedback, and verbal clarity.", xp: 110 },
  { id: "dress", name: "Image", icon: Shirt, color: "bg-duo-yellow", border: "border-yellow-500", glow: "shadow-yellow-200", desc: "Navigate professional appearance and body language logic.", xp: 80 },
  { id: "ethics", name: "Ethics", icon: Scale, color: "bg-slate-800", border: "border-slate-700", glow: "shadow-slate-200", desc: "Master workplace boundaries and ethical decision making.", xp: 140 },
];

const COMPETENCIES = [
  { title: "Inclusion", icon: Users, desc: "Building diverse, respectful teams." },
  { title: "Active Listening", icon: MessageSquare, desc: "Hearing what's actually being said." },
  { title: "Writing Tone", icon: Mail, desc: "Professionalism in every pixel." },
  { title: "Body Language", icon: Target, desc: "The silent logic of leadership." },
  { title: "Ethics Logic", icon: Scale, desc: "Doin the right thing, every time." },
  { title: "Feedback Loop", icon: Zap, desc: "Giving and taking critique like a pro." },
];

const GAME_TYPES = [
  { name: "MCQ Training", desc: "Quick-fire logical choices", icon: Zap },
  { name: "Match Logic", desc: "Connect related prof. concepts", icon: Target },
  { name: "AI AI Typing", desc: "Write professional responses", icon: MessageSquare },
  { name: "Voice Master", desc: "Practice your tone out loud", icon: Rocket },
];

const FEATURES = [
  { icon: Target, color: "text-duo-blue", bg: "bg-blue-50", title: "Bite-Sized Lessons", desc: "5-minute sessions that actually stick. No more boring HR manuals." },
  { icon: CheckCircle, color: "text-duo-green", bg: "bg-green-50", title: "Instant AI Feedback", desc: "Jasa grades your typed responses with AI intelligence, in real-time." },
  { icon: Award, color: "text-duo-orange", bg: "bg-orange-50", title: "Earn Badges & XP", desc: "Unlock Badges, climb the leaderboard, and prove your professional edge." },
];

const STATS = [
  { label: "MODULES", value: "5", icon: MapIcon, color: "text-duo-blue", bg: "bg-blue-50" },
  { label: "XP EARNED", value: "1.2M", icon: Zap, color: "text-duo-yellow", bg: "bg-yellow-50" },
  { label: "ACCURACY", value: "98%", icon: Trophy, color: "text-duo-green", bg: "bg-green-50" },
];

export default function LandingPage() {
  const { xp, league } = useGameStore();

  return (
    <div className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
      <div className="fixed top-0 left-0 w-[600px] h-[600px] -z-10 bg-green-400/10 rounded-full blur-[150px] animate-pulse" />
      <div className="fixed top-1/2 right-0 w-[500px] h-[500px] -z-10 bg-blue-400/10 rounded-full blur-[150px]" />

      <main className="container mx-auto px-4 pb-32 pt-24 max-w-7xl">

        {/* ── HERO ── */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[80vh] py-12">
          <motion.div
            initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            className="flex-1 text-left"
          >
            {/* Pill Badge */}
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-3 bg-duo-blue/10 text-duo-blue font-black uppercase tracking-widest text-sm px-6 py-3 rounded-full mb-10 border border-duo-blue/20"
            >
              <Zap size={16} fill="currentColor" /> WorkEtiq · Learning Edition 2.0
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-black text-duo-dark mb-8 leading-[0.9] tracking-tighter"
            >
              Master the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-duo-blue to-duo-green">
                Workplace
              </span>
              <br />The Fun Way!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-duo-gray font-bold max-w-lg mb-12 leading-relaxed"
            >
              Level up your professional logic with AI-graded challenges and Jasa's playful coaching.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-5"
            >
              <Link href="/game-select">
                <button className="group relative duo-button duo-button-green text-2xl h-20 px-14 uppercase italic flex items-center gap-4 shadow-2xl shadow-green-200 hover:shadow-green-300 transition-all">
                  <Zap fill="currentColor" size={28} />
                  GET STARTED
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
              <Link href="/leaderboard">
                <button className="duo-button duo-button-white text-2xl h-20 px-14 uppercase italic flex items-center gap-4 border-4 border-duo-yellow text-duo-dark hover:bg-duo-yellow/5 transition-all">
                  <Trophy fill="currentColor" className="text-duo-yellow" size={28} /> LEADERBOARD
                </button>
              </Link>
            </motion.div>

            {/* Micro Stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex gap-10 mt-16"
            >
              {[{ v: "5+", l: "Modules" }, { v: "4", l: "Game Types" }, { v: "98%", l: "Pro Rating" }].map((s, i) => (
                <div key={i}>
                  <p className="text-4xl font-black text-duo-dark">{s.v}</p>
                  <p className="text-duo-gray font-bold text-sm uppercase tracking-widest">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Mascot */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, type: "spring" }}
            className="relative flex-shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-duo-green/20 to-duo-blue/20 rounded-full blur-[80px] scale-150" />
            <div className="relative z-10">
              <JasaMascot pose="waving" tip="Professional logic made fun! Ready?" className="w-72 h-72 md:w-96 md:h-96" />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -right-6 top-8 bg-duo-green text-white font-black px-6 py-3 rounded-2xl shadow-xl text-lg"
            >
              🏆 {league} League
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute -left-6 bottom-16 bg-white border-4 border-duo-yellow text-duo-dark font-black px-5 py-3 rounded-2xl shadow-xl text-base"
            >
              ⚡ {xp} XP Earned
            </motion.div>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="duo-card flex items-center gap-8 p-10 bg-white border-b-[8px]"
              >
                <div className={`w-20 h-20 ${stat.bg} rounded-3xl flex items-center justify-center`}>
                  <stat.icon size={36} className={stat.color} strokeWidth={3} />
                </div>
                <div>
                  <p className="text-sm font-black text-duo-gray uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-5xl font-black text-duo-dark tracking-tighter">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── GAME MODES ── */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14">
            <div>
              <p className="text-sm font-black text-duo-blue uppercase tracking-widest mb-3">5 Learning Paths</p>
              <h2 className="text-5xl md:text-7xl font-black text-duo-dark tracking-tighter uppercase italic">Choose Your Path</h2>
            </div>
            <Link href="/game-select" className="hidden md:block">
              <span className="group text-duo-blue font-black flex items-center gap-3 text-xl hover:gap-5 transition-all uppercase">
                VIEW FULL MAP <ArrowRight strokeWidth={4} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GAME_MODES.map((mode, i) => (
              <motion.div
                key={mode.id}
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`duo-card group flex flex-col bg-white border-b-[10px] overflow-hidden relative shadow-xl ${mode.glow}`}
              >
                {/* Top gradient strip */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${mode.color} opacity-80`} />

                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl ${mode.color} group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  <mode.icon size={40} strokeWidth={3} />
                </div>

                <h3 className="text-3xl font-black text-duo-dark mb-3 uppercase italic tracking-tighter">{mode.name}</h3>
                <p className="text-duo-gray font-bold mb-6 flex-1 leading-relaxed">{mode.desc}</p>

                <div className="flex items-center justify-between mb-6">
                  <span className="flex items-center gap-2 text-duo-blue font-black text-sm uppercase">
                    <Zap size={14} fill="currentColor" /> +{mode.xp} XP
                  </span>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, j) => <Star key={j} size={16} fill="currentColor" className="text-duo-yellow" />)}
                  </div>
                </div>

                <Link href={`/quiz/${mode.id}`}>
                  <button className={`duo-button w-full ${mode.color} text-white font-black text-lg py-4 border-b-4 group-hover:brightness-110 transition-all`}>
                    PLAY MODULE →
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CORE COMPETENCIES Grid ── */}
        <section className="mb-32">
          <div className="text-center mb-16 px-4">
            <p className="text-sm font-black text-duo-blue uppercase tracking-widest mb-4">Core Skills</p>
            <h2 className="text-5xl md:text-6xl font-black text-duo-dark tracking-tighter uppercase italic mb-6">Your Office Superpowers</h2>
            <p className="text-duo-gray font-bold text-xl max-w-2xl mx-auto">Master the 6 pillars of workplace logic that will set you apart from the crowd.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {COMPETENCIES.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="duo-card p-8 bg-white/50 border-dashed border-2 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <c.icon className="text-duo-blue" size={32} />
                </div>
                <h4 className="text-xl font-black text-duo-dark mb-2 uppercase tracking-tight">{c.title}</h4>
                <p className="text-duo-gray font-bold text-sm leading-snug">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── GAME MECHANICS Preview ── */}
        <section className="mb-32 py-20 bg-slate-900 rounded-[60px] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-duo-blue/20 rounded-full blur-[100px]" />
          <div className="container mx-auto px-10 relative z-10 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <p className="text-sm font-black text-duo-blue uppercase tracking-widest mb-6">How We Play</p>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter italic">4 WAYS TO <br /><span className="text-duo-green">MASTER LOGIC</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {GAME_TYPES.map((g, i) => (
                  <div key={i} className="flex flex-col gap-2 p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                    <g.icon size={24} className="text-duo-yellow" />
                    <p className="font-black uppercase italic tracking-tight">{g.name}</p>
                    <p className="text-white/60 text-sm font-bold">{g.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-80 h-80 bg-gradient-to-br from-duo-blue to-duo-green rounded-[80px] flex items-center justify-center shadow-[0_0_80px_rgba(28,176,246,0.3)]"
              >
                <Zap size={140} fill="white" className="text-white drop-shadow-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-duo-blue via-blue-600 to-duo-green p-16 text-center text-white shadow-2xl border-b-[12px] border-blue-800">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <Rocket size={72} className="mx-auto mb-8 animate-bounce" strokeWidth={2.5} />
            <h2 className="text-5xl md:text-7xl font-black mb-8 italic uppercase tracking-tighter">Your Career Starts Now</h2>
            <p className="text-xl md:text-2xl font-bold mb-14 text-white/90 max-w-3xl mx-auto leading-relaxed">
              "Logic is the OS of your career. Let's make the upgrade fun together!" — JASA 2.0
            </p>
            <Link href="/game-select">
              <button className="duo-button duo-button-white text-2xl h-20 px-16 text-duo-blue font-black uppercase italic shadow-2xl hover:scale-105 transition-transform">
                🚀 LAUNCH MISSION
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
