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
// hallucinated one.
export interface AgentTurn {
  role: "agent" | "system";
  content: string;
}

export const aiAgentQuery = "What's the market saying about a Fed rate cut, and should my client trust it?";

export const aiAgentApiCall = `GET /intelligence/fed-rate-decision
Authorization: Bearer <agent_key>`;

export const aiAgentResponse = {
  probability: 0.57,
  change: "+8 pts (7d)",
  signal_quality: "High Confidence (78/100)",
  drivers: ["Weaker-than-expected employment data", "Cooler CPI print"],
  next_catalyst: "CPI release · Sep 10",
};

export const aiAgentSummary =
  "This market prices a 25 bps Fed rate cut at 57%, up 8 points over the past week. The signal carries a High Confidence rating (78/100) — driven by strong liquidity and broad participation across independent traders — largely on weaker employment data and a cooler CPI print. Watch the Sep 10 CPI release as the next likely catalyst.";
