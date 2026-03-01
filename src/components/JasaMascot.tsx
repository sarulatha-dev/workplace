"use client";

import { motion, AnimatePresence } from "framer-motion";

export type MascotPose = "waving" | "pointing" | "cheering" | "oops" | "idle" | "thinking";

interface JasaRobotMascotProps {
    pose?: MascotPose;
    className?: string;
    tip?: string;
    showScore?: number;
}

export const JasaMascot = ({ pose = "idle", className = "", tip, showScore }: JasaRobotMascotProps) => {
    // Duo-style bouncy variant
    const bouncyTransition = {
        type: "spring" as const,
        stiffness: 300,
        damping: 15,
        repeat: pose === "idle" ? Infinity : 0,
        repeatType: "mirror" as const,
        duration: 1.5
    };

    const headVariants = {
        idle: { y: -8, transition: bouncyTransition },
        waving: { y: -10, rotate: 5 },
        pointing: { y: 0, rotate: -5, x: -5 },
        cheering: { y: -25, rotate: 0, scale: 1.15, transition: { type: "spring" as const, stiffness: 500 } },
        oops: { rotate: 15, y: 10 },
        thinking: { rotate: -15, y: 2, x: 5 },
    };

    const armRightVariants = {
        idle: { rotate: 10, transition: bouncyTransition },
        waving: { rotate: [-20, 40], transition: { repeat: Infinity, repeatType: "mirror" as const, duration: 0.5 } },
        pointing: { rotate: -60, x: -10, y: -20 },
        cheering: { rotate: -150, x: -15, y: -15, transition: { type: "spring" as const } },
        oops: { rotate: 30, y: 8 },
        thinking: { rotate: 30, y: 8 },
    };

    const armLeftVariants = {
        idle: { rotate: -10, transition: bouncyTransition },
        pointing: { rotate: 10 },
        cheering: { rotate: 150, x: 15, y: -15, transition: { type: "spring" as const } },
        oops: { rotate: -30, y: 8 },
        thinking: { rotate: -60, x: 25, y: -15 },
    };

    const isOops = pose === "oops";
    const faceColor = pose === "oops" ? "#FF4B4B" : pose === "cheering" ? "#58CC02" : "#1CB0F6";
    // Pose-driven theme
    const faceShellColor = isOops ? "#1C1C2E" : "#FFFFFF";       // dark navy/black vs white
    const faceOutline = isOops ? "#000000" : "none";               // black outline on wrong
    const screenBg = isOops ? "#2D2D44" : "#EFF6FF";               // dark screen vs light
    const earColor = isOops ? "#2A2A3D" : "#FFFFFF";
    const snoutColor = isOops ? "#3A3A52" : "#E2E8F0";
    const bodyMain = isOops ? "#2A2A3D" : "#E2E8F0";
    const bodyInner = isOops ? "#1C1C2E" : "#F8FAFC";
    const tieKnot = isOops ? "#FF4B4B" : "#FF4B4B";

    return (
        <div className={`relative flex flex-col items-center justify-center ${className}`}>
            {/* Speech Bubble (Duo Style) */}
            <AnimatePresence>
                {tip && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        className="absolute -top-36 bg-white border-2 border-duo-gray/20 rounded-3xl p-5 shadow-lg z-20 max-w-[220px]"
                    >
                        <p className="text-base font-black text-duo-dark italic leading-tight">"{tip}"</p>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-2 border-duo-gray/20 rotate-45 border-t-0 border-l-0" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pop-up Score (Duo Style) */}
            <AnimatePresence>
                {showScore !== undefined && (
                    <motion.div
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1.5, y: -100, opacity: 0 }}
                        className="absolute text-duo-green font-black text-4xl z-40 pointer-events-none"
                    >
                        +{showScore} XP
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={pose}
                className="w-full h-full relative flex items-center justify-center rounded-3xl overflow-visible p-4 cursor-pointer"
            >
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                    {/* Shadows */}
                    <ellipse cx="100" cy="185" rx="40" ry="10" fill="rgba(0,0,0,0.1)" />

                    {/* Main Humanoid Body (Bubbly) */}
                    <rect x="65" y="105" width="70" height="75" rx="30" fill={bodyMain} stroke={isOops ? "#000000" : "none"} strokeWidth={isOops ? "3" : "0"} />
                    <rect x="70" y="110" width="60" height="65" rx="25" fill={bodyInner} />

                    {/* Office Tie (Vibrant) */}
                    <path d="M70 105 L100 130 L130 105 Z" fill="white" />
                    <path d="M96 120 L104 120 L102 160 L98 160 Z" fill="#FF4B4B" />
                    <rect x="94" y="120" width="12" height="12" fill="#FF4B4B" rx="3" />

                    {/* ID Card */}
                    <rect x="110" y="135" width="18" height="24" fill="white" rx="4" stroke="#1CB0F6" strokeWidth="2" />
                    <circle cx="119" cy="142" r="4" fill="#1CB0F6" />

                    {/* Arms (Bubbly) */}
                    <motion.g variants={armLeftVariants} style={{ originX: "70px", originY: "115px" }}>
                        <rect x="30" y="110" width="40" height="20" rx="10" fill={bodyMain} stroke={isOops ? "#000000" : "none"} strokeWidth={isOops ? "2" : "0"} />
                        <circle cx="35" cy="120" r="12" fill={faceColor} />
                    </motion.g>

                    <motion.g variants={armRightVariants} style={{ originX: "130px", originY: "115px" }}>
                        <rect x="130" y="110" width="40" height="20" rx="10" fill={bodyMain} stroke={isOops ? "#000000" : "none"} strokeWidth={isOops ? "2" : "0"} />
                        <circle cx="165" cy="120" r="12" fill={faceColor} />
                    </motion.g>

                    {/* Head (Bubbly Robot Dog) */}
                    <motion.g variants={headVariants} style={{ originX: "100px", originY: "100px" }}>
                        {/* Ears */}
                        <rect x="40" y="30" width="30" height="40" rx="15" fill={earColor} stroke={faceOutline} strokeWidth={isOops ? "3" : "0"} transform="rotate(-20 55 50)" />
                        <rect x="130" y="30" width="30" height="40" rx="15" fill={earColor} stroke={faceOutline} strokeWidth={isOops ? "3" : "0"} transform="rotate(20 145 50)" />

                        {/* Face Shell */}
                        <rect x="45" y="40" width="110" height="90" rx="40" fill={faceShellColor} stroke={faceOutline} strokeWidth={isOops ? "4" : "0"} />

                        {/* LED Display Screen */}
                        <rect x="55" y="50" width="90" height="60" rx="25" fill={screenBg} stroke={faceColor} strokeWidth="3" />

                        <AnimatePresence mode="wait">
                            {pose === "oops" ? (
                                <motion.path key="oops" d="M80 85 Q100 70 120 85" fill="none" stroke="#FF4B4B" strokeWidth="6" strokeLinecap="round" />
                            ) : pose === "cheering" ? (
                                <motion.g key="cheer">
                                    <path d="M75 75 Q85 65 95 75" fill="none" stroke="#58CC02" strokeWidth="6" strokeLinecap="round" />
                                    <path d="M105 75 Q115 65 125 75" fill="none" stroke="#58CC02" strokeWidth="6" strokeLinecap="round" />
                                    <path d="M80 95 Q100 115 120 95" fill="none" stroke="#58CC02" strokeWidth="4" strokeLinecap="round" />
                                </motion.g>
                            ) : (
                                <motion.g key="normal">
                                    <circle cx="85" cy="80" r="6" fill="#1CB0F6">
                                        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="115" cy="80" r="6" fill="#1CB0F6">
                                        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                </motion.g>
                            )}
                        </AnimatePresence>

                        {/* Snout */}
                        <rect x="85" y="90" width="30" height="20" rx="10" fill={snoutColor} stroke={isOops ? "#000000" : "none"} strokeWidth={isOops ? "2" : "0"} />
                        <circle cx="100" cy="98" r="4" fill={faceColor} />
                    </motion.g>
                </svg>
            </motion.div>

            {/* Playful Label */}
            <div className="mt-6 bg-duo-blue-dark text-white text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg duo-bounce">
                JASA MENTOR 2.0
            </div>
        </div>
    );
};
