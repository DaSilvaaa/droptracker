"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { DropHistory, Brand } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface HistoryTimelineProps {
  history: (DropHistory & { brand?: Pick<Brand, "name" | "logo_emoji"> })[];
}

const DROP_TYPE_LABELS: Record<string, string> = {
  anniversary: "ANIVERSÁRIO",
  summer: "VERÃO",
  flash: "FLASH SALE",
  collab: "COLLAB",
  clearance: "CLEARANCE",
};

function TimelineItem({
  entry,
  index,
}: {
  entry: DropHistory & { brand?: Pick<Brand, "name" | "logo_emoji"> };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const soldOutWidth = entry.sold_out_minutes
    ? Math.min((entry.sold_out_minutes / 60) * 100, 100)
    : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="grid grid-cols-[80px_1px_1fr] gap-4"
    >
      {/* Date */}
      <div className="flex flex-col items-end pt-1">
        <span className="font-mono text-xs text-zinc-500">
          {formatDate(entry.happened_at)}
        </span>
      </div>

      {/* Line */}
      <div className="relative flex justify-center">
        <div className="h-full w-px bg-zinc-800" />
        <div className="absolute top-1.5 h-2 w-2 rounded-full border-2 border-acid bg-obsidian" />
      </div>

      {/* Content */}
      <div className="pb-8 flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {entry.brand && (
            <span className="text-sm font-display font-bold text-white">
              {entry.brand.logo_emoji} {entry.brand.name}
            </span>
          )}
          {entry.had_password && (
            <span className="text-[10px] font-mono border border-zinc-700 px-2 py-0.5 text-zinc-500">
              🔒 SENHA
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-2xl font-mono font-bold text-acid">
            -{entry.discount_peak}%
          </span>
          <div className="text-xs text-zinc-600 font-mono">
            {entry.duration_hours}h de duração
          </div>
        </div>

        {soldOutWidth !== null && entry.sold_out_minutes !== null && (
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-zinc-600 tracking-wider">
              ESGOTOU EM {entry.sold_out_minutes} MIN
            </span>
            <div className="h-1 w-full max-w-[200px] bg-zinc-800">
              <div
                className="h-full bg-acid transition-all duration-700"
                style={{ width: `${soldOutWidth}%` }}
              />
            </div>
          </div>
        )}

        {entry.notes && (
          <p className="text-xs text-zinc-600 font-display">{entry.notes}</p>
        )}
      </div>
    </motion.div>
  );
}

export function HistoryTimeline({ history }: HistoryTimelineProps) {
  if (history.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-zinc-700 font-mono text-sm">
        SEM HISTÓRICO REGISTADO
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {history.map((entry, i) => (
        <TimelineItem key={entry.id} entry={entry} index={i} />
      ))}
    </div>
  );
}
