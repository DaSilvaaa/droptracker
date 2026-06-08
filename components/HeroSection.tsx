"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HEADLINE_WORDS = [
  { text: "NUNCA", row: 0 },
  { text: "MAIS", row: 0 },
  { text: "PERCAS", row: 1 },
  { text: "UM", row: 1 },
  { text: "DROP", row: 2 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 grid-bg overflow-hidden">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-8"
      >
        <span className="h-2 w-2 rounded-full bg-[#00ff88] animate-pulse" />
        <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">
          Radar Ativo — 22 Marcas
        </span>
      </motion.div>

      {/* Headline */}
      <h1 className="text-center mb-6">
        {[
          { words: ["NUNCA", "MAIS"], key: 0 },
          { words: ["PERCAS", "UM"], key: 1 },
          { words: ["DROP."], key: 2 },
        ].map((line, li) => (
          <div key={li} className="flex justify-center gap-4 overflow-hidden">
            {line.words.map((word, wi) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: (li * 2 + wi) * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`block text-7xl md:text-9xl font-display font-extrabold tracking-tighter leading-none ${
                  word === "DROP." ? "text-white" : "text-white"
                }`}
              >
                {word === "DROP." ? (
                  <>
                    DROP<span className="text-acid">.</span>
                  </>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </div>
        ))}
      </h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="text-center text-base text-zinc-600 font-display max-w-lg mb-10 leading-relaxed"
      >
        Radar comunitário de saldos para as 22 marcas mais procuradas. Padrões reais. Alertas reais. Zero FOMO.
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2 mb-16"
      >
        {[
          "22 MARCAS RASTREADAS",
          "4.2K MEMBROS ATIVOS",
          "87% PRECISÃO NAS PREVISÕES",
        ].map((stat) => (
          <div
            key={stat}
            className="border border-zinc px-4 py-2 text-[11px] font-mono tracking-wider text-zinc-500"
          >
            {stat}
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 flex flex-col items-center gap-1"
      >
        <span className="text-[9px] font-mono tracking-widest text-zinc-700 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-zinc-700" />
        </motion.div>
      </motion.div>
    </section>
  );
}
