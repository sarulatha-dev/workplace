"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, AlertCircle } from "lucide-react";

interface VoiceEtiquetteProps {
    phrase: string;
    onComplete: () => void;
}

export const VoiceEtiquette = ({ phrase, onComplete }: VoiceEtiquetteProps) => {
    const [isListening, setIsListening] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [error, setError] = useState<string | null>(null);

    const startListening = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError("Speech Recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        recognition.onresult = (event: any) => {
            if (isAnswered) return;
            const speechToText = event.results[0][0].transcript;
            setTranscript(speechToText);
            setIsAnswered(true);
            onComplete();
        };

        recognition.onerror = (event: any) => {
            setError("Error: " + event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <div className="flex flex-col items-center gap-12 py-8 w-full">
            <div className="text-center w-full">
                <h3 className="text-2xl font-black mb-4 text-duo-gray uppercase tracking-widest">Speak Clearly:</h3>
                <div className="bg-duo-blue/5 p-8 rounded-[40px] border-4 border-duo-blue/20 max-w-2xl mx-auto shadow-sm">
                    <p className="text-4xl font-black text-duo-blue leading-tight italic">
                        "{phrase}"
                    </p>
                </div>
            </div>

            <div className="relative group">
                <AnimatePresence>
                    {isListening && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0.2 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="absolute -inset-8 bg-duo-orange rounded-full -z-10 animate-ping"
                        />
                    )}
                </AnimatePresence>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9, y: 5 }}
                    onClick={startListening}
                    disabled={isListening || isAnswered}
                    className={`w-40 h-40 rounded-full border-b-[12px] flex items-center justify-center transition-all ${isListening
                            ? "bg-duo-orange border-duo-orange-dark translate-y-2 border-b-0 shadow-none"
                            : isAnswered
                                ? "bg-duo-gray/20 border-duo-gray/30 cursor-not-allowed border-b-0 shadow-none"
                                : "bg-white border-duo-gray/10 hover:border-duo-blue/20 shadow-2xl"
                        }`}
                >
                    {isListening ? (
                        <Mic size={64} className="text-white animate-pulse" />
                    ) : (
                        <Mic size={64} className={isAnswered ? "text-duo-gray" : "text-duo-blue"} />
                    )}
                </motion.button>
            </div>

            <div className="text-center max-w-md w-full">
                {isListening ? (
                    <p className="text-2xl font-black text-duo-orange animate-pulse uppercase italic tracking-tighter">Jasa is Listening...</p>
                ) : isAnswered ? (
                    <div className="p-6 rounded-3xl bg-slate-100 border-2 border-slate-200">
                        <p className="text-sm font-black text-duo-gray uppercase mb-2">Jasa Captured:</p>
                        <p className="text-xl font-bold text-duo-dark italic">"{transcript}"</p>
                    </div>
                ) : (
                    <p className="text-xl font-black text-duo-gray uppercase tracking-widest opacity-40">Tap the mic to start</p>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 p-4 rounded-2xl bg-duo-orange/10 text-duo-orange flex items-center justify-center gap-3 font-black border-2 border-duo-orange/20"
                    >
                        <AlertCircle size={24} /> {error}
                    </motion.div>
                )}
            </div>
        </div>
    );
};
