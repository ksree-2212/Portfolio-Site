"use client";

import { motion } from "framer-motion";
import { Terminal, GitBranch, Aperture, BarChart3 } from "lucide-react";
import { heroStack } from "@/data/content";

const ICONS = {
  python: { Icon: Terminal, color: "#4C8DFF", bg: "rgba(76,141,255,0.12)" },
  tensorflow: { Icon: GitBranch, color: "#F2A65A", bg: "rgba(242,166,90,0.12)" },
  opencv: { Icon: Aperture, color: "#38E0FF", bg: "rgba(56,224,255,0.12)" },
  pandas: { Icon: BarChart3, color: "#4C8DFF", bg: "rgba(76,141,255,0.12)" },
};

export default function TechStackCards() {
  return (
    <div className="flex flex-col gap-3">
      {heroStack.map((tech, i) => {
        const { Icon, color, bg } = ICONS[tech.icon];
        return (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="tech-card flex items-center gap-3 rounded-lg border border-line/70 bg-panel/60 backdrop-blur-xl px-4 py-3 transition-colors"
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-md shrink-0"
              style={{ backgroundColor: bg }}
            >
              <Icon size={16} style={{ color }} />
            </span>
            <span className="font-medium text-sm text-text/90">{tech.name}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
