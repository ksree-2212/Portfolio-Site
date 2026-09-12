"use client";

import { motion } from "framer-motion";

// Small hero-only accents layered on top of the global ParticleGrid:
// a slow-drifting glow, gently pulsing "code fragment" bars, and a
// vertical build/learn/improve label that cycles through its words —
// echoing the technical-network feel with a bit of life to it.
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Ambient glow, drifting slowly */}
      <motion.div
        className="absolute top-1/4 left-1/2 w-[700px] h-[420px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(76,141,255,0.07) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        initial={{ x: "-50%", y: 0 }}
        animate={{ x: ["-52%", "-48%", "-52%"], y: [0, -18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Faint horizontal code fragments, left of the editor — widths breathe */}
      <div className="hidden lg:flex flex-col gap-3 absolute top-24 right-[26%]">
        {[70, 45, 58, 30].map((w, i) => (
          <motion.span
            key={i}
            className="h-[3px] rounded-full bg-line origin-left"
            style={{ width: `${w}px` }}
            initial={{ opacity: 0.3, scaleX: 1 }}
            animate={{ opacity: [0.2, 0.45, 0.2], scaleX: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Vertical technical label, far right — cycles emphasis word by word */}
      <div className="hidden xl:flex flex-col items-end gap-2 absolute top-16 right-6 font-mono text-[11px] tracking-[0.2em] text-muted/50">
        {["BUILD", "LEARN", "IMPROVE"].map((word, i) => (
          <motion.span
            key={word}
            animate={{ opacity: [0.35, 1, 0.35], color: ["#8FA0B8", "#4C8DFF", "#8FA0B8"] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
