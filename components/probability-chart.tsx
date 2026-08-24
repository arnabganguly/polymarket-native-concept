"use client";

import { probabilityHistory, selectedOutcome } from "@/lib/market";

export function ProbabilityChart() {
  const points = probabilityHistory;
  const w = 640;
  const h = 160;
  const pad = 8;
  const min = 25;
  const max = 65;

  const coords = points.map((pt, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = h - pad - ((pt.p - min) / (max - min)) * (h - pad * 2);
    return { x, y };
  });

  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const areaPath = `${path} L${coords[coords.length - 1].x},${h} L${coords[0].x},${h} Z`;

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[13px] font-medium text-gray-500">{selectedOutcome.label}</div>
          <div className="text-[40px] font-bold leading-none text-gray-900">
            {selectedOutcome.probability}%
            <span className="ml-2 align-middle text-[13px] font-semibold text-emerald-600">▲ 8 pts</span>
          </div>
        </div>
        <div className="flex gap-1 text-[12px] font-semibold text-gray-400">
          {["1H", "6H", "1D", "1W", "1M", "ALL"].map((r) => (
            <button
              key={r}
              className={`rounded-md px-2 py-1 ${r === "1M" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-40 w-full">
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1652F0" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#1652F0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#chartFill)" />
        <path d={path} fill="none" stroke="#1652F0" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r={4} fill="#1652F0" />
      </svg>
      <div className="flex justify-between text-[11px] text-gray-400">
        <span>{points[0].t}</span>
        <span>{points[Math.floor(points.length / 2)].t}</span>
        <span>{points[points.length - 1].t}</span>
      </div>
    </div>
  );
}
