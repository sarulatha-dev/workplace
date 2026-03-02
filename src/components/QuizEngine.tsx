"use client";

import { useGameStore } from "@/store/gameStore";
import { JasaMascot, MascotPose } from "@/components/JasaMascot";
import { TypingChallenge } from "@/components/TypingChallenge";
import { MatchCards } from "@/components/MatchCards";
import { VoiceEtiquette } from "@/components/VoiceEtiquette";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trophy, Zap, Star, ArrowLeft, Shield, Award, Crown, Bot, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export type QuestionType = "mcq" | "matching" | "typing" | "voice";

export interface Question {
    id: string;
    type: QuestionType;
    text: string;
    options?: string[];
    correctAnswer?: number;
    expected?: string;
    pairs?: { left: string; right: string }[];
    phrase?: string;
    hint: string;
}

interface QuizEngineProps {
    mode: string;
    questions: Question[];
}

export default function QuizEngine({ mode, questions }: QuizEngineProps) {
    const router = useRouter();
    const { xp, lives, addXP, loseLife, resetLives, incrementStreak, resetStreak, addBadge, setRole, playMode, multiType } = useGameStore();

    const [currentIdx, setCurrentIdx] = useState(0);
    const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [mascotPose, setMascotPose] = useState<MascotPose>("idle");
    const [showHint, setShowHint] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [showScore, setShowScore] = useState<number | undefined>(undefined);

    // Multiplayer State
    const [isBuzzed, setIsBuzzed] = useState(false);
    const [buzzedBy, setBuzzedBy] = useState<'user' | 'bot' | null>(null);

    const currentQuestion = questions[currentIdx];

    if (questions.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center">
                <JasaMascot pose="thinking" className="w-64 h-64 mb-10" />
                <h1 className="text-4xl font-black mb-4 text-duo-orange uppercase text-center">NO CHALLENGES FOUND</h1>
                <p className="text-xl mb-10 font-bold text-duo-gray uppercase text-center">Jasa Mentor: &quot;It looks like this module doesn&apos;t have any challenges of this type yet. Try another one!&quot;</p>
                <button
                    onClick={() => router.back()}
                    className="duo-button duo-button-blue text-xl w-64 uppercase"
                >
                    GO BACK
                </button>
            </div>
        );
    }

    // JasaBot AI logic
    useEffect(() => {
        if (playMode === 'multi' && multiType === 'bot' && !isBuzzed && !isAnswered) {
            const botWait = Math.random() * 3000 + 4000; // 4-7 seconds
            const timer = setTimeout(() => {
                if (!isBuzzed && !isAnswered) {
                    setIsBuzzed(true);
                    setBuzzedBy('bot');
                    setMascotPose('pointing');
                }
            }, botWait);
            return () => clearTimeout(timer);
        }
    }, [currentIdx, isBuzzed, isAnswered, playMode, multiType]);

    const handleBuzz = () => {
        if (isBuzzed) return;
        setIsBuzzed(true);
        setBuzzedBy('user');
    };

    const handleCorrect = () => {
        if (isAnswered) return;
        setIsAnswered(true);
        setMascotPose("cheering");
        setShowScore(10);
        addXP(10);
        incrementStreak();

        const congrats = [
            "Pure professional genius!",
            "Your logic is unstoppable!",
            "Corporate would be proud.",
            "That's how a leader thinks!",
            "Flawless execution!"
        ];
        const randomMsg = congrats[Math.floor(Math.random() * congrats.length)];
        // We'll show this in the bottom bar

        // Award badge based on mode
        if (mode === 'email') {
            addBadge('manager-silver');
            setRole('Email Manager');
        } else if (mode === 'meeting') {
            addBadge('collaborator');
            setRole('Lead Facilitator');
        }

        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#58CC02", "#1CB0F6", "#FFC800"]
        });

        setTimeout(() => setShowScore(undefined), 1500);
    };

    const handleWrong = () => {
        if (isAnswered) return;
        setIsAnswered(true);
        setMascotPose("oops");
        loseLife();
        resetStreak();
    };

    const handleMCQAnswer = (idx: number) => {
        if (isAnswered) return;
        setSelectedOpt(idx);
        if (idx === currentQuestion.correctAnswer) {
            handleCorrect();
        } else {
            handleWrong();
        }
    };

    const nextQuestion = () => {
        if (currentIdx + 1 < questions.length) {
            setCurrentIdx(prev => prev + 1);
            setSelectedOpt(null);
            setIsAnswered(false);
            setMascotPose("idle");
            setIsBuzzed(false);
            setBuzzedBy(null);
        } else {
            setIsFinished(true);
        }
    };

    if (lives <= 0) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center">
                <JasaMascot pose="oops" className="w-64 h-64 mb-10" />
                <h1 className="text-5xl font-black mb-4 text-duo-orange">OUT OF HEARTS!</h1>
                <p className="text-xl mb-10 font-bold text-duo-gray uppercase text-center">Jasa Mentor: &quot;Don&apos;t give up! Let&apos;s reboot your professional logic.&quot;</p>
                <button
                    onClick={() => { resetLives(); router.push('/game-select'); }}
                    className="duo-button duo-button-blue text-xl w-64 uppercase"
                >
                    REFRESH HEARTS
                </button>
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center">
                <JasaMascot pose="cheering" className="w-64 h-64 mb-10" />
                <h1 className="text-6xl font-black mb-4 text-duo-green uppercase text-center">LEVEL MASTERED!</h1>
                <div className="duo-card mb-10 flex flex-col items-center p-12 bg-white">
                    <p className="text-2xl font-black text-duo-blue uppercase mb-2">Total Progress</p>
                    <p className="text-6xl font-black text-duo-green">+{questions.length * 10} XP</p>
                </div>
                <button
                    onClick={() => router.push('/game-select')}
                    className="duo-button duo-button-green text-2xl h-20 px-16 uppercase"
                >
                    CONTINUE JOURNEY
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 pb-64 max-w-7xl relative mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* LEFT SIDEBAR: Jasa & Hints */}
            <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6 lg:sticky lg:top-8 h-fit">
                {/* Mobile Header (Hidden on Desktop) */}
                <div className="flex justify-between items-center lg:hidden mb-2">
                    <button onClick={() => router.back()} className="text-duo-gray hover:text-duo-dark font-black tracking-widest uppercase flex items-center gap-2 text-lg transition-all">
                        <ArrowLeft size={24} strokeWidth={3} /> QUIT
                    </button>
                    <div className="flex items-center gap-2 text-duo-orange font-black text-xl">
                        <Heart fill="currentColor" size={24} className="animate-pulse" /> {lives}
                    </div>
                </div>

                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col items-center bg-white/60 backdrop-blur-sm p-6 rounded-[40px] border-4 border-white shadow-xl"
                >
                    <div className="relative group mb-6">
                        <div className="absolute inset-0 bg-duo-blue/10 rounded-full blur-[40px] group-hover:blur-[60px] transition-all" />
                        <JasaMascot pose={mascotPose} showScore={showScore} className="w-64 h-64 relative z-10" />
                    </div>

                    <AnimatePresence mode="wait">
                        {(showHint || !isAnswered) && (
                            <motion.div
                                key={isAnswered ? 'feedback' : 'hint'}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white p-6 rounded-[30px] border-4 border-duo-blue/10 relative w-full shadow-md text-center"
                            >
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t-4 border-l-4 border-duo-blue/10 rotate-45" />
                                <p className="text-duo-dark font-black text-xl italic leading-tight uppercase tracking-tight">
                                    {isAnswered
                                        ? mascotPose === 'cheering'
                                            ? "SPOT ON! YOU'RE A PRO."
                                            : "PRACTICE MAKES PERFECT! TRY AGAIN."
                                        : buzzedBy === 'bot'
                                            ? "TOO FAST! JASABOT GOT THIS!"
                                            : `JASA SAYS: ${currentQuestion?.hint}`}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* RIGHT SIDE: Quiz Content */}
            <div className="flex-1 flex flex-col pt-2 lg:pt-0">
                {/* Desktop Header: Quit, Progress, Hearts */}
                <div className="hidden lg:flex justify-between items-center mb-8 w-full gap-8">
                    <button onClick={() => router.back()} className="text-duo-gray hover:text-duo-blue font-black tracking-widest uppercase flex items-center gap-3 text-xl transition-all flex-shrink-0 group">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
                            <ArrowLeft size={28} strokeWidth={4} />
                        </div>
                        QUIT
                    </button>

                    <div className="flex-1 flex items-center gap-4">
                        <div className="flex-1 h-8 bg-slate-200/50 backdrop-blur-sm rounded-full overflow-hidden border-4 border-white shadow-inner relative">
                            <motion.div
                                className="h-full bg-gradient-to-r from-duo-green to-emerald-400 shadow-[0_4px_0_0_#46A202] rounded-full relative overflow-hidden"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </motion.div>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-lg border-2 border-duo-yellow/20 flex items-center justify-center animate-bounce">
                            <Star fill="#FFC800" className="text-duo-yellow" size={28} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-3xl border-2 border-duo-orange/20 shadow-xl flex-shrink-0">
                        <Heart fill="#FF4B4B" size={32} className="text-duo-orange animate-pulse" />
                        <span className="text-3xl font-black text-duo-dark tabular-nums">{lives}</span>
                    </div>
                </div>

                <div className="relative min-h-[500px] flex flex-col justify-center">
                    {/* Buzzer Overlay for Multi Mode */}
                    {playMode === 'multi' && !isBuzzed && !isAnswered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl rounded-[60px] p-12 text-center border-8 border-white shadow-2xl"
                        >
                            <h3 className="text-7xl font-black text-duo-dark mb-12 italic tracking-tighter leading-none">RACE TO THE BUZZER!</h3>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9, y: 10 }}
                                onClick={handleBuzz}
                                className="w-80 h-80 bg-duo-orange rounded-full border-b-[20px] border-duo-orange-dark active:border-b-0 flex items-center justify-center text-white font-black text-6xl shadow-[0_30px_60px_-15px_rgba(255,75,75,0.4)] transition-all"
                            >
                                BUZZ!
                            </motion.button>
                            <p className="mt-16 text-3xl font-black text-duo-blue tracking-[0.3em] animate-pulse">GET READY...</p>
                        </motion.div>
                    )}

                    {/* Bot Winning State */}
                    {buzzedBy === 'bot' && !isAnswered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-duo-orange/10 backdrop-blur-xl rounded-[60px] p-12 text-center border-8 border-duo-orange border-dashed shadow-2xl"
                        >
                            <Bot size={140} className="text-duo-orange mb-8 animate-bounce" />
                            <h3 className="text-7xl font-black text-duo-orange mb-6 italic tracking-tighter leading-none uppercase">JASABOT WINS!</h3>
                            <p className="text-3xl font-black text-duo-dark mb-12 uppercase tracking-tight">He claimed this logic point.</p>
                            <button onClick={nextQuestion} className="duo-button duo-button-orange text-3xl px-16 h-24">CONTINUE MISSION</button>
                        </motion.div>
                    )}

                    <div className={playMode === 'multi' && !isBuzzed && !isAnswered ? 'blur-xl grayscale opacity-30 scale-95 transition-all duration-500' : 'transition-all duration-500'}>
                        <h2 className={`font-display text-xl md:text-2xl lg:text-3xl font-black text-duo-dark mb-8 leading-tight uppercase tracking-tighter text-center italic ${currentQuestion?.type === 'typing' ? 'hidden' : ''}`}>
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-duo-dark to-slate-500">
                                {currentQuestion?.text}
                            </span>
                        </h2>

                        <div className="space-y-6 max-w-3xl mx-auto">
                            {currentQuestion.type === "mcq" && (
                                <div className="grid grid-cols-1 gap-6">
                                    {currentQuestion.options?.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleMCQAnswer(i)}
                                            disabled={isAnswered}
                                            className={`duo-card p-6 md:p-8 text-left transition-all relative overflow-hidden flex items-center gap-8 ${selectedOpt === i
                                                ? i === currentQuestion.correctAnswer
                                                    ? "border-duo-green bg-duo-green/5 ring-4 ring-duo-green/20"
                                                    : "border-duo-orange bg-duo-orange/5 ring-4 ring-duo-orange/20"
                                                : "hover:border-duo-blue/50 hover:bg-slate-50/50 shadow-xl"
                                                }`}
                                        >
                                            <div className={`w-16 h-16 rounded-[20px] duo-token text-3xl shrink-0
                                                ${selectedOpt === i
                                                    ? i === currentQuestion.correctAnswer
                                                        ? 'bg-duo-green text-white border-duo-green-dark'
                                                        : 'bg-duo-orange text-white border-duo-orange-dark'
                                                    : 'bg-white text-duo-gray border-slate-200 group-hover:border-duo-blue group-hover:text-duo-blue'
                                                }
                                            `}>
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                            <span className={`flex-1 font-sans text-2xl md:text-3xl font-black leading-tight tracking-tight transition-colors ${selectedOpt === i ? 'text-duo-dark' : 'text-slate-700'}`}>
                                                {opt}
                                            </span>

                                            {/* Selection Indicator */}
                                            {selectedOpt === i && (
                                                <motion.div
                                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${i === currentQuestion.correctAnswer ? 'bg-duo-green' : 'bg-duo-orange'
                                                        }`}
                                                >
                                                    {i === currentQuestion.correctAnswer ? <Star size={24} fill="white" className="text-white" /> : <Shield size={24} className="text-white" />}
                                                </motion.div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {currentQuestion.type === "matching" && (
                                <MatchCards
                                    pairs={currentQuestion.pairs || []}
                                    onComplete={handleCorrect}
                                />
                            )}

                            {currentQuestion.type === "typing" && (
                                <TypingChallenge
                                    prompt={currentQuestion.text || ""}
                                    expected={currentQuestion.expected || ""}
                                    onComplete={handleCorrect}
                                    onFail={handleWrong}
                                />
                            )}

                            {currentQuestion.type === "voice" && (
                                <VoiceEtiquette
                                    phrase={currentQuestion.phrase || ""}
                                    onComplete={handleCorrect}
                                />
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isAnswered && (
                            <motion.div
                                initial={{ y: 200, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className={`fixed bottom-0 left-0 right-0 p-4 md:p-6 border-t-4 z-50 backdrop-blur-lg shadow-[0_-10px_40px_rgba(0,0,0,0.1)] ${mascotPose === "cheering"
                                    ? "bg-white/30 border-duo-green"
                                    : "bg-white/30 border-duo-orange"
                                    }`}
                            >
                                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="flex items-center gap-8 text-center md:text-left">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -30 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white shadow-xl ${mascotPose === "cheering" ? "bg-duo-green" : "bg-duo-orange"
                                                }`}
                                        >
                                            {mascotPose === "cheering" ? <Trophy size={28} strokeWidth={3} /> : <Zap size={28} strokeWidth={3} />}
                                        </motion.div>
                                        <div>
                                            <h4 className={`text-xl md:text-3xl font-black uppercase italic tracking-tighter leading-none mb-1 ${mascotPose === "cheering" ? "text-duo-green" : "text-duo-orange"}`}>
                                                {mascotPose === "cheering" ? "LEVEL UP LOGIC!" : "IMPROVE YOUR VIBE!"}
                                            </h4>
                                            <p className="text-xs md:text-sm font-black text-duo-dark opacity-60 uppercase tracking-widest">
                                                {mascotPose === "cheering" ? "PROFESSIONAL STREAK!" : "STAY FOCUSED."}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={nextQuestion}
                                        className={`duo-button text-xl px-12 h-14 md:h-16 uppercase italic tracking-tighter min-w-[200px] ${mascotPose === "cheering" ? "duo-button-green" : "duo-button-orange"
                                            }`}
                                    >
                                        {currentIdx + 1 < questions.length ? "NEXT CHALLENGE" : "VIEW RESULTS"}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
