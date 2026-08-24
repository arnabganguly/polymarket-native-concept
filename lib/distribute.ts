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

// AI AGENT demo — shows a third-party agent (e.g. a portfolio assistant or
// research bot) calling the conceptual intelligence API and turning the
// structured payload into a grounded, sourced answer, rather than a
// hallucinated one. Multiple scenarios show the same API serving very
// different agent intents (trust check, momentum, forward-looking, citation).

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

export const aiAgentScenarios: AgentScenario[] = [
  {
    id: "trust-check",
    askedBy: "Portfolio research agent",
    query: "What's the market saying about a Fed rate cut, and should my client trust it?",
    apiCall: `GET /intelligence/fed-rate-decision
Authorization: Bearer <agent_key>`,
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
    id: "momentum",
    askedBy: "Trading copilot",
    query: "Has sentiment on this market shifted in the last week, and how fast?",
    apiCall: `GET /intelligence/fed-rate-decision?window=7d
Authorization: Bearer <agent_key>`,
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
    id: "forward-looking",
    askedBy: "Portfolio risk monitor",
    query: "What would have to happen for this forecast to flip?",
    apiCall: `GET /intelligence/fed-rate-decision/scenarios
Authorization: Bearer <agent_key>`,
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
    id: "citation",
    askedBy: "Newsroom fact-check agent",
    query: "Can I cite this market's probability in a story, and how should I caveat it?",
    apiCall: `GET /intelligence/fed-rate-decision
Authorization: Bearer <agent_key>`,
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
];
