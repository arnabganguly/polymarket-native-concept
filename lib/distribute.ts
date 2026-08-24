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
