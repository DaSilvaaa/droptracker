"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandCard } from "./BrandCard";
import { useUIStore } from "@/lib/store";
import type { Brand, FilterOption } from "@/lib/types";

const FILTERS: { label: string; value: FilterOption }[] = [
  { label: "TODOS", value: "all" },
  { label: "🔥 STREETWEAR", value: "streetwear" },
  { label: "⚡ FAST FASHION", value: "fastfashion" },
  { label: "🏛️ PREMIUM", value: "luxury" },
  { label: "🚨 IMINENTE", value: "imminent" },
];

interface RadarSectionProps {
  brands: Brand[];
}

export function RadarSection({ brands }: RadarSectionProps) {
  const { activeFilter, setActiveFilter } = useUIStore();
  const [isSticky, setIsSticky] = useState(false);

  const filtered = brands.filter((b) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "imminent")
      return (
        b.current_drop?.status === "confirmed" ||
        b.current_drop?.status === "live"
      );
    return b.category === activeFilter;
  });

  return (
    <>
      {/* Sticky filter bar */}
      <div
        id="marcas"
        className="sticky top-[65px] z-40 bg-obsidian/90 backdrop-blur-sm border-b border-zinc py-3 px-4"
      >
        <div className="mx-auto max-w-7xl flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
          {FILTERS.map((f) => (
            <motion.button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`relative whitespace-nowrap px-4 py-1.5 text-xs font-mono font-medium tracking-wider transition-colors duration-200 border shrink-0 ${
                activeFilter === f.value
                  ? "bg-acid text-obsidian border-acid"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
              }`}
            >
              {activeFilter === f.value && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-acid"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              {f.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <section id="radar" className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-2">
              Radar Ativo
            </p>
            <h2 className="text-3xl font-display font-bold text-white">
              Previsões em Tempo Real
            </h2>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filtered.map((brand, i) => (
                <BrandCard key={brand.slug} brand={brand} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="flex items-center justify-center py-24 text-zinc-700 font-mono text-sm">
              NENHUMA MARCA ENCONTRADA
            </div>
          )}
        </div>
      </section>
    </>
  );
}
