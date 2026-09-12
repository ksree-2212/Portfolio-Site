/** @type {import('tailwindcss').Config} */

// Reads a CSS custom property (set per-theme in globals.css) and turns it
// into a Tailwind color that still supports opacity modifiers like bg-base/70.
function withOpacity(variable) {
  return ({ opacityValue }) =>
    opacityValue === undefined
      ? `rgb(var(${variable}))`
      : `rgb(var(${variable}) / ${opacityValue})`;
}

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: withOpacity("--color-base"),
        panel: withOpacity("--color-panel"),
        panel2: withOpacity("--color-panel2"),
        line: withOpacity("--color-line"),
        text: withOpacity("--color-text"),
        muted: withOpacity("--color-muted"),
        signal: "#4C8DFF",
        cyan: "#38E0FF",
        amber: "#F2A65A",
      },
      boxShadow: {
        glow: "0 0 24px rgba(76,141,255,0.25)",
        "glow-sm": "0 0 12px rgba(76,141,255,0.2)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
