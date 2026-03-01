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
                <p className="text-xl mb-10 font-bold text-duo-gray uppercase text-center">Jasa Mentor: "It looks like this module doesn't have any challenges of this type yet. Try another one!"</p>
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
                <p className="text-xl mb-10 font-bold text-duo-gray uppercase text-center">Jasa Mentor: "Don't give up! Let's reboot your professional logic."</p>
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
        <div className="container mx-auto px-4 py-8 pb-32 max-w-7xl relative mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
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
                <div className="hidden lg:flex justify-between items-center mb-6 w-full gap-6">
                    <button onClick={() => router.back()} className="text-duo-gray hover:text-duo-dark font-black tracking-widest uppercase flex items-center gap-3 text-xl transition-all flex-shrink-0">
                        <ArrowLeft size={28} strokeWidth={4} /> QUIT
                    </button>

                    <div className="flex-1 h-6 bg-duo-gray/10 rounded-full overflow-hidden border-4 border-duo-gray/5">
                        <motion.div
                            className="h-full bg-duo-green shadow-[0_4px_0_0_#46A202] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                        />
                    </div>

                    <div className="flex items-center gap-2 text-duo-orange font-black text-2xl flex-shrink-0">
                        <Heart fill="currentColor" size={32} className="animate-pulse" /> {lives}
                    </div>
                </div>

                <div className="relative min-h-[400px] flex flex-col justify-center">
                    {/* Buzzer Overlay for Multi Mode */}
                    {playMode === 'multi' && !isBuzzed && !isAnswered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-md rounded-[50px] p-12 text-center"
                        >
                            <h3 className="text-6xl font-black text-duo-dark mb-12 italic tracking-tighter">RACE TO THE BUZZER!</h3>
                            <motion.button
                                whileTap={{ scale: 0.9, y: 5 }}
                                onClick={handleBuzz}
                                className="w-72 h-72 bg-duo-orange rounded-full border-b-[16px] border-duo-orange-dark active:border-b-0 flex items-center justify-center text-white font-black text-5xl shadow-[0_20px_0_0_rgba(0,0,0,0.1)] hover:scale-105 transition-transform"
                            >
                                BUZZ!
                            </motion.button>
                            <p className="mt-12 text-3xl font-black text-duo-gray tracking-[0.2em] animate-pulse">WAIT FOR IT...</p>
                        </motion.div>
                    )}

                    {/* Bot Winning State */}
                    {buzzedBy === 'bot' && !isAnswered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-duo-orange/10 backdrop-blur-md rounded-[50px] p-12 text-center border-8 border-duo-orange border-dashed"
                        >
                            <Bot size={120} className="text-duo-orange mb-8 animate-bounce" />
                            <h3 className="text-6xl font-black text-duo-orange mb-6 italic tracking-tighter">JASABOT WINS!</h3>
                            <p className="text-2xl font-black text-duo-dark mb-12 uppercase">He claimed this logic point.</p>
                            <button onClick={nextQuestion} className="duo-button duo-button-orange text-3xl px-16 h-24">CONTINUE MISSION</button>
                        </motion.div>
                    )}

                    <div className={playMode === 'multi' && !isBuzzed && !isAnswered ? 'blur-md grayscale opacity-50' : ''}>
                        <h2 className={`text-3xl md:text-5xl font-black text-duo-dark mb-8 leading-tight uppercase italic tracking-tighter text-center ${currentQuestion?.type === 'typing' ? 'hidden' : ''}`}>
                            {currentQuestion?.text}
                        </h2>

                        <div className="space-y-4 max-w-2xl mx-auto">
                            {currentQuestion.type === "mcq" && (
                                <div className="grid grid-cols-1 gap-4">
                                    {currentQuestion.options?.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleMCQAnswer(i)}
                                            disabled={isAnswered}
                                            className={`duo-card p-8 text-left text-2xl font-black transition-all border-b-[10px] transform active:translate-y-1 active:border-b-0 ${selectedOpt === i
                                                ? i === currentQuestion.correctAnswer
                                                    ? "bg-duo-green/10 border-duo-green text-duo-green"
                                                    : "bg-duo-orange/10 border-duo-orange text-duo-orange"
                                                : "bg-white hover:bg-slate-50 border-duo-gray/20 hover:border-duo-blue/30"
                                                }`}
                                        >
                                            <div className="flex items-center gap-8">
                                                <span className={`inline-flex w-14 h-14 rounded-2xl border-4 items-center justify-center text-center text-3xl italic
                                                ${selectedOpt === i ? 'border-current' : 'border-duo-gray/20 text-duo-gray'}
                                            `}>
                                                    {i + 1}
                                                </span>
                                                <span className="flex-1 leading-tight uppercase italic tracking-tight">{opt}</span>
                                            </div>
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
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className={`fixed bottom-0 left-0 right-0 p-8 border-t-4 z-50 ${mascotPose === "cheering"
                                    ? "bg-duo-green/10 border-duo-green text-duo-green"
                                    : "bg-duo-orange/10 border-duo-orange text-duo-orange"
                                    }`}
                            >
                                <div className="max-w-4xl mx-auto flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${mascotPose === "cheering" ? "bg-duo-green" : "bg-duo-orange"
                                            }`}>
                                            <Zap size={32} fill="currentColor" />
                                        </div>
                                        <div>
                                            <h4 className="text-3xl font-black uppercase tracking-tighter">
                                                {mascotPose === "cheering" ? "EXCELLENT LOGIC!" : "PROFESSIONAL OOPS!"}
                                            </h4>
                                            <p className="text-lg font-bold opacity-80">
                                                {mascotPose === "cheering" ? "+10 XP Earned" : "You lost a heart. Study Jasa's tip!"}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={nextQuestion}
                                        className={`duo-button text-xl px-12 h-16 uppercase ${mascotPose === "cheering" ? "duo-button-green" : "duo-button-orange"
                                            }`}
                                    >
                                        CONTINUE
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
