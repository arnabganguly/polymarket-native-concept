"use client";

import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { askThisMarketPrompts, upcomingCatalysts, whyItMoved } from "@/lib/intelligence";
import { InfoTooltip } from "@/components/info-tooltip";
import { pillars } from "@/lib/pillars";

type Tab = "why" | "next" | "ask";

export function UnderstandPanel() {
  const p = pillars.understand;
  const [tab, setTab] = useState<Tab>("why");
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <section
      id="section-understand"
      className="rounded-xl border p-4"
      style={{ background: p.wash, borderColor: p.border }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide" style={{ color: p.accent }}>
          <Sparkles size={14} />
          UNDERSTAND · {p.concept.toUpperCase()}
          <InfoTooltip
            accent={p.accent}
            text="Lightweight context about what may be moving this market and what could move it next. Not investment advice, and not a prediction."
          />
        </div>
      </div>

      <div className="mb-3 flex gap-1 text-[12px] font-bold text-gray-500">
        {(
          [
            ["why", "Why did this move?"],
            ["next", "What could move it next?"],
            ["ask", "Ask this market"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-md px-2.5 py-1.5 transition-colors ${
              tab === id ? "bg-white shadow-sm" : "hover:bg-white/60"
            }`}
            style={tab === id ? { color: p.accent } : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "why" && (
        <div className="rounded-lg bg-white/70 p-3 text-[13px] text-gray-700">
          <span className="font-semibold text-gray-900">{whyItMoved.headline}</span>
          <p className="mt-1 text-gray-600">{whyItMoved.detail}</p>
        </div>
      )}

      {tab === "next" && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {upcomingCatalysts.map((c) => (
            <div key={c.label} className="rounded-lg bg-white/70 p-2.5">
              <div className="text-[11px] font-semibold text-gray-400">{c.date}</div>
              <div className="text-[12.5px] font-bold text-gray-900">{c.label}</div>
              <div className="text-[11px] text-gray-500">{c.note}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "ask" && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1.5">
            {askThisMarketPrompts.map((pr) => (
              <button
                key={pr.question}
                onClick={() => setAnswer(pr.answer)}
                className="rounded-full border bg-white px-2.5 py-1 text-[11.5px] font-medium text-gray-600 hover:border-gray-300"
                style={{ borderColor: p.border }}
              >
                {pr.question}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2" style={{ borderColor: p.border }}>
            <input
              readOnly
              placeholder="Ask this market anything…"
              className="flex-1 bg-transparent text-[12.5px] outline-none placeholder:text-gray-400"
            />
            <Send size={14} className="text-gray-400" />
          </div>
          {answer && (
            <div className="rounded-lg bg-white/70 p-3 text-[13px] text-gray-700">{answer}</div>
          )}
        </div>
      )}
    </section>
  );
}
