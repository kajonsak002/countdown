"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE_ISO = "2025-12-27T09:00:00";

function getRemaining({ msUntil }: { msUntil: number }) {
  if (msUntil <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalSec = Math.floor(msUntil / 1000);
  const days = Math.floor(totalSec / (3600 * 24));
  const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { days, hours, minutes, seconds };
}

export default function CountdownPage() {
  const targetDate = new Date(TARGET_DATE_ISO).getTime();
  const [now, setNow] = useState(() => Date.now());
  const [finished, setFinished] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  const msUntil = targetDate - now;
  const { days, hours, minutes, seconds } = getRemaining({ msUntil });

  useEffect(() => {
    if (msUntil <= 0 && !finished) setFinished(true);
  }, [msUntil, finished]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-rose-100 via-pink-50 to-purple-100 text-slate-700 p-4 md:p-6 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Large animated blobs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-pink-300/40 to-rose-300/20 blur-3xl rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-linear-to-tl from-purple-300/40 to-indigo-300/20 blur-3xl rounded-full"
        />
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-72 h-72 bg-linear-to-br from-indigo-300/30 to-pink-300/20 blur-3xl rounded-full"
        />
      </div>

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />

      <div className="w-full max-w-5xl mx-auto relative z-20">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}>
            <div className="text-6xl md:text-8xl mb-6 drop-shadow-lg">💕</div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-rose-600 via-pink-500 to-purple-600 drop-shadow-2xl mb-3">
            Waiting for You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-700 font-bold mb-4">
            นับเวลาถอยหลังเพื่อเจอคนสวยยย
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-sm md:text-base">
            {/* <div className="px-6 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-lg">
              <p className="text-rose-600 font-bold">
                📅{" "}
                {new Date(TARGET_DATE_ISO).toLocaleDateString("th-TH", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div> */}
            {/* <div className="px-6 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-lg">
              <p className="text-purple-600 font-bold">
                ⏰ เวลา{" "}
                {new Date(TARGET_DATE_ISO).toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div> */}
          </motion.div>
        </motion.header>

        <section className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/40 backdrop-blur-2xl rounded-3xl p-8 md:p-14 shadow-2xl border border-white/70 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-300/20 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-300/20 rounded-full -ml-24 -mb-24 blur-3xl" />
            <AnimatePresence>
              {!finished ? (
                <motion.div
                  key="countdown"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center relative z-10">
                  <TimeCard label="วัน" value={String(days)} color="pink" />
                  <TimeCard label="ชั่วโมง" value={pad(hours)} color="purple" />
                  <TimeCard label="นาที" value={pad(minutes)} color="sky" />
                  <TimeCard label="วินาที" value={pad(seconds)} color="rose" />
                </motion.div>
              ) : (
                <motion.div
                  key="celebrate"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="flex flex-col items-center gap-8 relative z-10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="p-8 md:p-12 rounded-3xl bg-linear-to-br from-pink-300 via-rose-200 to-purple-300 text-slate-800 shadow-2xl border border-white/40 text-center">
                    <div className="text-6xl md:text-8xl mb-4">💕</div>
                    <h2 className="text-3xl md:text-5xl font-bold">
                      ถึงเวลาแล้ว!
                    </h2>
                    <p className="text-lg md:text-xl mt-4 font-semibold">
                      มันมาถึงแล้ว ✨
                    </p>
                    <p className="text-base mt-2 opacity-90">
                      เวลาสำหรับการพบปะนี้ได้มาถึงแล้ว 🎀
                    </p>
                  </motion.div>

                  <FireworksCute />

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                    className="mt-6 px-8 py-3 rounded-full bg-white/80 backdrop-blur border-2 border-rose-300 text-rose-600 font-bold shadow-lg hover:bg-white hover:shadow-xl transition-all">
                    เริ่มใหม่
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

function TimeCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "pink" | "purple" | "sky" | "rose";
}) {
  const pastel = {
    pink: "from-pink-200 to-pink-300",
    purple: "from-violet-200 to-violet-300",
    sky: "from-sky-200 to-sky-300",
    rose: "from-rose-200 to-rose-300",
  };

  const shadowColors = {
    pink: "shadow-pink-300/60",
    purple: "shadow-violet-300/60",
    sky: "shadow-sky-300/60",
    rose: "shadow-rose-300/60",
  };

  const borderGradients = {
    pink: "border-pink-400",
    purple: "border-violet-400",
    sky: "border-sky-400",
    rose: "border-rose-400",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -8, rotateZ: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <div
        className={`flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl border-3 ${borderGradients[color]} shadow-2xl ${shadowColors[color]} bg-linear-to-br ${pastel[color]} hover:border-white transition-all cursor-default backdrop-blur-sm`}>
        <motion.div
          key={value}
          initial={{ scale: 0.5, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-5xl md:text-7xl font-black tabular-nums text-slate-800 drop-shadow-2xl">
          {value}
        </motion.div>
        <div className="mt-4 text-xs md:text-sm uppercase tracking-widest text-slate-700 font-bold drop-shadow">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

function FireworksCute() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="w-full flex justify-center">
      <svg viewBox="0 0 200 100" className="w-96 h-48 drop-shadow-lg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#glow)">
          {/* Left firework - Pink */}
          <motion.circle
            cx="50"
            cy="50"
            r="4"
            animate={{ r: [4, 20, 4], opacity: [1, 0.8, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            fill="#f9a8d4"
          />
          <motion.circle
            cx="40"
            cy="30"
            r="3"
            animate={{ r: [3, 15, 3], opacity: [1, 0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            fill="#f9a8d4"
          />
          <motion.circle
            cx="60"
            cy="30"
            r="3"
            animate={{ r: [3, 15, 3], opacity: [1, 0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            fill="#f9a8d4"
          />

          {/* Center firework - Purple */}
          <motion.circle
            cx="100"
            cy="40"
            r="4"
            animate={{ r: [4, 25, 4], opacity: [1, 0.8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, delay: 0.1 }}
            fill="#a5b4fc"
          />
          <motion.circle
            cx="85"
            cy="25"
            r="3"
            animate={{ r: [3, 18, 3], opacity: [1, 0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, delay: 0.1 }}
            fill="#a5b4fc"
          />
          <motion.circle
            cx="115"
            cy="25"
            r="3"
            animate={{ r: [3, 18, 3], opacity: [1, 0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, delay: 0.1 }}
            fill="#a5b4fc"
          />

          {/* Right firework - Rose */}
          <motion.circle
            cx="150"
            cy="50"
            r="4"
            animate={{ r: [4, 22, 4], opacity: [1, 0.8, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, delay: 0.05 }}
            fill="#fbcfe8"
          />
          <motion.circle
            cx="140"
            cy="30"
            r="3"
            animate={{ r: [3, 16, 3], opacity: [1, 0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, delay: 0.05 }}
            fill="#fbcfe8"
          />
          <motion.circle
            cx="160"
            cy="30"
            r="3"
            animate={{ r: [3, 16, 3], opacity: [1, 0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, delay: 0.05 }}
            fill="#fbcfe8"
          />
        </g>
      </svg>
    </motion.div>
  );
}

function WelcomeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const messages = [
    "สวัสดีคร้าบบ 💕",
    "ฉันมีสิ่งพิเศษให้คุณ ✨",
    "นี่คือเวลานับเวลาถอยหลังที่สมควร",
    "เพราะเราจะพบกันแล้ว 🎀",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-lg z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-3xl rounded-4xl p-8 md:p-16 max-w-lg w-full shadow-2xl border-2 border-white/80 overflow-hidden relative">
              {/* Animated background blobs */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-pink-300/40 to-rose-300/20 rounded-full -mr-20 -mt-20 blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [360, 180, 0],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-0 left-0 w-36 h-36 bg-linear-to-tr from-purple-300/40 to-indigo-300/20 rounded-full -ml-20 -mb-20 blur-3xl"
              />

              {/* Content */}
              <motion.div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150 }}>
                  <div className="text-8xl mb-8 drop-shadow-lg">💕</div>
                </motion.div>

                {/* Messages with staggered animation */}
                <div className="space-y-5 mb-10">
                  {messages.map((message, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.12 }}
                      className={`${
                        index === 0
                          ? "text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-rose-600 to-pink-600"
                          : index === 3
                          ? "text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600"
                          : "text-lg text-slate-700 font-semibold"
                      }`}>
                      {message}
                    </motion.p>
                  ))}
                </div>

                {/* Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 150 }}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 25px 50px rgba(236, 72, 153, 0.4)",
                  }}
                  whileTap={{ scale: 0.92 }}
                  onClick={onClose}
                  className="w-full py-4 px-8 rounded-full bg-linear-to-r from-rose-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all drop-shadow-lg">
                  เริ่มต้นนับเวลา 🎀
                </motion.button>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="mt-6 text-base font-semibold text-transparent bg-clip-text bg-linear-to-r from-rose-500 to-purple-500">
                  ✨ เวลาที่ส่วนใจรอคอย ✨
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
