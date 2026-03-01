"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
    id: string;
    name: string;
    icon: string;
    role: string;
}

export interface Player {
    id: string;
    name: string;
    score: number;
    lives: number;
    color: string;
    isBuzzed: boolean;
    badges: string[];
    role: string;
}

interface GameState {
    xp: number;
    lives: number;
    streak: number;
    unlockedLevels: string[];
    badges: string[];
    currentRole: string;
    league: 'Bronze' | 'Gold' | 'Diamond';
    playMode: 'single' | 'multi';
    multiType: 'friends' | 'bot' | undefined;

    // Actions
    addXP: (amount: number) => void;
    loseLife: () => void;
    resetLives: () => void;
    incrementStreak: () => void;
    resetStreak: () => void;
    unlockLevel: (levelId: string) => void;
    addBadge: (badgeId: string) => void;
    setRole: (role: string) => void;
    setPlayMode: (mode: 'single' | 'multi', type?: 'friends' | 'bot') => void;
    updateLeague: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            xp: 0,
            lives: 5,
            streak: 0,
            unlockedLevels: ["emails-1", "meetings-1", "comm-1", "dress-1", "ethics-1"], // Unlock all by default
            badges: [],
            currentRole: 'Intern',
            league: 'Bronze',
            playMode: 'single',
            multiType: undefined,

            addXP: (amount) => set((state) => {
                const newXP = state.xp + amount;
                // Simple league logic
                let newLeague = state.league;
                if (newXP > 500) newLeague = 'Diamond';
                else if (newXP > 200) newLeague = 'Gold';

                return { xp: newXP, league: newLeague };
            }),

            loseLife: () => set((state) => ({ lives: Math.max(0, state.lives - 1) })),
            resetLives: () => set({ lives: 5 }),
            incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
            resetStreak: () => set({ streak: 0 }),
            unlockLevel: (levelId) => set((state) => ({
                unlockedLevels: state.unlockedLevels.includes(levelId)
                    ? state.unlockedLevels
                    : [...state.unlockedLevels, levelId]
            })),
            addBadge: (badgeId) => set((state) => ({
                badges: state.badges.includes(badgeId) ? state.badges : [...state.badges, badgeId]
            })),
            setRole: (role) => set({ currentRole: role }),
            setPlayMode: (mode, type = undefined) => set({ playMode: mode, multiType: type }),
            updateLeague: () => {
                const xp = get().xp;
                if (xp > 500) set({ league: 'Diamond' });
                else if (xp > 200) set({ league: 'Gold' });
            }
        }),
        {
            name: 'worketiq-game-storage',
        }
    )
);
