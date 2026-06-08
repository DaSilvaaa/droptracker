"use client";

import type { DropStatus } from "@/lib/types";
import { getStatusLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface AlertBadgeProps {
  status: DropStatus;
  className?: string;
}

export function AlertBadge({ status, className }: AlertBadgeProps) {
  const styles: Record<DropStatus, string> = {
    predicted: "border-acid text-acid",
    confirmed: "border-[#ff6b00] text-[#ff6b00]",
    live: "border-[#00ff88] text-[#00ff88] animate-pulse",
    ended: "border-[#333] text-[#555]",
    watching: "border-[#555] text-[#666]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest",
        styles[status],
        className
      )}
    >
      {status === "live" && (
        <span className="h-1.5 w-1.5 rounded-full bg-[#00ff88] animate-pulse" />
      )}
      {getStatusLabel(status)}
    </span>
  );
}
