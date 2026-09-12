"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-detect
      data-detect-label={`theme · ${isLight ? "light" : "dark"} · 100%`}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`relative flex items-center justify-center w-9 h-9 rounded-lg border border-line text-muted transition-all hover:text-signal hover:border-signal/50 hover:-translate-y-0.5 hover:shadow-glow-sm ${className}`}
    >
      <Sun
        size={17}
        className={`absolute transition-all duration-300 ${
          isLight ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
      <Moon
        size={17}
        className={`absolute transition-all duration-300 ${
          isLight ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
    </button>
  );
}
