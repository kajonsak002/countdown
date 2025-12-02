"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.5;
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                        })
                        .catch((e) => {
                            console.log("Auto-play prevented:", e);
                            setIsPlaying(false);
                        });
                }
            }
        };

        // Try to play immediately
        playAudio();

        // Add listener for first interaction
        const handleInteraction = () => {
            playAudio();
            document.removeEventListener("click", handleInteraction);
        };

        document.addEventListener("click", handleInteraction);
        return () => {
            document.removeEventListener("click", handleInteraction);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <>
            <audio ref={audioRef} src="/music.mp3" loop hidden />
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed bottom-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-pink-200 text-xl hover:scale-110 transition-transform"
                onClick={togglePlay}
                title={isPlaying ? "Pause Music" : "Play Music"}
            >
                {isPlaying ? "🎵" : "🔇"}
            </motion.button>
        </>
    );
}
