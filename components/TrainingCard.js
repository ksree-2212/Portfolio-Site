"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { modelTraining } from "@/data/content";

const SPARK_POINTS = "0,26 10,22 20,24 30,14 40,18 50,8 60,12 70,6 80,10 90,3 100,6";

export default function TrainingCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 1200;
    const target = modelTraining.percent;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const circumference = 2 * Math.PI * 20;
  const offset = circumference * (1 - count / 100);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 rounded-lg border border-line/70 bg-panel/60 backdrop-blur-xl px-4 py-3.5"
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text/80 mb-2">{modelTraining.label}</p>
        <svg viewBox="0 0 100 30" className="w-full h-6" preserveAspectRatio="none">
          <polyline
            points={SPARK_POINTS}
            fill="none"
            stroke="#4C8DFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.9 }}
          />
        </svg>
      </div>

      <div className="relative w-12 h-12 shrink-0">
        <svg viewBox="0 0 48 48" className="w-12 h-12 -rotate-90">
          <circle cx="24" cy="24" r="20" fill="none" stroke="#1E2A3F" strokeWidth="4" />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#4C8DFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-semibold text-text">
          {count}%
        </span>
      </div>
    </motion.div>
  );
}
