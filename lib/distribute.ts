// DISTRIBUTE — Probability Everywhere (proposed conceptual API + widget)

export const todayApiResponse = `GET /markets/fed-rate-decision

{
  "probability": 0.57
}`;

export const enhancedApiResponse = `GET /intelligence/fed-rate-decision

{
  "probability": 0.57,
  "change": +0.08,
  "drivers": "employment_data",
  "signal_quality": "strong",
  "next_catalyst": "CPI"
}`;

export const distributionChannels = [
  { label: "Media", note: "Live probability tickers" },
  { label: "Embeddable widgets", note: "Drop-in market cards" },
  { label: "APIs", note: "Existing today" },
  { label: "Financial workflows", note: "Terminals & dashboards" },
  { label: "AI assistants", note: "Conversational answers" },
  { label: "AI agents", note: "Automated decisioning" },
];

// Cycled while the agent "thinks", before it starts streaming its answer —
// mirrors the Ask-this-market thinking phrases so both LLM demos feel
// consistent.
export const agentThinkingPhrases = [
  "Querying /intelligence endpoint…",
  "Weighing signal quality…",
  "Cross-checking drivers…",
  "Drafting grounded answer…",
];

// TRACEBACK — every surface the intelligence reaches (widget, AI answer)
// carries a link back to the live market on Polymarket, turning passive
// reach into a direct acquisition funnel instead of a dead end.
export const tracebackHref = "#section-market";
export const tracebackLabel = "View on Polymarket";

// AI AGENT demo — shows a third-party agent (e.g. a portfolio assistant or
// research bot) calling the conceptual intelligence API and turning the
// structured payload into a grounded, sourced answer, rather than a
// hallucinated one. The same API and the same market serve three very
// different personas — trader, journalist, institution/risk team — and both
// the question set and the agent's answers change based on who is asking,
// to make the point that this is context-aware reasoning, not a canned
// script.

export interface AgentResponsePayload {
  probability: number;
  change: string;
  signal_quality: string;
  drivers: string[];
  next_catalyst: string;
}

export interface AgentScenario {
  id: string;
  askedBy: string;
  query: string;
  apiCall: string;
  response: AgentResponsePayload;
  summary: string;
}

export interface AgentPersona {
  id: string;
  label: string;
  role: string;
  description: string;
  // Matches lib/intelligence.ts's audienceFraming accents (trader/journalist/
  // institution) so a persona's color means the same thing everywhere in
  // the deck, not just within this panel.
  accent: string;
  wash: string;
  scenarios: AgentScenario[];
}

export const aiAgentPersonas: AgentPersona[] = [
  {
    id: "trader",
    label: "Trader",
    role: "Trading copilot",
    description: "Wants speed and edge: how fast is this moving, and is there a trade in it right now.",
    accent: "#1652F0",
    wash: "#EEF3FF",
    scenarios: [
      {
        id: "trader-momentum",
        askedBy: "Trading copilot",
        query: "Has sentiment on this market shifted in the last week, and how fast?",
        apiCall: `GET /intelligence/fed-rate-decision?window=7d
Authorization: ******`,
        response: {
          probability: 0.57,
          change: "+8 pts (7d)",
          signal_quality: "High Confidence (78/100)",
          drivers: ["Jobs data revised sharply lower on Aug 21", "Fed Chair remarks read as dovish on Aug 18"],
          next_catalyst: "FOMC meeting · Sep 17",
        },
        summary:
          "Yes — probability rose 8 points over 3 sessions, moving fastest after the Aug 21 jobs revision. Confidence stayed High (78/100) throughout the move, meaning the shift reflects broad repricing, not one large trader. The FOMC meeting on Sep 17 is the scheduled event this move is ultimately pricing toward.",
      },
      {
        id: "trader-entry",
        askedBy: "Trading copilot",
        query: "Is 57% still a good entry, or has the edge already been priced in?",
        apiCall: `GET /intelligence/fed-rate-decision/entry-check
Authorization: ******`,
        response: {
          probability: 0.57,
          change: "+8 pts (7d)",
          signal_quality: "High Confidence (78/100)",
          drivers: ["Move already absorbed most of the Aug 21 jobs surprise", "Spread remains tight, liquidity deep"],
          next_catalyst: "CPI release · Sep 10",
        },
        summary:
          "Most of the near-term edge from the jobs revision looks already priced in — the move has slowed and spreads stayed tight, which is a High Confidence signal (78/100) of an efficient market, not a stale one. The next real re-pricing opportunity is likely the Sep 10 CPI print, not today.",
      },
      {
        id: "trader-compare",
        askedBy: "Trading copilot",
        query: "How does this compare to where Fed funds futures are pricing the same cut?",
        apiCall: `GET /intelligence/fed-rate-decision/compare?ref=fed_funds_futures
Authorization: ******`,
        response: {
          probability: 0.57,
          change: "+8 pts (7d)",
          signal_quality: "High Confidence (78/100)",
          drivers: ["Within 3 pts of CME FedWatch implied odds", "Both markets moved on the same Aug 21 print"],
          next_catalyst: "FOMC meeting · Sep 17",
        },
        summary:
          "It's tracking closely — this market's 57% sits within 3 points of CME FedWatch implied odds, and both moved off the same Aug 21 jobs print. Confidence is High (78/100), so the small gap looks like normal cross-venue noise, not a divergence worth trading against.",
      },
    ],
  },
  {
    id: "journalist",
    label: "Journalist",
    role: "Newsroom fact-check agent",
    description: "Wants an accurate, citable, well-caveated line for a story — not raw numbers.",
    accent: "#B45309",
    wash: "#FEF6EA",
    scenarios: [
      {
        id: "journalist-citation",
        askedBy: "Newsroom fact-check agent",
        query: "Can I cite this market's probability in a story, and how should I caveat it?",
        apiCall: `GET /intelligence/fed-rate-decision
Authorization: ******`,
        response: {
          probability: 0.57,
          change: "+8 pts (7d)",
          signal_quality: "High Confidence (78/100)",
          drivers: ["Broad participation across independent traders", "Deep liquidity, tight spread"],
          next_catalyst: "CPI release · Sep 10",
        },
        summary:
          "Yes, with a caveat: this reflects a 57% market-implied probability, backed by a High Confidence signal (78/100) from deep liquidity and broad trader participation — not a certified forecast. Attribute it as \u201cmarket-implied odds,\u201d note the confidence rating, and flag the Sep 10 CPI release as the next point it could move.",
      },
      {
        id: "journalist-why",
        askedBy: "Newsroom fact-check agent",
        query: "In one sentence I can quote, why did the odds jump this week?",
        apiCall: `GET /intelligence/fed-rate-decision/explain
Authorization: ******`,
        response: {
          probability: 0.57,
          change: "+8 pts (7d)",
          signal_quality: "High Confidence (78/100)",
          drivers: ["Weaker-than-expected employment data on Aug 21", "Cooler CPI print"],
          next_catalyst: "CPI release · Sep 10",
        },
        summary:
          "Quotable line: \u201cTraders raised the odds of a Fed rate cut to 57%, up 8 points this week, after weaker-than-expected employment data and a cooler CPI print.\u201d The move carries a High Confidence rating (78/100), meaning it reflects broad trader agreement, not a single outlier bet.",
      },
      {
        id: "journalist-context",
        askedBy: "Newsroom fact-check agent",
        query: "Is this move unusual, or normal volatility for a market like this?",
        apiCall: `GET /intelligence/fed-rate-decision/context
Authorization: ******`,
        response: {
          probability: 0.57,
          change: "+8 pts (7d)",
          signal_quality: "High Confidence (78/100)",
          drivers: ["8-pt move is larger than this market's typical weekly range", "Driven by one scheduled data release, not rumor"],
          next_catalyst: "FOMC meeting · Sep 17",
        },
        summary:
          "It's a bigger move than this market typically sees in a week, but it's traceable to one scheduled release (the Aug 21 jobs data), not speculation — that's what keeps the Confidence rating High (78/100). Fair to describe it as a notable, data-driven repricing ahead of the Sep 17 FOMC meeting.",
      },
    ],
  },
  {
    id: "institution",
    label: "Institution / Risk",
    role: "Portfolio risk monitor",
    description: "Wants trust, exposure, and downside scenarios before acting on the signal.",
    accent: "#4338CA",
    wash: "#F0EFFD",
    scenarios: [
      {
        id: "institution-trust",
        askedBy: "Portfolio risk monitor",
        query: "What's the market saying about a Fed rate cut, and should my client trust it?",
        apiCall: `GET /intelligence/fed-rate-decision
Authorization: ******`,
        response: {
          probability: 0.57,
          change: "+8 pts (7d)",
          signal_quality: "High Confidence (78/100)",
          drivers: ["Weaker-than-expected employment data", "Cooler CPI print"],
          next_catalyst: "CPI release · Sep 10",
        },
        summary:
          "This market prices a 25 bps Fed rate cut at 57%, up 8 points over the past week. The signal carries a High Confidence rating (78/100) — driven by strong liquidity and broad participation across independent traders — largely on weaker employment data and a cooler CPI print. Watch the Sep 10 CPI release as the next likely catalyst.",
      },
      {
        id: "institution-flip",
        askedBy: "Portfolio risk monitor",
        query: "What would have to happen for this forecast to flip?",
        apiCall: `GET /intelligence/fed-rate-decision/scenarios
Authorization: ******`,
        response: {
          probability: 0.57,
          change: "+8 pts (7d)",
          signal_quality: "High Confidence (78/100)",
          drivers: ["A hotter-than-expected CPI print", "Hawkish Fed commentary before Sep 17"],
          next_catalyst: "CPI release · Sep 10",
        },
        summary:
          "A hotter-than-expected CPI print on Sep 10, or hawkish Fed commentary before the Sep 17 meeting, would be the most likely catalysts to push probability back toward \u201cno change.\u201d Confidence is High (78/100) today, so a reversal would need to show up in participation and liquidity too, not just the headline number.",
      },
      {
        id: "institution-exposure",
        askedBy: "Portfolio risk monitor",
        query: "Should we flag this position for hedging before the next FOMC meeting?",
        apiCall: `GET /intelligence/fed-rate-decision/risk-flag?event=FOMC
Authorization: ******`,
        response: {
          probability: 0.57,
          change: "+8 pts (7d)",
          signal_quality: "High Confidence (78/100)",
          drivers: ["8-pt swing in 7 days shows realized event-risk, not noise", "CPI print on Sep 10 precedes FOMC on Sep 17"],
          next_catalyst: "CPI release · Sep 10",
        },
        summary:
          "Worth flagging — an 8-point move in a week is real event-risk, not noise, and it's backed by a High Confidence rating (78/100), meaning the exposure is broadly held, not a thin, illiquid book. Recommend reviewing hedges ahead of the Sep 10 CPI print, since that lands before the Sep 17 FOMC decision.",
      },
    ],
  },
];

// Flattened list kept for any code that still expects a single scenario
// array (e.g. quick lookups by id across all personas).
export const aiAgentScenarios: AgentScenario[] = aiAgentPersonas.flatMap((p) => p.scenarios);
