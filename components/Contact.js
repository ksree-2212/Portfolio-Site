"use client";

import { motion } from "framer-motion";
import ScanReveal from "./ScanReveal";
import { profile } from "@/data/content";
import { Mail, Github, Linkedin, Phone } from "lucide-react";

const socialIconVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 15 } },
};

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-28 relative">
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(76,141,255,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <ScanReveal>
        <p className="font-mono text-sm text-signal mb-3">05 — Contact</p>
        <h2 className="font-display font-bold text-3xl sm:text-5xl mb-8 max-w-xl">
          Let&apos;s build something <span className="text-signal">intelligent.</span>
        </h2>
        <p className="text-muted text-lg max-w-xl mb-10">
          Open to internships, collaborations, and interesting problems in computer vision or applied ML.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            data-detect
            data-detect-label="contact · 97%"
            className="shimmer-hover gradient-border-btn flex items-center gap-2.5 px-6 py-3.5 bg-signal text-base font-medium rounded-md hover:shadow-lg hover:shadow-signal/20 transition-all"
          >
            <Mail size={18} /> {profile.email}
          </a>
          <a
            href={`tel:${profile.phone}`}
            data-detect
            data-detect-label="contact · 95%"
            className="shimmer-hover glass-card flex items-center gap-2.5 px-6 py-3.5 rounded-md font-medium transition-all"
          >
            <Phone size={18} /> {profile.phone}
          </a>
        </div>

        <div className="flex gap-6 mt-10">
          {[
            { href: profile.github, icon: Github, label: "GitHub" },
            { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
          ].map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-detect
              data-detect-label={`social · ${label.toLowerCase()} · 92%`}
              className="flex items-center gap-2.5 text-muted hover:text-signal transition-colors px-3 py-2 rounded-md hover:bg-signal/5"
              variants={socialIconVariants}
              initial="rest"
              whileHover="hover"
            >
              <Icon size={20} /> {label}
            </motion.a>
          ))}
        </div>
      </ScanReveal>

      <footer className="mt-24 pt-8 border-t border-line/50 relative">
        {/* Animated divider glow */}
        <motion.div
          className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-signal/40 to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="flex flex-col sm:flex-row justify-between gap-2 text-muted text-sm font-mono">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Hyderabad, India</span>
        </div>
      </footer>
    </section>
  );
}
