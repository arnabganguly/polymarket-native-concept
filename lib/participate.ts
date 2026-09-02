// PARTICIPATE — Frictionless Trading + Trading Automation

export const fundingMethods = [
  { id: "apple-pay", label: "Apple Pay" },
  { id: "debit", label: "Debit Card" },
  { id: "usdc", label: "USDC" },
];

export const fundingSteps = [
  "Choose outcome",
  "Choose amount",
  "Funding method",
  "Done",
];

export const automationCapabilities = {
  existing: {
    label: "TARGET SELL",
    tag: "EXISTING",
    description: "Sell YES at 75\u00A2",
    detail:
      "A standing limit order that automatically sells your position once the market reaches your target price.",
  },
  protect: {
    label: "PROTECT POSITION",
    tag: "PROPOSED",
    description: "Exit if probability falls below 35%",
    detail:
      "A downside-protection order that exits your position automatically if the implied probability drops past a threshold you set.",
  },
  alert: {
    label: "SMART ALERT",
    tag: "PROPOSED",
    description: "Notify me if probability moves \u00B110 points",
    detail:
      "Get notified the moment a market you hold moves meaningfully, with a plain-English explanation of why.",
  },
};

export const sampleAlert = {
  title: "MARKET MOVED +10 PTS",
  move: "57% \u2192 67%",
  why: "Weaker employment data increased expectations of a Fed cut.",
  position: "+16%",
};
