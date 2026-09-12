"use client";

import { motion } from "framer-motion";
import ScanReveal from "./ScanReveal";
import { experience, education } from "@/data/content";

// Merge work experience and education into a single reverse-chronological timeline.
const timelineItems = [
  ...experience.map((e) => ({
    kind: "work",
    title: e.role,
    org: e.org,
    period: e.period,
    points: e.points,
  })),
  ...education.map((ed) => ({
    kind: "education",
    title: ed.degree,
    org: ed.institute,
    period: ed.year,
    points: [ed.score],
  })),
];

export default function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-28">
      <ScanReveal>
        <p className="font-mono text-sm text-signal mb-3">05 — Experience</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-12 max-w-2xl">
          Where I&apos;ve worked & studied.
        </h2>
      </ScanReveal>

      <div className="space-y-10 relative">
        {/* Animated timeline line */}
        <motion.div
          className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-signal via-signal/30 to-transparent"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {timelineItems.map((item, i) => (
          <ScanReveal key={`${item.title}-${item.period}`} delay={i * 0.12}>
            <div className="pl-8 relative group hover:translate-x-1 transition-transform duration-300">
              {/* Pulsing dot */}
              <span className="timeline-dot absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-signal border-2 border-base" />

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-block font-mono text-xs text-signal bg-signal/10 border border-signal/25 rounded-md px-2.5 py-1">
                  {item.period}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wide text-muted/70">
                  {item.kind === "work" ? "Experience" : "Education"}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl mb-1.5 group-hover:text-signal transition-colors">
                {item.title}
              </h3>
              <p className="text-muted text-sm mb-4">{item.org}</p>
              <ul className="space-y-2.5">
                {item.points.map((p, pi) => (
                  <motion.li
                    key={p}
                    className="text-muted text-sm leading-relaxed flex gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + pi * 0.1, duration: 0.5 }}
                  >
                    <span className="text-signal font-mono mt-0.5">›</span>
                    {p}
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScanReveal>
        ))}
      </div>
    </section>
  );
}
