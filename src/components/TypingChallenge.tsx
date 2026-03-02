"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, Sparkles, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface TypingChallengeProps {
    prompt: string;
    expected: string;
    onComplete: () => void;
    onFail?: () => void;
}

// --- AI Intelligence Engine ---
// Evaluates user response on multiple professional writing dimensions
function evaluateResponse(userAnswer: string, expected: string): {
    score: number;
    grade: 'excellent' | 'good' | 'poor';
    feedback: string;
    tips: string[];
} {
    const user = userAnswer.toLowerCase().trim();
    const ideal = expected.toLowerCase().trim();

    if (!user) {
        return { score: 0, grade: 'poor', feedback: "You didn't type anything!", tips: [] };
    }

    let score = 0;
    const tips: string[] = [];

    // 1. Length check – too short is always a bad sign
    const wordCount = user.split(/\s+/).length;
    if (wordCount >= 5) score += 10;
    else tips.push("Write a complete sentence (at least 5 words).");

    // 2. Professional vocabulary check (negative words)
    const casualWords = ["hey", "lol", "u ", "ur ", "ya ", "nah", "ok", "k ", "thx", "omg", "tbh", "imo", "gonna", "wanna", "kinda", "sorta", "dunno", "yeah", "yep", "nope", "cool", "awesome", "super", "totally", "literally", "dude", "bro", "guys", "gotta"];
    const casualFound = casualWords.filter(w => user.includes(w));
    if (casualFound.length === 0) score += 20;
    else tips.push(`Avoid casual words: ${casualFound.slice(0, 3).join(", ")}.`);

    // 3. Professional vocabulary check (positive words from expected answer)
    const idealWords = ideal.split(/\s+/).filter(w => w.length > 4);
    const matchedWords = idealWords.filter(w => user.includes(w));
    const vocabScore = Math.min(30, Math.round((matchedWords.length / Math.max(idealWords.length, 1)) * 30));
    score += vocabScore;
    if (vocabScore < 10) tips.push("Try to include professional terminology from workplace communication.");

    // 4. Sentence structure – starts with capital letter, ends with period/punctuation
    const startsCapital = /^[A-Z]/.test(userAnswer.trim());
    const endsPunctuation = /[.!?]$/.test(userAnswer.trim());
    if (startsCapital) score += 10;
    else tips.push("Start your response with a capital letter.");
    if (endsPunctuation) score += 10;
    else tips.push("End your sentence with proper punctuation (. or ?).");

    // 5. Politeness / soft words
    const politeWords = ["please", "thank", "appreciate", "kindly", "assist", "support", "certainly", "absolutely", "understand", "acknowledge", "happy to", "glad to", "would", "could", "may i", "i'd like", "we would", "team", "together", "schedule", "availability", "follow up", "confirm"];
    const politeFound = politeWords.filter(w => user.includes(w));
    if (politeFound.length > 0) score += 20;
    else tips.push("Add a polite phrase like 'Would it be possible...' or 'I'd appreciate...'");

    // Clamp score
    score = Math.min(100, Math.max(0, score));

    let grade: 'excellent' | 'good' | 'poor';
    let feedback: string;

    if (score >= 75) {
        grade = 'excellent';
        feedback = "Outstanding! Your response reads like a seasoned professional.";
    } else if (score >= 45) {
        grade = 'good';
        feedback = "Good effort! A few tweaks away from perfect workplace communication.";
    } else {
        grade = 'poor';
        feedback = "Keep practicing! Professional writing takes time to master.";
    }

    return { score, grade, feedback, tips };
}

const GRADE_CONFIG = {
    excellent: { color: "text-duo-green", bg: "bg-duo-green/10 border-duo-green", icon: CheckCircle, label: "EXCELLENT" },
    good: { color: "text-duo-yellow", bg: "bg-duo-yellow/10 border-duo-yellow", icon: AlertCircle, label: "GOOD EFFORT" },
    poor: { color: "text-duo-orange", bg: "bg-duo-orange/10 border-duo-orange", icon: XCircle, label: "NEEDS WORK" },
};

export const TypingChallenge = ({ prompt, expected, onComplete, onFail }: TypingChallengeProps) => {
    const [input, setInput] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState<ReturnType<typeof evaluateResponse> | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitted || !input.trim()) return;

        const evaluation = evaluateResponse(input, expected);
        setResult(evaluation);
        setIsSubmitted(true);

        // Route to onFail or onComplete based on AI grade
        if (evaluation.grade === 'excellent' || evaluation.grade === 'good') {
            onComplete();
        } else {
            if (onFail) onFail();
        }
    };

    const gradeConfig = result ? GRADE_CONFIG[result.grade] : null;

    return (
        <div className="flex flex-col gap-6 items-center w-full">
            {/* Question Prompt Box */}
            <div className="bg-white p-8 rounded-3xl border-4 border-duo-blue/20 shadow-sm w-full text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <Sparkles size={28} className="text-duo-blue animate-pulse" />
                    <span className="text-duo-gray font-black uppercase tracking-widest text-base">AI-Graded Response</span>
                    <Sparkles size={28} className="text-duo-blue animate-pulse" />
                </div>
                <p className="text-duo-dark font-black text-lg md:text-xl lg:text-2xl leading-snug italic">{prompt}</p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                <div className="relative group">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isSubmitted}
                        placeholder="Type your professional response here..."
                        rows={3}
                        className="w-full px-8 py-6 rounded-3xl border-4 border-duo-gray/20 text-xl font-bold focus:outline-none focus:border-duo-blue focus:ring-8 focus:ring-duo-blue/10 bg-white group-hover:bg-slate-50 transition-all placeholder:text-duo-gray/40 shadow-inner resize-none disabled:opacity-70"
                        autoFocus
                    />
                    <Keyboard className="absolute right-6 top-6 text-duo-gray/30 group-focus-within:text-duo-blue transition-colors" size={28} />
                </div>

                {!isSubmitted && (
                    <motion.button
                        type="submit"
                        disabled={!input.trim()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="duo-button duo-button-blue text-2xl py-5 uppercase tracking-widest disabled:opacity-50 disabled:grayscale transition-all"
                    >
                        ✦ SUBMIT FOR AI REVIEW
                    </motion.button>
                )}
            </form>

            {/* AI Evaluation Result */}
            <AnimatePresence>
                {result && gradeConfig && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`w-full p-6 md:p-8 rounded-3xl border-4 ${gradeConfig.bg} flex flex-col gap-4`}
                    >
                        {/* Score Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <gradeConfig.icon size={40} className={gradeConfig.color} strokeWidth={3} />
                                <div>
                                    <p className={`font-black text-2xl uppercase tracking-tight ${gradeConfig.color}`}>{gradeConfig.label}</p>
                                    <p className="text-duo-gray font-bold text-sm">AI Evaluation Complete</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-4xl md:text-5xl font-black ${gradeConfig.color}`}>{result.score}</p>
                                <p className="text-duo-gray font-bold text-sm">/ 100</p>
                            </div>
                        </div>

                        {/* Feedback Message */}
                        <p className="text-duo-dark font-bold text-lg md:text-xl italic border-t-2 border-current/20 pt-4">{result.feedback}</p>

                        {/* Improvement Tips */}
                        {result.tips.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <p className="font-black text-duo-dark uppercase tracking-widest text-sm">JASA'S TIPS:</p>
                                {result.tips.map((tip, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="text-duo-orange font-black text-lg mt-0.5">›</span>
                                        <span className="text-duo-dark font-bold text-sm md:text-base">{tip}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Model Answer */}
                        <div className="bg-white/60 rounded-2xl p-4 md:p-5 border-2 border-current/10">
                            <p className="font-black text-duo-dark uppercase tracking-widest text-xs mb-1">MODEL ANSWER:</p>
                            <p className="text-duo-dark font-bold text-base md:text-lg italic">"{expected}"</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
