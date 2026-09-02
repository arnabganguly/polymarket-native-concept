"use client";

import type { ReactNode } from "react";

// Shared header used at the top of every pillar section (Understand, Trust,
// Participate, Distribute). Makes two things unmissable at a glance for
// someone watching a demo: which pillar this is (the small solid badge) and
// the actual capability name being pitched (the large highlighted heading) —
// the thing to say out loud, not just the framework label above it.
// Lightweight variant for sub-capabilities inside a pillar that surfaces more
// than one named capability (e.g. Participate → Frictionless Trading +
// Trading Automation). Keeps the same accent-driven visual language as
// PillarHeader at a smaller scale, so it reads as "part of the same story."
export function SubCapabilityLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px] font-extrabold text-gray-900">
      <span className="h-3.5 w-1 shrink-0 rounded-full" style={{ background: accent }} />
      {label}
    </span>
  );
}

export function PillarHeader({
  icon,
  pillarLabel,
  capability,
  accent,
  tooltip,
}: {
  icon: ReactNode;
  pillarLabel: string;
  capability: string;
  accent: string;
  tooltip?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end gap-x-3 gap-y-1.5">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span
            className="group flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-extrabold tracking-widest text-white shadow-sm transition-transform hover:scale-105"
            style={{ background: accent, boxShadow: `0 2px 10px ${accent}55` }}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            {icon}
            {pillarLabel}
          </span>
          <span className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-gray-400">Capability</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative inline-block leading-tight">
            <span
              className="absolute inset-x-0 bottom-[2px] -z-10 h-[9px] rounded-[3px]"
              style={{ background: `${accent}30` }}
            />
            <span className="relative text-[19px] font-extrabold tracking-tight text-gray-900">{capability}</span>
          </span>
          {tooltip}
        </div>
      </div>
    </div>
  );
}
