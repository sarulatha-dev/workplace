"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const PARTICLE_TYPES = ["gate", "plane", "code", "star"];

interface ParticleData {
    id: number;
    x: number;
    y: number;
    type: string;
    size: number;
    speed: number;
}

export const BackgroundParticles = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();
    const [particles, setParticles] = useState<ParticleData[]>([]);

    useEffect(() => {
        // Generate initial particles
        const newParticles = [...Array(15)].map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            type: PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)],
            size: Math.random() * 20 + 10,
            speed: Math.random() * 0.5 + 0.2,
        }));
        setParticles(newParticles);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
            {particles.map((p) => (
                <Particle
                    key={p.id}
                    p={p}
                    mousePos={mousePos}
                />
            ))}
        </div>
    );
};

interface ParticleProps {
    p: ParticleData;
    mousePos: { x: number, y: number };
}

const Particle = ({ p, mousePos }: ParticleProps) => {
    const [pos, setPos] = useState({ x: p.x, y: p.y });
    const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
            const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPos(prev => ({
                x: (prev.x + p.speed) % 110,
                y: (prev.y + p.speed * 0.5) % 110
            }));
        }, 50);
        return () => clearInterval(interval);
    }, [p.speed]);

    // Simple magnetic repulsion
    const dx = (mousePos.x / (windowSize.width || 1)) * 100 - pos.x;
    const dy = (mousePos.y / (windowSize.height || 1)) * 100 - pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const repulsion = dist < 15 ? (15 - dist) / 15 : 0;

    return (
        <motion.div
            style={{
                left: `${pos.x - repulsion * dx}%`,
                top: `${pos.y - repulsion * dy}%`,
                width: p.size,
                height: p.size,
            }}
            animate={{
                rotate: [0, 360],
                opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
                rotate: { duration: 10 + p.id, repeat: Infinity, ease: "linear" },
                opacity: { duration: 3 + p.id % 2, repeat: Infinity }
            }}
            className="absolute"
        >
            {p.type === "gate" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-duo-blue">
                    <path d="M7 7h10v10H7zM7 12h10M12 7v10" />
                </svg>
            )}
            {p.type === "plane" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-duo-green">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                </svg>
            )}
            {p.type === "code" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-duo-orange">
                    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
                </svg>
            )}
            {p.type === "star" && (
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-duo-yellow">
                    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            )}
        </motion.div>
    );
};
