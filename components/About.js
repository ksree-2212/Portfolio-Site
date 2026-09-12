"use client";

import { ArrowRight } from "lucide-react";
import ScanReveal from "./ScanReveal";
import { profile, interests } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-28 relative">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(76,141,255,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-14 items-start">
        {/* LEFT */}
        <ScanReveal>
          <p className="font-mono text-sm text-signal mb-3">01 — About</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight mb-6 max-w-xl">
            Building systems that <span className="text-signal">see</span>,{" "}
            <span className="text-signal">learn</span>, and stay{" "}
            <span className="text-signal">accountable.</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed max-w-xl mb-8">{profile.bio}</p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="shimmer-hover inline-flex items-center gap-2 px-6 py-3 bg-signal text-base font-semibold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-line text-text font-medium rounded-lg bg-panel/40 backdrop-blur-sm transition-all hover:border-signal/60 hover:bg-signal/5 hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>
        </ScanReveal>

        {/* RIGHT — Interests panel */}
        <ScanReveal delay={0.15}>
          <div className="rounded-xl border border-line/70 bg-panel/50 backdrop-blur-xl p-6">
            <p className="font-mono text-xs tracking-[0.15em] text-muted mb-4">INTERESTS</p>
            <div className="flex flex-col gap-1">
              {interests.map((item) => (
                <a key={item} href="#skills" className="interest-row group">
                  <span className="text-text/90 text-sm">{item}</span>
                  <ArrowRight size={15} className="interest-arrow text-signal" />
                </a>
              ))}
            </div>
          </div>
        </ScanReveal>
      </div>
    </section>
  );
}
