"use client";

import { Radio } from "lucide-react";
import { distributionChannels, enhancedApiResponse, todayApiResponse } from "@/lib/distribute";
import { InfoTooltip } from "@/components/info-tooltip";
import { pillars } from "@/lib/pillars";
import { selectedOutcome } from "@/lib/market";

export function DistributePanel() {
  const p = pillars.distribute;
  return (
    <section
      id="section-distribute"
      className="rounded-xl border p-4"
      style={{ background: p.wash, borderColor: p.border }}
    >
      <div className="mb-3 flex items-center gap-1.5 text-[11px] font-bold tracking-wide" style={{ color: p.accent }}>
        <Radio size={14} />
        DISTRIBUTE · {p.concept.toUpperCase()}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border bg-white/70 p-3.5" style={{ borderColor: p.border }}>
          <div className="mb-2 flex items-center gap-1.5 text-[12px] font-bold text-gray-900">
            API
            <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-500">
              APIS EXIST TODAY
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <div className="mb-1 text-[10.5px] font-bold text-gray-400">TODAY</div>
              <pre className="whitespace-pre-wrap rounded-md bg-gray-900 p-2.5 text-[10.5px] leading-relaxed text-gray-100">
                {todayApiResponse}
              </pre>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-1 text-[10.5px] font-bold" style={{ color: p.accent }}>
                CONCEPTUAL INTELLIGENCE API
                <InfoTooltip
                  accent={p.accent}
                  text="A proposed extension of the existing market API that adds interpretive context — momentum, drivers, and signal quality — alongside the raw probability."
                />
              </div>
              <pre className="whitespace-pre-wrap rounded-md bg-gray-900 p-2.5 text-[10.5px] leading-relaxed text-emerald-300">
                {enhancedApiResponse}
              </pre>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white/70 p-3.5" style={{ borderColor: p.border }}>
          <div className="mb-2 text-[12px] font-bold text-gray-900">Embeddable widget preview</div>
          <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Finance Daily · Markets Widget
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[12.5px] font-semibold text-gray-800">Fed rate decision</div>
                <div className="text-[11px] text-gray-500">{selectedOutcome.label}</div>
              </div>
              <div className="text-right">
                <div className="text-[20px] font-extrabold text-gray-900">{selectedOutcome.probability}%</div>
                <div className="text-[11px] font-semibold text-emerald-600">▲ 8 pts</div>
              </div>
            </div>
            <div className="mt-2 border-t border-gray-100 pt-2 text-[10.5px] text-gray-400">
              Powered by Polymarket+ Intelligence · Conceptual
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {distributionChannels.map((c) => (
              <div key={c.label} className="rounded-md bg-gray-50 px-2 py-1.5">
                <div className="text-[11px] font-bold text-gray-800">{c.label}</div>
                <div className="text-[10px] text-gray-400">{c.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
