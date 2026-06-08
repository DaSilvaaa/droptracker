"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { Brand, DropHistory } from "@/lib/types";
import { AlertBadge } from "@/components/AlertBadge";
import { CountdownTimer } from "@/components/CountdownTimer";
import { HistoryTimeline } from "@/components/HistoryTimeline";
import { RadarChart } from "@/components/RadarChart";
import { BrandCard } from "@/components/BrandCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getCountryFlag, getCategoryLabel, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface BrandPageClientProps {
  brand: Brand;
  history: DropHistory[];
  relatedBrands: Brand[];
}

function SignalBarsBig({ level }: { level: number }) {
  const heights = ["h-4", "h-6", "h-8", "h-10", "h-12"];
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
        Força do Sinal
      </span>
      <div className="flex items-end gap-1.5">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4, type: "spring" }}
            style={{ originY: 1 }}
            className={cn("w-4 rounded-sm", h, i < level ? "bg-acid" : "bg-zinc-800")}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-zinc bg-carbon p-4 flex flex-col gap-1">
      <span className="text-[9px] font-mono tracking-widest text-zinc-600 uppercase">{label}</span>
      <span className="text-2xl font-mono font-bold text-acid">{value}</span>
    </div>
  );
}

export function BrandPageClient({ brand, history, relatedBrands }: BrandPageClientProps) {
  const drop = brand.current_drop;

  const avgDiscount =
    history.length > 0
      ? Math.round(history.reduce((acc, h) => acc + h.discount_peak, 0) / history.length)
      : 0;

  const fastestSoldOut = history.reduce<number | null>((acc, h) => {
    if (h.sold_out_minutes === null) return acc;
    return acc === null || h.sold_out_minutes < acc ? h.sold_out_minutes : acc;
  }, null);

  const radarData = [
    { axis: "FREQUÊNCIA", value: history.length > 4 ? 90 : history.length * 20 },
    { axis: "DESCONTO", value: avgDiscount },
    { axis: "VEL. ESGOTAMENTO", value: fastestSoldOut ? Math.max(10, 100 - fastestSoldOut) : 40 },
    { axis: "PREVISIBILIDADE", value: drop?.alert_level ? drop.alert_level * 20 : 40 },
    { axis: "ATIV. SOCIAL", value: 65 },
  ];

  return (
    <main className="min-h-screen bg-obsidian">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-600 hover:text-acid transition-colors duration-200 mb-10"
          >
            <ArrowLeft className="h-3 w-3" />
            VOLTAR AO RADAR
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT — sticky sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start flex flex-col gap-6">
              {/* Brand hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-zinc bg-carbon p-6 flex flex-col gap-4"
              >
                <span className="text-7xl leading-none">{brand.logo_emoji}</span>
                <div>
                  <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
                    {brand.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-sm">{getCountryFlag(brand.country)}</span>
                    <span className="text-[10px] font-mono text-zinc-600 tracking-wider">
                      {brand.country}
                    </span>
                    <span className="text-zinc-800">·</span>
                    <span className="text-[10px] font-mono text-zinc-600 tracking-wider">
                      {getCategoryLabel(brand.category)}
                    </span>
                    <span className="text-zinc-800">·</span>
                    <span className="text-[10px] font-mono text-zinc-600 tracking-wider">
                      Est. {brand.founded_year}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 font-display leading-relaxed">
                  {brand.description}
                </p>
              </motion.div>

              {/* Signal */}
              <div className="border border-zinc bg-carbon p-6">
                <SignalBarsBig level={drop?.alert_level ?? 1} />
              </div>

              {/* Current drop */}
              {drop && drop.status !== "ended" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="border border-acid bg-carbon p-6 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-display font-bold text-white">{drop.title}</p>
                    <AlertBadge status={drop.status} />
                  </div>

                  {drop.discount_range && (
                    <span className="text-2xl font-mono font-bold text-acid">
                      {drop.discount_range} OFF
                    </span>
                  )}

                  {drop.predicted_date && (
                    <CountdownTimer
                      targetDate={new Date(drop.predicted_date)}
                      label="Previsão em"
                      large
                    />
                  )}
                </motion.div>
              )}

              {/* Subscribe CTA */}
              <a
                href="/#alertas"
                className="flex items-center justify-center gap-2 border border-acid px-4 py-3 text-xs font-mono font-bold tracking-widest text-acid hover:bg-acid hover:text-obsidian transition-all duration-200"
              >
                ATIVAR ALERTA DESTA MARCA →
              </a>

              {/* External links */}
              <div className="flex gap-3">
                {brand.website_url && (
                  <a
                    href={brand.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center border border-zinc-800 px-3 py-2 text-[10px] font-mono text-zinc-600 hover:border-zinc-600 hover:text-zinc-400 transition-all duration-200"
                  >
                    WEBSITE ↗
                  </a>
                )}
                {brand.instagram_handle && (
                  <a
                    href={`https://instagram.com/${brand.instagram_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center border border-zinc-800 px-3 py-2 text-[10px] font-mono text-zinc-600 hover:border-zinc-600 hover:text-zinc-400 transition-all duration-200"
                  >
                    @{brand.instagram_handle} ↗
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT — scrollable content */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Stats */}
              {history.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-4">
                    Dados Históricos
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <StatCard
                      label="Desconto médio máximo"
                      value={avgDiscount ? `${avgDiscount}%` : "N/D"}
                    />
                    <StatCard
                      label="Drop mais rápido a esgotar"
                      value={fastestSoldOut ? `${fastestSoldOut} min` : "N/D"}
                    />
                    <StatCard
                      label="Drops registados"
                      value={String(history.length)}
                    />
                  </div>
                </div>
              )}

              {/* Evidence */}
              {drop?.evidence && drop.evidence.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-4">
                    Evidências do Próximo Drop
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {drop.evidence.map((e, i) => (
                      <span
                        key={i}
                        className="border border-zinc-700 px-3 py-1.5 text-xs font-mono text-zinc-400"
                      >
                        ◆ {e}
                      </span>
                    ))}
                  </div>
                  {drop.notes && (
                    <p className="mt-4 text-sm text-zinc-500 font-display leading-relaxed border-l-2 border-zinc pl-4">
                      {drop.notes}
                    </p>
                  )}
                </div>
              )}

              {/* Pattern radar */}
              <div>
                <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-4">
                  Padrões Detetados
                </p>
                <div className="border border-zinc bg-carbon p-6">
                  <RadarChart data={radarData} brandName={brand.name} />
                </div>
              </div>

              {/* History */}
              <div>
                <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-6">
                  Histórico desta Marca
                </p>
                <HistoryTimeline history={history} />
              </div>

              {/* Related */}
              {relatedBrands.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-4">
                    Outras Marcas a Seguir
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedBrands.map((b, i) => (
                      <BrandCard key={b.slug} brand={b} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
