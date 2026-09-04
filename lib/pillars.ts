export type PillarId = "understand" | "trust" | "participate" | "distribute";

export interface Pillar {
  id: PillarId;
  label: string;
  concept: string;
  wash: string; // background wash
  border: string;
  accent: string; // text/icon accent color
  mapImpact: string; // hypothesis for how this bet moves Monthly Active Participants
  mapDriver: string; // the specific MAP behavior this bet targets
}

export const pillars: Record<PillarId, Pillar> = {
  understand: {
    id: "understand",
    label: "UNDERSTAND",
    concept: "Market Intelligence",
    wash: "#F5F2FF",
    border: "#E4DBFF",
    accent: "#6D3EF2",
    mapDriver: "Qualified intelligence actions (queries, follows, embed click-throughs)",
    mapImpact:
      "Hypothesis: turning a probability into a story converts passive browsers into qualified intelligence actions — projected +15% query/follow rate per market viewed.",
  },
  trust: {
    id: "trust",
    label: "TRUST",
    concept: "Signal Quality",
    wash: "#FFF4F5",
    border: "#FBDADD",
    accent: "#C21B3D",
    mapDriver: "Funded-trade conversion among first-time or non-crypto-native visitors",
    mapImpact:
      "Hypothesis: visible integrity scoring reduces perceived risk for skeptical visitors — projected +10% funded-trade conversion on markets shown as High Confidence.",
  },
  participate: {
    id: "participate",
    label: "PARTICIPATE",
    concept: "Frictionless Trading",
    wash: "#F1F7FF",
    border: "#D7E9FF",
    accent: "#1652F0",
    mapDriver: "Funded trades completed per session, and repeat participation",
    mapImpact:
      "Hypothesis: removing crypto-onboarding friction and automating exits keeps participants funded and returning — projected +20% funded-trade completion, +12% month-2 retention.",
  },
  distribute: {
    id: "distribute",
    label: "DISTRIBUTE",
    concept: "Polymarket Everywhere",
    wash: "#F5F6FA",
    border: "#E2E4EE",
    accent: "#3D4258",
    mapDriver: "New-wallet discovery from outside polymarket.com",
    mapImpact:
      "Hypothesis: meeting users in media, widgets, and AI agents turns discovery into a new top-of-funnel — projected +25% net-new participants sourced outside the core app.",
  },
};
