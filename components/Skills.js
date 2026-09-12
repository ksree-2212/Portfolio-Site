"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScanReveal from "./ScanReveal";
import { skills } from "@/data/content";

const categories = Object.keys(skills);

const pillVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {
  const [active, setActive] = useState(categories[0]);

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-28">
      <ScanReveal>
        <p className="font-mono text-sm text-signal mb-3">02 — Skills</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-10 max-w-2xl">
          Tools I reach for.
        </h2>
      </ScanReveal>

      <ScanReveal delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`skill-tab ${active === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-line/60 bg-panel/40 backdrop-blur-xl p-8 min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap gap-2.5"
            >
              {skills[active].map((item, i) => (
                <motion.span
                  key={item}
                  custom={i}
                  variants={pillVariants}
                  initial="hidden"
                  animate="visible"
                  className="skill-pill px-4 py-2 border border-line rounded-md text-sm text-text/90 cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </ScanReveal>

    </section>
  );
}
