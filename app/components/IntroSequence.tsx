"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

interface IntroSequenceProps {
    onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [step, setStep] = useState(0); // 0: Loading, 1: Card 1, 2: Card 2, 3: Card 3
    const [showModal, setShowModal] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const audioRef = useRef<HTMLAudioElement>(null);

    const cardsData = [
        {
            id: 1,
            imageSrc: "/S__40534059.jpg",
            title: "หวัดดีอ้วนนน 💕",
            description: "เข้ามาละหราาาา...",
            subtext: "(แตะเพื่อไปต่อ)",
            gradient: "from-rose-900/70",
            rotate: -5,
        },
        {
            id: 2,
            imageSrc: "/S__40534066.jpg",
            title: "พร้อมยังงคะะ? ✨",
            description: "มีไรจะบอกกกก...",
            subtext: "(แตะเพื่อไปต่อ)",
            gradient: "from-purple-900/70",
            rotate: 5,
        },
        {
            id: 3,
            imageSrc: "/S__67338243.jpg",
            title: "รักนะคะ 💖",
            description: "คิดถึงกันม้ายย55...",
            subtext: "(แตะเพื่อเริ่ม)",
            gradient: "from-pink-900/70",
            rotate: -3,
        },
    ];

    const handleCardClick = (question: string) => {
        setCurrentQuestion(question);
        setShowModal(true);
    };

    const handleModalSubmit = () => {
        setShowModal(false);
        if (step < 3) {
            setStep((prev) => prev + 1);
        } else {
            onComplete();
        }
    };

    const handleLoadingComplete = () => {
        setStep(1);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-50/90 backdrop-blur-xl p-4 md:p-8 overflow-hidden">
            <audio ref={audioRef} src="/music.mp3" loop />

            {/* Interactive Background */}
            <div className="absolute inset-0 z-0 overflow-hidden select-none">
                <PoppableElement
                    className="absolute top-10 left-10 text-4xl md:text-6xl opacity-20 cursor-pointer"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    ☁️
                </PoppableElement>
                <PoppableElement
                    className="absolute bottom-20 right-10 text-4xl md:text-6xl opacity-20 cursor-pointer"
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -10, 10, 0],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                    🌸
                </PoppableElement>

                <PoppableElement
                    className="absolute top-1/2 left-10 text-2xl md:text-4xl opacity-20 cursor-pointer"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    ✨
                </PoppableElement>
                <PoppableElement
                    className="absolute top-20 right-20 text-3xl md:text-5xl opacity-20 cursor-pointer"
                    animate={{
                        x: [0, 50, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                    🎀
                </PoppableElement>
            </div>

            <AnimatePresence mode="wait">
                {step === 0 && (
                    <IntroLoading onComplete={handleLoadingComplete} />
                )}

                {step > 0 && step <= 3 && (
                    <IntroCard
                        key={`card${step}`}
                        {...cardsData[step - 1]}
                        onNext={() => handleCardClick(cardsData[step - 1].description)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showModal && (
                    <QuestionModal
                        question={currentQuestion}
                        onSubmit={handleModalSubmit}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

interface PoppableElementProps {
    children: React.ReactNode;
    className?: string;
    animate?: any;
    transition?: any;
}

function PoppableElement({ children, className, animate, transition }: PoppableElementProps) {
    const [isPopped, setIsPopped] = useState(false);

    if (isPopped) return null;

    return (
        <motion.div
            className={className}
            animate={animate}
            transition={transition}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 1.5, opacity: 0 }}
            onClick={() => setIsPopped(true)}
        >
            {children}
        </motion.div>
    );
}

function IntroLoading({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [isExploding, setIsExploding] = useState(false);
    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const startHolding = () => {
        if (isExploding) return;
        startTimeRef.current = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - (startTimeRef.current || now);
            // 3 seconds to full
            const newProgress = Math.min((elapsed / 3000) * 100, 100);

            setProgress(newProgress);

            if (newProgress < 100) {
                requestRef.current = requestAnimationFrame(animate);
            } else {
                handleExplosion();
            }
        };

        requestRef.current = requestAnimationFrame(animate);
    };

    const stopHolding = () => {
        if (isExploding) return;
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
        setProgress(0);
    };

    const handleExplosion = () => {
        setIsExploding(true);
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }

        setTimeout(() => {
            onComplete();
        }, 1500);
    };

    // Particles for explosion - Massive amount
    const particles = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        angle: Math.random() * 360,
        distance: Math.random() * 800 + 100, // Explode far out
        delay: Math.random() * 0.5,
        size: Math.random() * 2 + 0.5, // Random sizes
    }));

    return (
        <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.5,
                filter: "blur(10px)",
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="z-10 flex flex-col items-center justify-center w-full h-full px-4 select-none overflow-hidden"
        >
            <div className="relative flex items-center justify-center">
                {!isExploding ? (
                    <motion.div
                        className="cursor-pointer relative z-20"
                        onMouseDown={startHolding}
                        onMouseUp={stopHolding}
                        onMouseLeave={stopHolding}
                        onTouchStart={startHolding}
                        onTouchEnd={stopHolding}
                        animate={{
                            scale: 1 + (progress / 100) * 15, // Grow HUGE (up to 16x)
                            filter: `drop-shadow(0 0 ${progress}px rgba(244, 63, 94, 0.8))`,
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="text-[10rem] md:text-[12rem] transition-transform duration-100 select-none leading-none">
                            💖
                        </div>
                    </motion.div>
                ) : (
                    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
                        {particles.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                                animate={{
                                    x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                                    y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                                    scale: p.size,
                                    opacity: 0,
                                }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: p.delay }}
                                className="absolute text-4xl"
                            >
                                💖
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {!isExploding && (
                <div className="mt-10 text-center z-10 pointer-events-none">
                    <h2 className="text-2xl md:text-3xl font-bold text-rose-600 mb-2 drop-shadow-sm animate-pulse min-h-[2.5rem]">
                        {progress < 30 ? "เอานิ้วอ้วนๆมาเตะดูซิ" :
                            progress < 70 ? "เตะอีกนิด..." :
                                "เตะอีกกกก..."}
                    </h2>
                    <p className="text-rose-400 text-sm font-light opacity-80">
                        (จิ้มค้างไว้ที่หัวใจเลยค่ะ ❤️)
                    </p>
                </div>
            )}
        </motion.div>
    );
}

interface IntroCardProps {
    imageSrc: string;
    title: string;
    description: string;
    subtext: string;
    onNext: () => void;
    gradient: string;
    rotate?: number;
}

function IntroCard({
    imageSrc,
    title,
    description,
    subtext,
    onNext,
    gradient,
    rotate = 0,
}: IntroCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                perspective: 1000
            }}
            initial={{ scale: 0.5, opacity: 0, y: 100, rotate: rotate - 10 }}
            animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.8
                }
            }}
            exit={{
                scale: 1.1,
                opacity: 0,
                y: -100,
                rotate: rotate + 10,
                transition: { duration: 0.5 }
            }}
            className="w-full max-w-sm md:max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl cursor-pointer z-10 border-4 border-white relative group"
            onClick={onNext}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                    className={`absolute inset-0 bg-gradient-to-t ${gradient} via-transparent to-transparent opacity-80`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-black mb-2 md:mb-3 drop-shadow-md"
                    >
                        {title}
                    </motion.h3>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/95 text-base md:text-lg font-medium drop-shadow-sm leading-relaxed"
                    >
                        {description}
                        <br />
                        <span className="text-xs md:text-sm opacity-80 mt-2 block font-light tracking-wider">
                            {subtext}
                        </span>
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
}

function QuestionModal({
    question,
    onSubmit,
    onClose,
}: {
    question: string;
    onSubmit: () => void;
    onClose: () => void;
}) {
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (answer.trim()) {
            onSubmit();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border-4 border-rose-100"
            >
                <h3 className="text-xl font-bold text-rose-600 mb-4 text-center">
                    {question}
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="พิมพ์คำตอบตรงนี้..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none text-gray-700 bg-rose-50/50"
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition-colors"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            disabled={!answer.trim()}
                            className="flex-1 px-4 py-2 rounded-xl bg-rose-500 text-white font-bold shadow-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            ต่อไป 💖
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
