"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScanReveal from "./ScanReveal";
import { fallbackProjects } from "@/data/content";
import { ArrowUpRight, ScanEye, BrainCircuit, BarChart3 } from "lucide-react";

const API_URL = "/api/admin";

const FILTERS = ["All", "Computer Vision", "Deep Learning", "Data Science"];

const CATEGORY_VISUAL = {
  "Computer Vision": { Icon: ScanEye, color: "#4C8DFF" },
  "Deep Learning": { Icon: BrainCircuit, color: "#38E0FF" },
  "Data Science": { Icon: BarChart3, color: "#F2A65A" },
};

// 3D tilt card hook
function useTilt(ref) {
  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  }, [ref]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  }, [ref]);

  return { handleMouseMove, handleMouseLeave };
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const { handleMouseMove, handleMouseLeave } = useTilt(cardRef);
  const visual = CATEGORY_VISUAL[project.category] || CATEGORY_VISUAL["Computer Vision"];
  const { Icon, color } = visual;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-detect
        data-detect-label={
          typeof project.confidence === "number"
            ? `project · ${Math.round(project.confidence * 100)}%`
            : "project · 90%"
        }
        className="glass-card shimmer-hover rounded-lg overflow-hidden flex flex-col h-full"
        style={{ transition: "transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease" }}
      >
        {/* Visual header */}
        <div
          className="relative h-32 flex items-center justify-center overflow-hidden border-b border-line/60"
          style={{
            background: `linear-gradient(135deg, ${color}1A 0%, rgba(11,17,32,0.9) 70%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(76,141,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(76,141,255,0.15) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <Icon size={38} style={{ color }} className="relative" strokeWidth={1.5} />
          <span
            className="absolute top-3 left-3 font-mono text-[11px] px-2 py-1 rounded-md border"
            style={{ borderColor: `${color}55`, color, backgroundColor: `${color}14` }}
          >
            {project.category}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display font-bold text-xl">{project.name}</h3>
            {typeof project.confidence === "number" && (
              <span className="confidence-tag font-mono text-xs text-signal shrink-0 ml-2 mt-1">
                {Math.round(project.confidence * 100)}%
              </span>
            )}
          </div>

          <p className="text-muted text-sm leading-relaxed mb-4">{project.description}</p>

          {project.highlights?.length > 0 && (
            <ul className="space-y-2 mb-4">
              {project.highlights.map((h) => (
                <li key={h} className="text-muted text-sm flex gap-2">
                  <span className="text-signal font-mono mt-0.5">›</span>
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-4 flex flex-wrap gap-2">
            {project.stack?.map((s) => (
              <span key={s} className="font-mono text-xs text-muted/70 bg-panel2/50 px-2 py-0.5 rounded">
                {s}
              </span>
            ))}
          </div>

          <a
            href={project.link || "#"}
            target={project.link ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`mt-4 text-signal text-sm font-medium inline-flex items-center gap-1.5 group ${
              !project.link ? "pointer-events-none opacity-50" : ""
            }`}
          >
            View project
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/projects`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(
            data.map((project) => ({
              ...project,
              category: project.category || project.tag || "Computer Vision",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-28 relative">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(76,141,255,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <ScanReveal>
        <p className="font-mono text-sm text-signal mb-3">03 — Projects</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3 max-w-2xl">
          Featured Projects
        </h2>
        <p className="text-muted text-lg max-w-2xl mb-8">
          A few selected projects that showcase my skills in AI, computer vision, and data
          science.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-pill ${filter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </ScanReveal>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <ProjectCard key={project.id || project.name} project={project} index={i} />
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted text-sm col-span-full py-10 text-center"
            >
              More {filter} projects coming soon.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
