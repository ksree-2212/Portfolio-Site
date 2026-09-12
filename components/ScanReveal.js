"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Wraps content so it fades and slides into place when it enters the viewport.
export default function ScanReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`scan-frame ${inView ? "in-view" : ""} ${className}`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* A small scan accent keeps the computer-vision identity without framing every block. */}
      {inView && <span className="scan-line-effect" />}
      {children}
    </motion.div>
  );
}
