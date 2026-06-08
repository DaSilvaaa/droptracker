"use client";

import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RadarChartProps {
  data: { axis: string; value: number }[];
  brandName?: string;
}

export function RadarChart({ data, brandName }: RadarChartProps) {
  return (
    <div className="flex flex-col gap-4">
      <ResponsiveContainer width="100%" height={320}>
        <RechartsRadar data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#222222" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{
              fill: "#52525b",
              fontSize: 10,
              fontFamily: "JetBrains Mono",
              letterSpacing: "0.1em",
            }}
          />
          <Radar
            name={brandName ?? "Score"}
            dataKey="value"
            stroke="#e8ff00"
            fill="#e8ff00"
            fillOpacity={0.1}
            strokeWidth={1.5}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111111",
              border: "1px solid #1a1a1a",
              borderRadius: 0,
              color: "#e8ff00",
              fontFamily: "JetBrains Mono",
              fontSize: 12,
            }}
            formatter={(value: number) => [value.toFixed(0), brandName ?? "Score"]}
          />
        </RechartsRadar>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 gap-2">
        {[
          { label: "Frequência de Saldos", desc: "Quantas vezes por ano a marca faz saldos" },
          { label: "Desconto Médio", desc: "Percentagem média de desconto nos saldos" },
          { label: "Vel. Esgotamento", desc: "Rapidez com que os stocks esgotam" },
          { label: "Previsibilidade", desc: "Consistência de datas e padrões históricos" },
          { label: "Atividade Social", desc: "Sinais de pré-drop nas redes sociais" },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-acid" />
            <div>
              <span className="text-xs font-mono font-bold text-zinc-400">{item.label}</span>
              <p className="text-[11px] text-zinc-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
