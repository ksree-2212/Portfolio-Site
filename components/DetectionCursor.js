"use client";

import { useEffect, useRef } from "react";

// Replaces the pointer with a small reticle that snaps into an
// object-detection-style bounding box (corner brackets + confidence
// label) whenever it passes over an element tagged data-detect.
// Desktop-only: skipped on touch devices and for reduced-motion users.
export default function DetectionCursor() {
  const dotRef = useRef(null);
  const boxRef = useRef(null);
  const labelRef = useRef(null);
  const currentTargetRef = useRef(null);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!supportsFinePointer || prefersReducedMotion) return;

    const dot = dotRef.current;
    const box = boxRef.current;
    const label = labelRef.current;
    if (!dot || !box || !label) return;

    document.body.classList.add("detect-active");

    function handleMouseMove(e) {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }

    function lockToTarget(target) {
      const rect = target.getBoundingClientRect();
      const pad = 6;
      box.style.transform = `translate3d(${rect.left - pad}px, ${rect.top - pad}px, 0)`;
      box.style.width = `${rect.width + pad * 2}px`;
      box.style.height = `${rect.height + pad * 2}px`;
      box.classList.add("locked");
      label.textContent = target.getAttribute("data-detect-label") || "object · 90%";
    }

    function unlock() {
      box.classList.remove("locked");
      dot.style.opacity = "1";
      currentTargetRef.current = null;
    }

    function handleOver(e) {
      const target = e.target.closest("[data-detect]");
      if (!target || target === currentTargetRef.current) return;
      currentTargetRef.current = target;
      lockToTarget(target);
    }

    function handleOut(e) {
      const target = e.target.closest("[data-detect]");
      if (!target || target !== currentTargetRef.current) return;
      const related = e.relatedTarget && e.relatedTarget.closest
        ? e.relatedTarget.closest("[data-detect]")
        : null;
      if (related === target) return;
      unlock();
    }

    function handleReposition() {
      if (currentTargetRef.current) lockToTarget(currentTargetRef.current);
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      document.body.classList.remove("detect-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="detect-cursor-dot" aria-hidden="true" />
      <div ref={boxRef} className="detect-box" aria-hidden="true">
        <span className="detect-corner tl" />
        <span className="detect-corner tr" />
        <span className="detect-corner bl" />
        <span className="detect-corner br" />
        <span ref={labelRef} className="detect-label" />
      </div>
    </>
  );
}