"use client";

import { ShieldCheck } from "lucide-react";
import { trustFactors, trustSignal } from "@/lib/trust";
import { InfoTooltip } from "@/components/info-tooltip";
import { pillars } from "@/lib/pillars";

const ratingColor: Record<string, string> = {
  Strong: "bg-emerald-500",
  Moderate: "bg-amber-400",
  Caution: "bg-rose-500",
};

export function TrustCard() {
  const p = pillars.trust;
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

      <div className="flex items-center gap-3">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold text-white"
          style={{ background: p.accent }}
        >
          {trustSignal.score}%
        </div>
        <div>
          <div className="text-[13px] font-extrabold text-gray-900">{trustSignal.label}</div>
          <div className="text-[12px] text-gray-600">{trustSignal.summary}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        {trustFactors.map((f) => (
          <div key={f.label} className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${ratingColor[f.rating]}`} />
            <span className="text-[11.5px] font-medium text-gray-600">{f.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[10.5px] italic text-gray-400">
        Reflects market structure, not likelihood of a correct outcome.
      </div>
    </section>
  );
}
