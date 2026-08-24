"use client";

import { useMemo, useState } from "react";
import { Newspaper, X, ChevronLeft, ChevronRight } from "lucide-react";
import { probabilityHistory, selectedOutcome } from "@/lib/market";
import { marketEvents } from "@/lib/intelligence";
import { useExperience } from "@/lib/experience-context";

export function ProbabilityChart() {
  const { mode } = useExperience();
  const enhanced = mode === "enhanced";
  const points = probabilityHistory;
  const w = 640;
  const h = 160;
  const pad = 8;
  const min = 25;
  const max = 65;

  const [activeId, setActiveId] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);

  const coords = points.map((pt, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = h - pad - ((pt.p - min) / (max - min)) * (h - pad * 2);
    return { x, y };
  });

  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const areaPath = `${path} L${coords[coords.length - 1].x},${h} L${coords[0].x},${h} Z`;

  // Attach each event to its matching point on the line.
  type Marker = { evt: (typeof marketEvents)[number]; coord: { x: number; y: number } };
  const eventMarkers: Marker[] = useMemo(
    () =>
      enhanced
        ? marketEvents
            .map((evt) => {
              const idx = points.findIndex((p) => p.t === evt.date);
              if (idx === -1) return null;
              return { evt, coord: coords[idx] };
            })
            .filter((m): m is Marker => m !== null)
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [points, enhanced]
  );

  const activeMarker = eventMarkers.find((m) => m.evt.id === activeId) ?? null;
  const activeIndex = activeMarker ? eventMarkers.indexOf(activeMarker) : -1;

  function open(id: string, pin: boolean) {
    setActiveId(id);
    if (pin) setPinned(true);
  }

  function close() {
    setActiveId(null);
    setPinned(false);
  }

  function step(dir: 1 | -1) {
    if (activeIndex === -1) return;
    const next = eventMarkers[(activeIndex + dir + eventMarkers.length) % eventMarkers.length];
    setActiveId(next.evt.id);
    setPinned(true);
  }

  // Position the card as a left percentage of the chart, clamped so it
  // doesn't run off the edges of the container.
  const cardLeftPct = activeMarker ? Math.min(82, Math.max(18, (activeMarker.coord.x / w) * 100)) : 50;

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

      <div className="relative mt-3">
        <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full overflow-visible">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1652F0" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#1652F0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#chartFill)" />
          <path d={path} fill="none" stroke="#1652F0" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r={4} fill="#1652F0" />

          {/* Event markers (Polymarket+ only) */}
          {enhanced &&
            eventMarkers.map(({ evt, coord }) => {
            const isActive = evt.id === activeId;
            return (
              <g key={evt.id}>
                {isActive && (
                  <line
                    x1={coord.x}
                    y1={coord.y}
                    x2={coord.x}
                    y2={h - pad}
                    stroke="#1652F0"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    opacity={0.35}
                  />
                )}
                {/* Larger invisible hit area for easier hover/click */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={12}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => !pinned && setActiveId(evt.id)}
                  onMouseLeave={() => !pinned && setActiveId(null)}
                  onClick={() => open(evt.id, !(activeId === evt.id && pinned))}
                />
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={isActive ? 6 : 4}
                  fill="#fff"
                  stroke="#1652F0"
                  strokeWidth={isActive ? 2.5 : 1.5}
                  opacity={isActive ? 1 : 0.55}
                  className="pointer-events-none transition-all duration-150"
                />
                {!isActive && (
                  <circle cx={coord.x} cy={coord.y} r={1.6} fill="#1652F0" className="pointer-events-none" opacity={0.7} />
                )}
              </g>
            );
          })}
        </svg>

        {enhanced && activeMarker && (
          <div
            className="absolute top-full z-20 mt-2 w-[280px] -translate-x-1/2 transition-all duration-150"
            style={{ left: `${cardLeftPct}%` }}
          >
            <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-gray-400">
                  <Newspaper size={12} />
                  {activeMarker.evt.date.toUpperCase()}
                </div>
                <button onClick={close} className="text-gray-300 hover:text-gray-500" aria-label="Close">
                  <X size={14} />
                </button>
              </div>

              <div className="mt-1 text-[14px] font-bold text-gray-900">{activeMarker.evt.headline}</div>
              <p className="mt-1 text-[12.5px] leading-snug text-gray-600">{activeMarker.evt.description}</p>

              <div className="mt-2 rounded-lg bg-gray-50 px-2.5 py-2">
                <div className="text-[10.5px] font-bold tracking-wide text-gray-400">MARKET IMPACT</div>
                <div className="text-[13px] font-bold text-gray-900">
                  Probability moved from {activeMarker.evt.fromProbability}%{" "}
                  <span className="text-emerald-600">→ {activeMarker.evt.toProbability}%</span>
                </div>
              </div>

              <div className="mt-2">
                <div className="text-[10.5px] font-bold tracking-wide text-gray-400">WHY IT MATTERED</div>
                <p className="text-[12.5px] text-gray-600">{activeMarker.evt.whyItMattered}</p>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="text-[10.5px] text-gray-400">Source: {activeMarker.evt.source}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => step(-1)}
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Previous event"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => step(1)}
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Next event"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-1 flex justify-between text-[11px] text-gray-400">
        <span>{points[0].t}</span>
        <span>{points[Math.floor(points.length / 2)].t}</span>
        <span>{points[points.length - 1].t}</span>
      </div>

      {enhanced && (
        <div className="mt-2 text-[11px] text-gray-400">
          <Newspaper size={11} className="mr-1 inline -translate-y-px" />
          Hover or tap the markers above for the events behind each move.
        </div>
      )}
    </div>
  );
}
