"use client";

import { motion } from "framer-motion";
import ScanReveal from "./ScanReveal";
import { certifications } from "@/data/content";

export default function Certifications() {
  return (
    <section id="certifications" className="max-w-6xl mx-auto px-6 py-28">
      <ScanReveal>
        <p className="font-mono text-sm text-signal mb-3">04 — Certifications & Activities</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-10 max-w-2xl">
          Milestones beyond the projects.
        </h2>
      </ScanReveal>

      <ScanReveal delay={0.2}>
        <ul className="space-y-3 border-t border-line pt-10">
          {certifications.map((certification, index) => (
            <motion.li
              key={certification}
              className="text-muted text-sm flex gap-3 shimmer-hover rounded-sm px-3 py-2 -mx-3"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <span className="text-signal font-mono">›</span>
              {certification}
            </motion.li>
          ))}
        </ul>
      </ScanReveal>
    </section>
  );
}
