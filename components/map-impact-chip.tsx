"use client";

import { TrendingUp } from "lucide-react";
import { InfoTooltip } from "@/components/info-tooltip";

export function MapImpactChip({
  accent,
  driver,
  impact,
}: {
  accent: string;
  driver: string;
  impact: string;
}) {
  return (
    <div
      className="mb-3 flex items-center gap-2 rounded-lg border bg-white/70 px-3 py-2 text-[11.5px]"
      style={{ borderColor: accent + "33" }}
    >
      <TrendingUp size={14} style={{ color: accent }} className="shrink-0" />
      <div className="flex-1">
        <span className="font-extrabold" style={{ color: accent }}>
          MAP IMPACT
        </span>
        <span className="ml-1 text-gray-500">· targets {driver}</span>
      </div>
      <InfoTooltip
        accent={accent}
        text={`${impact} This is a directional hypothesis to validate with a test, not a measured result.`}
      />
    </div>
  );
}
