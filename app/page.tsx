"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE_ISO = "2025-12-27T09:00:00";

function getRemaining(msUntil) {
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

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  const msUntil = targetDate - now;
  const { days, hours, minutes, seconds } = getRemaining(msUntil);

  useEffect(() => {
    if (msUntil <= 0 && !finished) setFinished(true);
  }, [msUntil, finished]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-indigo-200 text-slate-700 p-6 relative overflow-hidden">
      {/* soft floating blobs */}
      <div className="absolute top-10 left-10 w-44 h-44 bg-pink-300/40 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-20 w-52 h-52 bg-indigo-300/40 blur-3xl rounded-full animate-pulse delay-2000" />

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center text-rose-600 drop-shadow">
            Cute Countdown Timer 💖
          </h1>
          <p className="text-center text-rose-400 mt-2 font-medium">
            Target: {new Date(TARGET_DATE_ISO).toLocaleString()}
          </p>
        </motion.header>

        <section className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40">
          <AnimatePresence>
            {!finished ? (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <TimeCard label="Days" value={String(days)} color="pink" />
                <TimeCard label="Hours" value={pad(hours)} color="purple" />
                <TimeCard label="Minutes" value={pad(minutes)} color="sky" />
                <TimeCard label="Seconds" value={pad(seconds)} color="rose" />
              </motion.div>
            ) : (
              <motion.div
                key="celebrate"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-6">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="p-6 rounded-2xl bg-gradient-to-r from-pink-300 to-yellow-200 text-slate-800 shadow-xl">
                  <h2 className="text-4xl md:text-5xl font-bold text-center">
                    Time's up! 🎀
                  </h2>
                  <p className="text-center mt-2">Your event has started! ✨</p>
                </motion.div>

                <FireworksCute />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.location.reload()}
                  className="mt-2 px-6 py-2 rounded-full bg-white/70 backdrop-blur border border-rose-200 text-rose-500 font-semibold shadow-lg hover:bg-white">
                  Restart
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}

function TimeCard({ label, value, color }) {
  const pastel = {
    pink: "from-pink-200 to-pink-300",
    purple: "from-violet-200 to-violet-300",
    sky: "from-sky-200 to-sky-300",
    rose: "from-rose-200 to-rose-300",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-5 rounded-2xl border border-white/40 shadow-inner bg-gradient-to-br ${pastel[color]}`}>
      <div className="text-4xl md:text-5xl font-extrabold tabular-nums text-slate-700 drop-shadow">
        {value}
      </div>
      <div className="mt-2 text-sm uppercase tracking-wide text-slate-600 font-semibold">
        {label}
      </div>
    </div>
  );
}

function FireworksCute() {
  return (
    <div className="w-full flex justify-center">
      <svg viewBox="0 0 200 80" className="w-80 h-40">
        <g>
          <motion.circle
            cx="30"
            cy="40"
            r="3"
            animate={{ r: [3, 12, 3], opacity: [1, 0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            fill="#f9a8d4"
          />
          <motion.circle
            cx="60"
            cy="30"
            r="3"
            animate={{ r: [3, 15, 3], opacity: [1, 0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            fill="#a5b4fc"
          />
          <motion.circle
            cx="100"
            cy="25"
            r="3"
            animate={{ r: [3, 18, 3], opacity: [1, 0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            fill="#fbcfe8"
          />
        </g>
      </svg>
    </div>
    //asd
  );
}
