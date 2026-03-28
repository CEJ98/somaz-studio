"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats } from "@/lib/data";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (isInView) setShown(true);
  }, [isInView]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <p className="font-heading text-[clamp(3rem,6vw,6rem)] leading-none text-paper font-light">
        {value}
      </p>
      <p className="section-label text-paper/40 mt-3">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-ink">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <AnimatedStat key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
