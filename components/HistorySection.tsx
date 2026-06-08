import { HistoryTimeline } from "./HistoryTimeline";
import type { DropHistory } from "@/lib/types";

interface HistorySectionProps {
  history: DropHistory[];
}

export function HistorySection({ history }: HistorySectionProps) {
  return (
    <section id="historico" className="py-20 px-4 border-t border-zinc bg-carbon">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-2">
            Registo
          </p>
          <h2 className="text-3xl font-display font-bold text-white">
            Histórico de Drops
          </h2>
          <p className="text-sm text-zinc-600 font-display mt-2">
            Todos os drops registados pela comunidade.
          </p>
        </div>

        <HistoryTimeline history={history} />
      </div>
    </section>
  );
}
