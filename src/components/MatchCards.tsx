"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Card {
    id: number;
    content: string;
    pairId: number;
    isFlipped: boolean;
    isMatched: boolean;
}

interface MatchCardsProps {
    pairs: { left: string; right: string }[];
    onComplete: () => void;
}

export const MatchCards = ({ pairs, onComplete }: MatchCardsProps) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);

    useEffect(() => {
        const initialCards: Card[] = [];
        pairs.forEach((pair, idx) => {
            initialCards.push(
                { id: idx * 2, content: pair.left, pairId: idx, isFlipped: false, isMatched: false },
                { id: idx * 2 + 1, content: pair.right, pairId: idx, isFlipped: false, isMatched: false }
            );
        });
        setCards(initialCards.sort(() => Math.random() - 0.5));
    }, [pairs]);

    const handleFlip = (id: number) => {
        if (flipped.length === 2 || cards.find(c => c.id === id)?.isMatched || cards.find(c => c.id === id)?.isFlipped) return;

        const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
        setCards(newCards);
        setFlipped([...flipped, id]);

        if (flipped.length === 1) {
            const first = cards.find(c => c.id === flipped[0])!;
            const second = cards.find(c => c.id === id)!;

            if (first.pairId === second.pairId) {
                setTimeout(() => {
                    setCards(prev => prev.map(c => c.pairId === first.pairId ? { ...c, isMatched: true } : c));
                    setFlipped([]);
                    if (newCards.every(c => c.isMatched || c.pairId === first.pairId)) onComplete();
                }, 600);
            } else {
                setTimeout(() => {
                    setCards(prev => prev.map(c => (c.id === first.id || c.id === id) ? { ...c, isFlipped: false } : c));
                    setFlipped([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
                <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFlip(card.id)}
                    className={`h-32 brutalist-border cursor-pointer perspective-1000 ${card.isMatched ? 'bg-success/20 text-success opacity-50' : 'bg-white'
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {!card.isFlipped && !card.isMatched ? (
                            <motion.div
                                key="back"
                                exit={{ rotateY: 90 }}
                                className="w-full h-full flex items-center justify-center bg-navy text-neon-green text-3xl font-black"
                            >
                                ?
                            </motion.div>
                        ) : (
                            <motion.div
                                key="front"
                                initial={{ rotateY: -90 }}
                                animate={{ rotateY: 0 }}
                                className="w-full h-full flex items-center justify-center p-4 text-center text-sm font-bold uppercase"
                            >
                                {card.content}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
};
