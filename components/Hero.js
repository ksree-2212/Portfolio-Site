"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/content";
import HeroBackground from "./HeroBackground";
import HeroCodeEditor from "./HeroCodeEditor";
import TechStackCards from "./TechStackCards";
import TrainingCard from "./TrainingCard";

const firstName = profile.name.split(" ")[0];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden"
    >
      <HeroBackground />

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
        {/* LEFT — text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-sm text-signal mb-6"
          >
            {"> "}Welcome to my portfolio
            <span
              className="inline-block w-[7px] h-[14px] bg-signal ml-1 align-middle"
              style={{ animation: "typewriter-cursor 1s step-end infinite" }}
            />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display text-2xl sm:text-3xl text-text/90 mb-1"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-[4.25rem] leading-[1.02] tracking-tight mb-6"
          >
            <span className="hero-name-gradient">{firstName}</span>
            <span className="text-signal">.</span>
            <span
              className="inline-block w-[3px] h-[0.85em] bg-signal ml-1 align-middle"
              style={{ animation: "typewriter-cursor 1s step-end infinite" }}
            />

          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display font-medium text-xl sm:text-2xl text-signal mb-6"
          >
            {profile.heroTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted text-lg leading-relaxed max-w-md mb-10"
          >
            I&apos;m passionate about building intelligent systems that solve real-world
            problems — from computer vision to deep learning and data analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a
              href="#projects"
              data-detect
              data-detect-label="cta_primary · 96%"
              className="group shimmer-hover inline-flex items-center gap-2 px-6 py-3 bg-signal text-base font-semibold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 active:scale-[0.98]"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              data-detect
              data-detect-label="cta_secondary · 94%"
              className="inline-flex items-center gap-2 px-6 py-3 border border-line text-text font-medium rounded-lg bg-panel/40 backdrop-blur-sm transition-all hover:border-signal/60 hover:bg-signal/5 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-4"
          >
            {[
              { href: profile.github, icon: Github, label: "GitHub" },
              { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                data-detect
                data-detect-label={`social · ${label.toLowerCase()} · 92%`}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-line text-muted transition-all hover:text-signal hover:border-signal/50 hover:-translate-y-0.5 hover:shadow-glow-sm"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — code editor + tech cards + training card */}
        <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] gap-4 items-start">
          <div className="w-full min-w-0">
            <HeroCodeEditor />
          </div>
          <div className="flex flex-col gap-4 w-full md:w-[220px]">
            <TechStackCards />
            <TrainingCard />
          </div>
        </div>
      </div>
    </section>
  );
}
