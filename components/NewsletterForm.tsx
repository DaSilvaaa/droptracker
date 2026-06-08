"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { useUIStore } from "@/lib/store";
import { BRANDS_DATA } from "@/lib/brands-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const { selectedBrands, toggleBrand, subscriberEmail, setSubscriberEmail } =
    useUIStore();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subscriberEmail || selectedBrands.length === 0) {
      setErrorMsg("Escolhe pelo menos uma marca e introduz o teu email.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscriberEmail, brands: selectedBrands }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Algo correu mal.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Erro de rede. Tenta novamente.");
      setStatus("error");
    }
  }

  return (
    <section id="alertas" className="bg-carbon border-t border-zinc py-24 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-px w-8 bg-acid" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase">
            Cheat Code
          </span>
        </div>

        <h2 className="text-5xl font-display font-extrabold tracking-tighter text-white mb-4">
          Entra antes de<br />toda a gente.
        </h2>
        <p className="text-zinc-500 font-display text-base mb-10 max-w-lg">
          Escolhe as marcas que queres seguir. Recebemos as pistas. Nós avisamos-te 48h antes.
        </p>

        {/* Brand selector */}
        <div className="mb-8">
          <p className="text-xs font-mono tracking-widest text-zinc-600 uppercase mb-3">
            Seleciona as tuas marcas ({selectedBrands.length} selecionadas)
          </p>
          <div className="flex flex-wrap gap-2">
            {BRANDS_DATA.map((brand) => {
              const active = selectedBrands.includes(brand.slug);
              return (
                <motion.button
                  key={brand.slug}
                  onClick={() => toggleBrand(brand.slug)}
                  whileTap={{ scale: 0.95 }}
                  animate={active ? { scale: [0.95, 1.05, 1] } : { scale: 1 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                  className={`px-3 py-1.5 text-xs font-mono font-medium tracking-wider border transition-all duration-200 ${
                    active
                      ? "bg-acid text-obsidian border-acid"
                      : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
                  }`}
                >
                  {brand.logo_emoji} {brand.name}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Email form */}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5 text-acid" />
              <div>
                <p className="font-display font-bold text-acid text-lg">
                  ✓ Estás dentro. Prepara-te.
                </p>
                <p className="text-sm text-zinc-500 font-mono mt-0.5">
                  A monitorizar {selectedBrands.length} marca{selectedBrands.length !== 1 ? "s" : ""} para ti.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                type="email"
                placeholder="o.teu@email.com"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                className="flex-1 h-12 text-base"
                required
              />
              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="h-12 px-8 font-bold tracking-widest whitespace-nowrap"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "ATIVAR ALERTAS →"
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        {errorMsg && (
          <p className="mt-3 text-xs font-mono text-red-400">{errorMsg}</p>
        )}
      </div>
    </section>
  );
}
