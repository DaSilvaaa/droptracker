"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Brand } from "@/lib/types";
import { AlertBadge } from "./AlertBadge";
import { CountdownTimer } from "./CountdownTimer";
import { getCountryFlag, getCategoryLabel, cn } from "@/lib/utils";

interface BrandCardProps {
  brand: Brand;
  index?: number;
}

function SignalBars({ level }: { level: number }) {
  const heights = ["h-3", "h-4", "h-5", "h-7", "h-9"];

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-mono tracking-widest text-zinc-600 uppercase">
        Força do Sinal
      </span>
      <div className="flex items-end gap-1">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.08, duration: 0.3, type: "spring" }}
            style={{ originY: 1 }}
            className={cn(
              "w-2.5 rounded-sm transition-colors duration-200",
              h,
              i < level ? "bg-acid" : "bg-zinc-800"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function BrandCard({ brand, index = 0 }: BrandCardProps) {
  const router = useRouter();
  const drop = brand.current_drop;
  const status = drop?.status ?? "watching";

  const borderClass: Record<string, string> = {
    predicted: "border-acid",
    confirmed: "border-[#ff6b00]",
    live: "border-[#00ff88] animate-pulse-slow",
    ended: "border-zinc-800",
    watching: "border-zinc-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.01 }}
      onClick={() => router.push(`/brands/${brand.slug}`)}
      className={cn(
        "group relative flex flex-col gap-4 bg-carbon border p-4 cursor-pointer transition-all duration-300 hover:border-acid",
        borderClass[status]
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl leading-none">{brand.logo_emoji}</span>
          <div>
            <p className="font-display font-bold text-base leading-tight text-white">
              {brand.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs">{getCountryFlag(brand.country)}</span>
              <span className="text-[10px] font-mono text-zinc-600 tracking-wider">
                {brand.country} · {getCategoryLabel(brand.category)}
              </span>
            </div>
          </div>
        </div>
        {drop && <AlertBadge status={drop.status} />}
        {!drop && <AlertBadge status="watching" />}
      </div>

      {/* Signal bars */}
      <SignalBars level={drop?.alert_level ?? 1} />

      {/* Prediction */}
      {drop && drop.status !== "ended" && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-display text-zinc-300 leading-snug">{drop.title}</p>
          {drop.discount_range && (
            <span className="inline-flex w-fit border border-zinc-700 px-2 py-0.5 text-[10px] font-mono text-zinc-400 tracking-wider">
              {drop.discount_range} OFF
            </span>
          )}
        </div>
      )}

      {/* Evidence chips */}
      {drop?.evidence && drop.evidence.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {drop.evidence.slice(0, 3).map((e, i) => (
            <span
              key={i}
              className="text-[10px] border border-zinc-800 px-2 py-0.5 text-zinc-500 font-mono"
            >
              {e}
            </span>
          ))}
        </div>
      )}

      {/* Countdown */}
      {drop?.predicted_date && drop.status !== "ended" && (
        <CountdownTimer
          targetDate={new Date(drop.predicted_date)}
          label="Previsão em"
        />
      )}

      {/* CTA */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/brands/${brand.slug}`);
        }}
        className="mt-auto flex w-full items-center justify-between border border-zinc-800 px-3 py-2 text-xs font-display font-medium text-zinc-500 transition-all duration-200 hover:border-acid hover:text-acid group/btn"
      >
        <span>VER MARCA</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
      </button>
    </motion.div>
  );
}
