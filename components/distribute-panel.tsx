"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, ChevronDown, Radio, RotateCcw, Send, Sparkles, SquareArrowOutUpRight } from "lucide-react";
import {
  agentThinkingPhrases,
  aiAgentPersonas,
  distributionChannels,
  enhancedApiResponse,
  todayApiResponse,
  tracebackHref,
  tracebackLabel,
} from "@/lib/distribute";
import { InfoTooltip } from "@/components/info-tooltip";
import { MapImpactChip } from "@/components/map-impact-chip";
import { pillars } from "@/lib/pillars";
import { selectedOutcome } from "@/lib/market";

type AgentPhase = "idle" | "thinking" | "streaming" | "answered";

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function DistributePanel() {
  const p = pillars.distribute;
  const [personaId, setPersonaId] = useState(aiAgentPersonas[0].id);
  const [scenarioId, setScenarioId] = useState(aiAgentPersonas[0].scenarios[0].id);
  const [phase, setPhase] = useState<AgentPhase>("idle");
  const [showRaw, setShowRaw] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [thinkingPhraseIdx, setThinkingPhraseIdx] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const persona = aiAgentPersonas.find((p) => p.id === personaId)!;
  const scenario = persona.scenarios.find((s) => s.id === scenarioId)!;

  function clearTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  useEffect(() => clearTimers, []);

  const runQuery = () => {
    clearTimers();
    setPhase("thinking");
    setDisplayedText("");
    setThinkingPhraseIdx(0);

    // Cycle a couple of realistic "thinking" phrases before streaming, same
    // pattern as the Ask-this-market LLM demo.
    const phraseInterval = setInterval(() => {
      setThinkingPhraseIdx((v) => (v + 1) % agentThinkingPhrases.length);
    }, 420);
    timersRef.current.push(phraseInterval as unknown as ReturnType<typeof setTimeout>);

    const thinkFor = randomBetween(1100, 1500);
    const startStreaming = setTimeout(() => {
      clearInterval(phraseInterval);
      setPhase("streaming");

      const words = scenario.summary.split(" ");
      let idx = 0;
      const revealNext = () => {
        idx += 1;
        setDisplayedText(words.slice(0, idx).join(" "));
        if (idx < words.length) {
          const t = setTimeout(revealNext, randomBetween(18, 48));
          timersRef.current.push(t);
        } else {
          setPhase("answered");
        }
      };
      revealNext();
    }, thinkFor);
    timersRef.current.push(startStreaming);
  };

  const selectScenario = (id: string) => {
    clearTimers();
    setScenarioId(id);
    setShowRaw(false);
    setDisplayedText("");
    setPhase("idle");
  };

  const selectPersona = (id: string) => {
    clearTimers();
    const next = aiAgentPersonas.find((p) => p.id === id)!;
    setPersonaId(id);
    setScenarioId(next.scenarios[0].id);
    setShowRaw(false);
    setDisplayedText("");
    setPhase("idle");
  };

  const replay = () => {
    clearTimers();
    setShowRaw(false);
    setPhase("idle");
    setDisplayedText("");
    setTimeout(runQuery, 50);
  };

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

      <MapImpactChip accent={p.accent} driver={p.mapDriver} impact={p.mapImpact} />

      {/* SOURCE: the one API, extended with interpretive fields */}
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

      {/* CONNECTOR: makes explicit that both consumers below share one source */}
      <div className="my-3 flex items-center gap-2 px-1">
        <div className="h-px flex-1" style={{ background: p.border }} />
        <span className="text-[10.5px] font-bold tracking-wide text-gray-400">
          ONE API · TWO KINDS OF CONSUMERS
        </span>
        <div className="h-px flex-1" style={{ background: p.border }} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* CONSUMER 1: humans, via a widget */}
        <div className="rounded-lg border bg-white/70 p-3.5" style={{ borderColor: p.border }}>
          <div className="mb-2 flex items-center gap-1.5 text-[12px] font-bold text-gray-900">
            Embeddable widget
            <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-500">
              FOR HUMANS
            </span>
          </div>
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
            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
              <span className="text-[10.5px] text-gray-400">Powered by Polymarket+ Intelligence · Conceptual</span>
              <a
                href={tracebackHref}
                className="flex shrink-0 items-center gap-1 text-[10.5px] font-bold hover:underline"
                style={{ color: p.accent }}
              >
                {tracebackLabel}
                <SquareArrowOutUpRight size={10} />
              </a>
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

        {/* CONSUMER 2: AI agents, via structured reasoning, not a UI at all */}
        <div
          className="rounded-lg border p-3.5"
          style={{ borderColor: p.accent + "44", background: "linear-gradient(180deg, #ffffff 0%, " + p.wash + " 100%)" }}
        >
          <div className="mb-2 flex items-center gap-1.5 text-[12px] font-bold text-gray-900">
            <Sparkles size={13} style={{ color: p.accent }} />
            AI agent
            <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: p.accent }}>
              FOR AGENTS
            </span>
            <InfoTooltip
              accent={p.accent}
              text="No UI at all — a third-party agent calls the same intelligence API and reasons over the structured fields (confidence, drivers, catalyst). The same source data is reasoned over differently depending on who's asking and why."
            />
          </div>

          <div className="flex flex-col gap-2.5">
            {/* persona switcher — same market, same API, different customer context */}
            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                Who's asking
              </div>
              <div className="flex flex-wrap gap-1.5">
                {aiAgentPersonas.map((persona_) => (
                  <button
                    key={persona_.id}
                    onClick={() => selectPersona(persona_.id)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-bold transition-colors ${
                      personaId === persona_.id ? "text-white" : "bg-white text-gray-600 hover:border-gray-300"
                    }`}
                    style={
                      personaId === persona_.id
                        ? { background: "#111827", borderColor: "#111827" }
                        : { borderColor: p.border }
                    }
                  >
                    {persona_.label}
                  </button>
                ))}
              </div>
              <div className="mt-1 text-[10.5px] italic text-gray-400">{persona.description}</div>
            </div>

            {/* question picker — same API, persona-specific questions this agent would ask */}
            <div className="flex flex-wrap gap-1.5">
              {persona.scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => selectScenario(s.id)}
                  className={`rounded-full border px-2.5 py-1 text-[10.5px] font-semibold transition-colors ${
                    scenarioId === s.id ? "text-white" : "bg-white text-gray-500 hover:border-gray-300"
                  }`}
                  style={
                    scenarioId === s.id
                      ? { background: p.accent, borderColor: p.accent }
                      : { borderColor: p.border }
                  }
                >
                  {s.query.length > 38 ? s.query.slice(0, 36) + "…" : s.query}
                </button>
              ))}
            </div>

            {/* user turn */}
            <div className="flex flex-col items-end gap-1 self-end">
              <span className="text-[10px] font-semibold text-gray-400">{scenario.askedBy}</span>
              <div className="max-w-[90%] rounded-2xl rounded-tr-sm bg-gray-900 px-3 py-2 text-[12.5px] text-white shadow-sm">
                {scenario.query}
              </div>
            </div>

            {phase === "idle" && (
              <button
                onClick={runQuery}
                className="flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-[11px] font-bold text-white shadow-sm"
                style={{ background: p.accent }}
              >
                <Send size={11} /> Let the agent answer
              </button>
            )}

            {phase === "thinking" && (
              <div className="flex items-center gap-2 self-start rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-3 py-2 text-[11.5px] text-gray-400 shadow-sm">
                <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
                    style={{ background: p.accent }}
                  />
                  <Bot size={13} className="relative" style={{ color: p.accent }} />
                </span>
                <span className="transition-opacity duration-300">{agentThinkingPhrases[thinkingPhraseIdx]}</span>
                <span className="ml-auto flex gap-0.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:300ms]" />
                </span>
              </div>
            )}

            {(phase === "streaming" || phase === "answered") && (
              <>
                {/* agent turn — streams in word by word, like a real LLM response */}
                <div className="flex items-start gap-2 self-start">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white" style={{ background: p.accent }}>
                    <Bot size={12} />
                  </div>
                  <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-3 py-2 text-[12.5px] leading-relaxed text-gray-700 shadow-sm">
                    {displayedText}
                    {phase === "streaming" && (
                      <span
                        className="ml-0.5 inline-block h-[13px] w-[2px] animate-pulse align-middle"
                        style={{ background: p.accent }}
                      />
                    )}
                  </div>
                </div>

                {phase === "answered" && (
                  <>
                    {/* grounding chips — same fields as the API card, shown as evidence not a JSON dump */}
                    <div className="ml-8 flex flex-wrap gap-1.5">
                      <GroundingChip label={`${Math.round(scenario.response.probability * 100)}% probability`} accent={p.accent} />
                      <GroundingChip label={scenario.response.change} accent={p.accent} />
                      <GroundingChip label={scenario.response.signal_quality} accent={p.accent} />
                      <GroundingChip label={`Next: ${scenario.response.next_catalyst}`} accent={p.accent} />
                    </div>

                    <div className="ml-8">
                      <a
                        href={tracebackHref}
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-bold text-white shadow-sm"
                        style={{ background: p.accent }}
                      >
                        {tracebackLabel}
                        <SquareArrowOutUpRight size={10} />
                      </a>
                    </div>

                    <div className="ml-8 flex items-center gap-3">
                      <button
                        onClick={() => setShowRaw((v) => !v)}
                        className="flex items-center gap-1 text-[10.5px] font-semibold text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown size={12} className={`transition-transform ${showRaw ? "rotate-180" : ""}`} />
                        {showRaw ? "Hide" : "View"} the raw API call behind this answer
                      </button>
                      <button
                        onClick={replay}
                        className="flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10.5px] font-bold text-gray-600 hover:border-gray-300"
                        style={{ borderColor: p.border }}
                      >
                        <RotateCcw size={11} /> Replay
                      </button>
                    </div>

                    {showRaw && (
                      <pre className="ml-8 whitespace-pre-wrap rounded-md bg-gray-900 p-2.5 text-[10px] leading-relaxed text-emerald-300">
                        {scenario.apiCall}
                        {"\n\n"}
                        {JSON.stringify(scenario.response, null, 2)}
                      </pre>
                    )}

                    <div className="ml-8 text-[10.5px] italic text-gray-400">
                      Same payload as the API card above — grounded, not generated.
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function GroundingChip({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="rounded-full border bg-white px-2 py-0.5 text-[10.5px] font-semibold text-gray-700"
      style={{ borderColor: accent + "44" }}
    >
      {label}
    </span>
  );
}
