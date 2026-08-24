"use client";

import { ShieldCheck } from "lucide-react";
import { trustBand, trustBandCopy, trustFactors, trustSignal, type TrustBand } from "@/lib/trust";
import { InfoTooltip } from "@/components/info-tooltip";
import { MapImpactChip } from "@/components/map-impact-chip";
import { pillars } from "@/lib/pillars";

const bandStyles: Record<TrustBand, { bar: string; text: string; badge: string }> = {
  high: { bar: "bg-emerald-500", text: "text-emerald-700", badge: "bg-emerald-500 text-white" },
  moderate: { bar: "bg-amber-400", text: "text-amber-700", badge: "bg-amber-400 text-gray-900" },
  low: { bar: "bg-rose-500", text: "text-rose-700", badge: "bg-rose-500 text-white" },
};

export function TrustCard() {
  const p = pillars.trust;
  const overallBand = trustBand(trustSignal.score);
  const overallStyle = bandStyles[overallBand];

  return (
    <section
      id="section-trust"
      className="rounded-xl border p-4"
      style={{ background: p.wash, borderColor: p.border }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide" style={{ color: p.accent }}>
          <ShieldCheck size={14} />
          TRUST · {p.concept.toUpperCase()}
          <InfoTooltip accent={p.accent} text={trustSignal.infoTooltip} />
        </div>
      </div>

      <MapImpactChip accent={p.accent} driver={p.mapDriver} impact={p.mapImpact} />

      <div className="flex items-center gap-3">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold ${overallStyle.badge}`}
        >
          {trustSignal.score}%
        </div>
        <div>
          <div className={`text-[13px] font-extrabold ${overallStyle.text}`}>
            {trustBandCopy[overallBand].label.toUpperCase()}
          </div>
          <div className="text-[12px] text-gray-600">{trustSignal.summary}</div>
        </div>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {trustFactors.map((f) => {
          const band = trustBand(f.score);
          const style = bandStyles[band];
          return (
            <div key={f.id} className="rounded-lg bg-white/70 p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[12px] font-bold text-gray-800">
                  {f.label}
                  <InfoTooltip accent={p.accent} text={f.detail} />
                </div>
                <span className={`text-[12px] font-extrabold ${style.text}`}>{f.score}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all ${style.bar}`}
                  style={{ width: `${f.score}%` }}
                />
              </div>
              <div className="mt-1 text-[11px] leading-snug text-gray-500">{f.summary}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[10.5px] italic text-gray-400">
        Reflects market structure, not likelihood of a correct outcome.
      </div>
    </section>
  );
}
