"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Illustrative snippet — purely visual, never executed.
const CODE_LINES = [
  [{ t: "kw", v: "import" }, { t: "", v: " tensorflow " }, { t: "kw", v: "as" }, { t: "", v: " tf" }],
  [{ t: "kw", v: "import" }, { t: "", v: " cv2" }],
  [{ t: "kw", v: "import" }, { t: "", v: " numpy " }, { t: "kw", v: "as" }, { t: "", v: " np" }],
  [],
  [{ t: "cm", v: "# Build intelligent systems" }],
  [{ t: "", v: "model = tf.keras.models." }, { t: "fn", v: "load_model" }, { t: "", v: "(" }],
  [{ t: "", v: "    " }, { t: "str", v: "'model.h5'" }],
  [{ t: "", v: ")" }],
  [],
  [{ t: "cm", v: "# Real-time computer vision" }],
  [{ t: "", v: "cap = cv2." }, { t: "fn", v: "VideoCapture" }, { t: "", v: "(0)" }],
  [],
  [{ t: "kw", v: "while" }, { t: "", v: " cap." }, { t: "fn", v: "isOpened" }, { t: "", v: "():" }],
  [{ t: "", v: "    ret, frame = cap." }, { t: "fn", v: "read" }, { t: "", v: "()" }],
  [],
  [{ t: "", v: "    " }, { t: "kw", v: "if" }, { t: "", v: " " }, { t: "kw", v: "not" }, { t: "", v: " ret:" }],
  [{ t: "", v: "        " }, { t: "kw", v: "break" }],
  [],
  [{ t: "", v: "    " }, { t: "cm", v: "# Process frame" }],
  [{ t: "", v: "    predictions = model." }, { t: "fn", v: "predict" }, { t: "", v: "(frame)" }],
  [{ t: "", v: "    " }, { t: "cm", v: "# ..." }],
];

// Fake terminal output that "runs" after the script finishes typing —
// gives the editor a second beat of life instead of just sitting static.
const OUTPUT_LINES = [
  { t: "cm", v: "$ python main.py" },
  { t: "", v: "Loading model.h5 ..." },
  { t: "sig", v: "✓ Model loaded (0.42s)" },
  { t: "", v: "Camera stream: ", tail: { t: "sig", v: "ONLINE" } },
  { t: "", v: "Prediction: ", tail: { t: "amber", v: "person · 98.6%" } },
];

const TOKEN_COLOR = {
  kw: "text-signal",
  fn: "text-cyan",
  str: "text-amber",
  cm: "text-muted/70",
  sig: "text-signal",
  amber: "text-amber",
  "": "text-text/90",
};

const totalLen = (line) => line.reduce((n, tok) => n + tok.v.length, 0);

function renderPartialLine(line, revealCount) {
  let remaining = revealCount;
  const out = [];
  for (const tok of line) {
    if (remaining <= 0) break;
    const take = Math.min(tok.v.length, remaining);
    out.push({ ...tok, v: tok.v.slice(0, take) });
    remaining -= take;
  }
  return out;
}

const TYPE_SPEED_MS = 14; // per character
const LINE_PAUSE_MS = 40; // extra beat between lines
const RESTART_PAUSE_MS = 2600; // hold the finished state before looping
const OUTPUT_LINE_PAUSE_MS = 260;

export default function HeroCodeEditor() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing -> output -> hold -> (reset)
  const [outputCount, setOutputCount] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) {
      setLineIndex(CODE_LINES.length);
      setPhase("output");
      setOutputCount(OUTPUT_LINES.length);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion.current) return;

    let timeoutId;

    if (phase === "typing") {
      if (lineIndex >= CODE_LINES.length) {
        timeoutId = setTimeout(() => setPhase("output"), 400);
      } else {
        const line = CODE_LINES[lineIndex];
        const lineLen = totalLen(line);
        if (charIndex < lineLen) {
          timeoutId = setTimeout(() => setCharIndex((c) => c + 1), TYPE_SPEED_MS);
        } else {
          timeoutId = setTimeout(() => {
            setLineIndex((i) => i + 1);
            setCharIndex(0);
          }, LINE_PAUSE_MS);
        }
      }
    } else if (phase === "output") {
      if (outputCount < OUTPUT_LINES.length) {
        timeoutId = setTimeout(() => setOutputCount((c) => c + 1), OUTPUT_LINE_PAUSE_MS);
      } else {
        timeoutId = setTimeout(() => setPhase("hold"), RESTART_PAUSE_MS);
      }
    } else if (phase === "hold") {
      setLineIndex(0);
      setCharIndex(0);
      setOutputCount(0);
      setPhase("typing");
    }

    return () => clearTimeout(timeoutId);
  }, [phase, lineIndex, charIndex, outputCount]);

  const showTypingCursor = phase === "typing" && lineIndex < CODE_LINES.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-xl border border-line/70 bg-panel/70 backdrop-blur-xl shadow-[0_0_40px_rgba(76,141,255,0.08)] overflow-hidden"
    >
      {/* ambient border glow */}
      <div
        className="absolute -inset-px rounded-xl pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(600px 200px at 20% 0%, rgba(76,141,255,0.10), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Top bar */}
      <div className="relative flex items-center gap-2 px-4 py-3 border-b border-line/60 bg-panel2/50">
        <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
        <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-muted px-2.5 py-1 rounded-md bg-base/40 border border-line/40">
          <span
            className={`text-signal transition-opacity duration-300 ${
              phase === "output" || phase === "hold" ? "animate-pulse" : ""
            }`}
          >
            ●
          </span>{" "}
          main.py
        </span>
        {(phase === "output" || phase === "hold") && (
          <span className="ml-auto font-mono text-[10px] tracking-widest text-signal/80">
            RUNNING
          </span>
        )}
      </div>

      {/* Code body */}
      <div className="relative px-5 py-5 font-mono text-[13px] leading-[1.65] overflow-x-auto min-h-[280px]">
        {CODE_LINES.slice(0, Math.min(lineIndex + 1, CODE_LINES.length)).map((line, i) => {
          const isCurrent = i === lineIndex && phase === "typing";
          const visibleTokens = isCurrent ? renderPartialLine(line, charIndex) : line;
          return (
            <div key={i} className="flex gap-4 whitespace-pre">
              <span className="select-none text-muted/40 w-5 text-right shrink-0">{i + 1}</span>
              <span>
                {visibleTokens.length === 0
                  ? "\u00A0"
                  : visibleTokens.map((tok, ti) => (
                      <span key={ti} className={TOKEN_COLOR[tok.t]}>
                        {tok.v}
                      </span>
                    ))}
                {isCurrent && showTypingCursor && (
                  <span
                    className="inline-block w-[7px] h-[13px] bg-signal ml-0.5 align-middle"
                    style={{ animation: "typewriter-cursor 0.8s step-end infinite" }}
                  />
                )}
              </span>
            </div>
          );
        })}

        {(phase === "output" || phase === "hold") && (
          <div className="mt-3 pt-3 border-t border-line/40">
            {OUTPUT_LINES.slice(0, outputCount).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex gap-4 whitespace-pre"
              >
                <span className="select-none w-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className={TOKEN_COLOR[line.t]}>{line.v}</span>
                  {line.tail && <span className={TOKEN_COLOR[line.tail.t]}>{line.tail.v}</span>}
                </span>
              </motion.div>
            ))}
            {outputCount >= OUTPUT_LINES.length && (
              <span
                className="inline-block w-[7px] h-[13px] bg-signal ml-9 align-middle"
                style={{ animation: "typewriter-cursor 0.8s step-end infinite" }}
              />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
