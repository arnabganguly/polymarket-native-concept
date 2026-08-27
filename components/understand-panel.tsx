"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, Newspaper, X as XIcon, ExternalLink, Landmark } from "lucide-react";
import {
  askThisMarketPrompts,
  audienceFraming,
  personaLinks,
  thinkingPhrases,
  upcomingCatalysts,
  whyItMoved,
  type Audience,
  type ExternalLink as ExternalLinkType,
} from "@/lib/intelligence";
import { InfoTooltip } from "@/components/info-tooltip";
import { MapImpactChip } from "@/components/map-impact-chip";
import { pillars } from "@/lib/pillars";

type Tab = "why" | "next" | "ask";
type AskPhase = "idle" | "thinking" | "streaming" | "done";

// Kept at module scope (not inside the component) so linting can verify
// these impure calls never happen during render — only from the
// askQuestion event handler.
function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

const personaIcon: Record<Audience, React.ReactNode> = {
  trader: <Sparkles size={11} />,
  journalist: <Newspaper size={11} />,
  institution: <Landmark size={11} />,
};

function LinkRow({ links, accent }: { links: ExternalLinkType[]; accent: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {links.map((l) => (
        <a
          key={l.platform}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          title={l.label}
          className="flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-600 hover:border-gray-300 hover:text-gray-900"
          style={{ borderColor: accent + "33" }}
        >
          {l.platform === "Twitter/X" ? <XIcon size={11} /> : <Newspaper size={11} />}
          {l.platform}
          <ExternalLink size={10} className="text-gray-300" />
        </a>
      ))}
    </div>
  );
}

function PersonaBadge({ audience }: { audience: Audience }) {
  const framing = audienceFraming[audience];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
      style={{ background: framing.accent }}
    >
      {personaIcon[audience]}
      Answering as {framing.label}
    </span>
  );
}

export function UnderstandPanel() {
  const p = pillars.understand;
  const [audience, setAudience] = useState<Audience>("trader");
  const personaAccent = audienceFraming[audience].accent;
  // Always land on "Why did this move?" — it's the most orienting answer for
  // a first-time viewer. Switching audience below can still re-emphasize a
  // different tab intentionally.
  const [tab, setTab] = useState<Tab>("why");
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  const [askPhase, setAskPhase] = useState<AskPhase>("idle");
  const [displayedText, setDisplayedText] = useState("");
  const [thinkingPhraseIdx, setThinkingPhraseIdx] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [openCatalyst, setOpenCatalyst] = useState<string | null>(null);

  function clearTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  useEffect(() => clearTimers, []);

  function askQuestion(i: number, forAudience: Audience) {
    clearTimers();
    setAnswerIdx(i);
    setAskPhase("thinking");
    setDisplayedText("");
    setThinkingPhraseIdx(0);

    // Cycle a few realistic "thinking" phrases before the answer streams in.
    const phraseInterval = setInterval(() => {
      setThinkingPhraseIdx((v) => (v + 1) % thinkingPhrases.length);
    }, 480);
    timersRef.current.push(phraseInterval as unknown as ReturnType<typeof setTimeout>);

    const thinkFor = randomBetween(1400, 1900);
    const startStreaming = setTimeout(() => {
      clearInterval(phraseInterval);
      setAskPhase("streaming");

      const words = askThisMarketPrompts[i].answers[forAudience].text.split(" ");
      let idx = 0;
      const revealNext = () => {
        idx += 1;
        setDisplayedText(words.slice(0, idx).join(" "));
        if (idx < words.length) {
          const delay = randomBetween(20, 55);
          const t = setTimeout(revealNext, delay);
          timersRef.current.push(t);
        } else {
          setAskPhase("done");
        }
      };
      revealNext();
    }, thinkFor);
    timersRef.current.push(startStreaming);
  }

  function selectAudience(a: Audience) {
    // Switching persona mid-answer would otherwise show stale text under a
    // new persona badge, so reset the ask flow along with the tab emphasis.
    clearTimers();
    setAskPhase("idle");
    setAnswerIdx(null);
    setDisplayedText("");
    setAudience(a);
    setTab(audienceFraming[a].emphasize);
  }

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
            text="Lightweight context about what may be moving this market and what could move it next, plus real links out to social and news coverage so you can dig further. Not investment advice, and not a prediction."
          />
        </div>
      </div>

      <MapImpactChip accent={p.accent} driver={p.mapDriver} impact={p.mapImpact} />

      <div className="mb-3">
        <div className="mb-1.5 text-[10.5px] font-bold tracking-wide text-gray-400">VIEWING AS</div>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(audienceFraming) as Audience[]).map((a) => {
            const framing = audienceFraming[a];
            const active = audience === a;
            return (
              <button
                key={a}
                onClick={() => selectAudience(a)}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-bold transition-colors ${
                  active ? "text-white" : "bg-white/70 text-gray-500 hover:border-gray-300"
                }`}
                style={active ? { background: framing.accent, borderColor: framing.accent } : { borderColor: p.border }}
              >
                {personaIcon[a]}
                {framing.label}
              </button>
            );
          })}
        </div>
        <p className="mt-1.5 text-[11.5px] leading-snug text-gray-500">{audienceFraming[audience].tagline}</p>
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
            style={tab === id ? { color: personaAccent } : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "why" && (
        <div className="flex flex-col gap-3">
          <div
            className="rounded-lg border-l-[3px] bg-white/70 p-3 text-[13px] text-gray-700"
            style={{ borderLeftColor: personaAccent }}
          >
            <div className="mb-1.5">
              <PersonaBadge audience={audience} />
            </div>
            <span className="font-semibold text-gray-900">{whyItMoved.headline}</span>
            <p className="mt-1 text-gray-600">{whyItMoved.perAudience[audience].detail}</p>
          </div>

          <div className="rounded-lg bg-white/70 p-3">
            <div className="mb-1.5 text-[11px] font-bold tracking-wide text-gray-400">WHAT PEOPLE ARE SAYING</div>
            <ul className="flex flex-col gap-1.5">
              {whyItMoved.perAudience[audience].commentary.map((c) => (
                <li key={c} className="flex gap-1.5 text-[12.5px] text-gray-600">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: personaAccent }} />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-2.5 text-[10.5px] text-gray-400">{audienceFraming[audience].linkIntro}</div>
            <div className="mt-1.5">
              <LinkRow links={personaLinks(whyItMoved.query, audience)} accent={personaAccent} />
            </div>
          </div>
        </div>
      )}

      {tab === "next" && (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {upcomingCatalysts.map((c) => {
              const isOpen = openCatalyst === c.label;
              return (
                <button
                  key={c.label}
                  onClick={() => setOpenCatalyst(isOpen ? null : c.label)}
                  className={`rounded-lg bg-white/70 p-2.5 text-left transition-colors ${
                    isOpen ? "ring-1" : "hover:bg-white"
                  }`}
                  style={isOpen ? { boxShadow: `0 0 0 1px ${personaAccent}` } : undefined}
                >
                  <div className="text-[11px] font-semibold text-gray-400">{c.date}</div>
                  <div className="text-[12.5px] font-bold text-gray-900">{c.label}</div>
                  <div className="text-[11px] text-gray-500">{c.note}</div>
                </button>
              );
            })}
          </div>

          {openCatalyst && (
            <div className="rounded-lg border-l-[3px] bg-white/70 p-3" style={{ borderLeftColor: personaAccent }}>
              {(() => {
                const c = upcomingCatalysts.find((x) => x.label === openCatalyst)!;
                return (
                  <>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="text-[11px] font-bold tracking-wide text-gray-400">
                        {c.date.toUpperCase()} · WHAT TO WATCH
                      </div>
                      <PersonaBadge audience={audience} />
                    </div>
                    <p className="mt-1 text-[12.5px] text-gray-700">{c.perAudience[audience]}</p>
                    <div className="mt-2.5 text-[10.5px] text-gray-400">{audienceFraming[audience].linkIntro}</div>
                    <div className="mt-1.5">
                      <LinkRow links={personaLinks(c.query, audience)} accent={personaAccent} />
                    </div>
                  </>
                );
              })()}
            </div>
          )}
          {!openCatalyst && (
            <div className="px-0.5 text-[11px] text-gray-400">Tap a date above to see what to watch for and research it further.</div>
          )}
        </div>
      )}

      {tab === "ask" && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1.5">
            {askThisMarketPrompts.map((pr, i) => (
              <button
                key={pr.question}
                onClick={() => askQuestion(i, audience)}
                disabled={askPhase === "thinking" || askPhase === "streaming"}
                className={`rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  answerIdx === i ? "text-white" : "bg-white text-gray-600 hover:border-gray-300"
                }`}
                style={answerIdx === i ? { background: personaAccent, borderColor: personaAccent } : { borderColor: p.border }}
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

          {askPhase === "thinking" && (
            <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-white/70 px-3 py-2.5">
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
                  style={{ background: personaAccent }}
                />
                <Sparkles size={13} className="relative animate-pulse" style={{ color: personaAccent }} />
              </span>
              <span className="text-[12px] font-medium text-gray-500 transition-opacity duration-300">
                {thinkingPhrases[thinkingPhraseIdx]}
              </span>
              <span className="ml-1 text-[10.5px] font-semibold text-gray-400">
                as {audienceFraming[audience].label}
              </span>
              <span className="ml-auto flex gap-0.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:300ms]" />
              </span>
            </div>
          )}

          {(askPhase === "streaming" || askPhase === "done") && answerIdx !== null && (
            <div className="rounded-lg border-l-[3px] bg-white/70 p-3" style={{ borderLeftColor: personaAccent }}>
              <div className="mb-1.5">
                <PersonaBadge audience={audience} />
              </div>
              <p className="text-[13px] leading-relaxed text-gray-700">
                {displayedText}
                {askPhase === "streaming" && (
                  <span
                    className="ml-0.5 inline-block h-[13px] w-[2px] animate-pulse align-middle"
                    style={{ background: personaAccent }}
                  />
                )}
              </p>
              {askPhase === "done" && (
                <>
                  <div className="mt-2.5 text-[10.5px] text-gray-400">{audienceFraming[audience].linkIntro}</div>
                  <div className="mt-1.5">
                    <LinkRow
                      links={personaLinks(askThisMarketPrompts[answerIdx].answers[audience].query, audience)}
                      accent={personaAccent}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
