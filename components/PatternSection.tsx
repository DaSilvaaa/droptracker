"use client";

import { RadarChart } from "./RadarChart";

const RADAR_DATA = [
  { axis: "FREQUÊNCIA", value: 72 },
  { axis: "DESCONTO", value: 58 },
  { axis: "VEL. ESGOTAMENTO", value: 85 },
  { axis: "PREVISIBILIDADE", value: 67 },
  { axis: "ATIV. SOCIAL", value: 91 },
];

export function PatternSection() {
  return (
    <section className="py-20 px-4 border-t border-zinc">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-2">
            Análise
          </p>
          <h2 className="text-3xl font-display font-bold text-white">
            Análise de Padrões
          </h2>
          <p className="text-sm text-zinc-600 font-display mt-2 max-w-lg">
            Média agregada das 22 marcas rastreadas. Cada eixo representa uma dimensão do comportamento de saldo.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <RadarChart data={RADAR_DATA} brandName="Média Global" />
        </div>
      </div>
    </section>
  );
}
