import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DropStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: DropStatus): string {
  switch (status) {
    case "predicted":
      return "#e8ff00";
    case "confirmed":
      return "#ff6b00";
    case "live":
      return "#00ff88";
    case "ended":
      return "#333333";
    case "watching":
      return "#555555";
    default:
      return "#333333";
  }
}

export function getStatusLabel(status: DropStatus): string {
  switch (status) {
    case "predicted":
      return "PREVISTO";
    case "confirmed":
      return "CONFIRMADO";
    case "live":
      return "AO VIVO";
    case "ended":
      return "TERMINADO";
    case "watching":
      return "A MONITORIZAR";
  }
}

export function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    PT: "🇵🇹",
    ES: "🇪🇸",
    UK: "🇬🇧",
    US: "🇺🇸",
    SE: "🇸🇪",
    FR: "🇫🇷",
    DE: "🇩🇪",
  };
  return flags[country] ?? "🌍";
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    streetwear: "STREETWEAR",
    fastfashion: "FAST FASHION",
    luxury: "PREMIUM",
    sports: "SPORTS",
  };
  return labels[category] ?? category.toUpperCase();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
