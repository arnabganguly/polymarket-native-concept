"use client";

import { useState } from "react";
import { Zap, ShieldAlert, BellRing } from "lucide-react";
import { automationCapabilities, fundingMethods, oneClickSteps, sampleAlert } from "@/lib/participate";
import { InfoTooltip } from "@/components/info-tooltip";
import { pillars } from "@/lib/pillars";

export function ParticipatePanel() {
  const p = pillars.participate;
  const [funding, setFunding] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <section
      id="section-participate"
      className="rounded-xl border p-4"
      style={{ background: p.wash, borderColor: p.border }}
    >
      <div className="mb-3 flex items-center gap-1.5 text-[11px] font-bold tracking-wide" style={{ color: p.accent }}>
        <Zap size={14} />
        PARTICIPATE · {p.concept.toUpperCase()}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* SUB SECTION A: One-Click Access */}
        <div className="rounded-lg border bg-white/70 p-3.5" style={{ borderColor: p.border }}>
          <div className="mb-2 flex items-center gap-1.5 text-[12.5px] font-bold text-gray-900">
            One-Click Access
            <InfoTooltip
              accent={p.accent}
              text="A simplified path from understanding a market to acting on it: choose an outcome, choose an amount, pick a funding method, done. Reduces friction, not investment risk."
            />
          </div>
          <div className="mb-3 flex items-center gap-1 text-[10.5px] font-semibold text-gray-400">
            {oneClickSteps.map((s, i) => (
              <span key={s} className="flex items-center gap-1">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">{s}</span>
                {i < oneClickSteps.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>
          <div className="mb-2 text-[11px] font-semibold text-gray-500">Fund with</div>
          <div className="flex gap-1.5">
            {fundingMethods.map((f) => (
              <button
                key={f.id}
                onClick={() => setFunding(f.id)}
                className={`rounded-lg border px-3 py-2 text-[12px] font-bold transition-colors ${
                  funding === f.id
                    ? "border-[#1652F0] bg-[#1652F0]/10 text-[#1652F0]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {funding && (
            <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-[12px] font-semibold text-emerald-700">
              Ready to buy in one tap with {fundingMethods.find((f) => f.id === funding)?.label}.
            </div>
          )}
        </div>

        {/* SUB SECTION B: Better Trading Automation */}
        <div className="rounded-lg border bg-white/70 p-3.5" style={{ borderColor: p.border }}>
          <div className="mb-2 flex items-center gap-1.5 text-[12.5px] font-bold text-gray-900">
            Better Trading Automation
            <InfoTooltip
              accent={p.accent}
              text="Ways to manage a position automatically as probabilities evolve — some available today, some proposed."
            />
          </div>

          <div className="flex flex-col gap-2">
            <AutomationRow
              icon={<Zap size={13} />}
              label={automationCapabilities.existing.label}
              tag="EXISTING"
              description={automationCapabilities.existing.description}
            />
            <AutomationRow
              icon={<ShieldAlert size={13} />}
              label={automationCapabilities.protect.label}
              tag="PROPOSED"
              description={automationCapabilities.protect.description}
              accent={p.accent}
            />
            <AutomationRow
              icon={<BellRing size={13} />}
              label={automationCapabilities.alert.label}
              tag="PROPOSED"
              description={automationCapabilities.alert.description}
              accent={p.accent}
              onClick={() => setShowAlert((v) => !v)}
            />
          </div>

          {showAlert && (
            <div className="mt-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <div className="text-[11px] font-extrabold tracking-wide text-gray-900">{sampleAlert.title}</div>
              <div className="mt-1 text-[15px] font-bold text-gray-900">{sampleAlert.move}</div>
              <div className="mt-2 text-[10.5px] font-bold text-gray-400">WHY</div>
              <div className="text-[12px] text-gray-600">{sampleAlert.why}</div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] font-bold text-gray-400">YOUR POSITION</div>
                  <div className="text-[13px] font-bold text-emerald-600">{sampleAlert.position}</div>
                </div>
                <button className="rounded-md bg-gray-900 px-2.5 py-1 text-[11px] font-bold text-white">
                  View intelligence
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function AutomationRow({
  icon,
  label,
  tag,
  description,
  accent,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  tag: "EXISTING" | "PROPOSED";
  description: string;
  accent?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between rounded-lg border border-gray-100 px-2.5 py-2 text-left hover:border-gray-200"
    >
      <div className="flex items-center gap-2">
        <span className="text-gray-500">{icon}</span>
        <div>
          <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-gray-900">
            {label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                tag === "EXISTING" ? "bg-gray-100 text-gray-500" : "text-white"
              }`}
              style={tag === "PROPOSED" ? { background: accent } : undefined}
            >
              {tag}
            </span>
          </div>
          <div className="text-[11px] text-gray-500">{description}</div>
        </div>
      </div>
    </button>
  );
}
