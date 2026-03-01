"use client";

import { use, useState } from "react";
import QuizEngine, { QuestionType } from "@/components/QuizEngine";
import { ChallengeMode } from "@/components/ChallengeMode";
import { QUIZ_DATA } from "@/lib/quizData";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizPage({ params }: { params: Promise<{ mode: string }> }) {
    const { mode: levelId } = use(params);
    const router = useRouter();
    const data = QUIZ_DATA[levelId as keyof typeof QUIZ_DATA];

    const [selectedType, setSelectedType] = useState<QuestionType | null>(null);

    if (!data) {
        return (
            <div className="p-20 text-center font-black text-2xl flex flex-col items-center gap-6">
                <p>Module logic not found...</p>
                <button onClick={() => router.push('/game-select')} className="duo-button duo-button-white">Back to Map</button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 pt-16">
            <AnimatePresence mode="wait">
                {!selectedType ? (
                    <motion.div
                        key="mode-select"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ChallengeMode
                            title={data.title}
                            onSelect={(type) => setSelectedType(type)}
                            onBack={() => router.push('/game-select')}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="quiz-engine"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <QuizEngine
                            mode={levelId}
                            questions={data.questions.filter(q => !q.type || q.type === selectedType)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
