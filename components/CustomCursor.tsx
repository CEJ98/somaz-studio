"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("a, button, [data-cursor-hover]")) setHovering(true);
    };

    const onOut = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("a, button, [data-cursor-hover]")) setHovering(false);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);

  const size = hovering ? 28 : 8;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none mix-blend-difference hidden md:block"
      style={{ backgroundColor: "#C9A96E" }}
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 30,
        mass: 0.4,
        opacity: { duration: 0.2 },
      }}
    />
  );
}
