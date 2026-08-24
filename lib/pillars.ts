export type PillarId = "understand" | "trust" | "participate" | "distribute";

export interface Pillar {
  id: PillarId;
  label: string;
  concept: string;
  wash: string; // background wash
  border: string;
  accent: string; // text/icon accent color
}

export const pillars: Record<PillarId, Pillar> = {
  understand: {
    id: "understand",
    label: "UNDERSTAND",
    concept: "Market Intelligence",
    wash: "#F5F2FF",
    border: "#E4DBFF",
    accent: "#6D3EF2",
  },
  trust: {
    id: "trust",
    label: "TRUST",
    concept: "Integrity Hardening",
    wash: "#FFF4F5",
    border: "#FBDADD",
    accent: "#C21B3D",
  },
  participate: {
    id: "participate",
    label: "PARTICIPATE",
    concept: "Frictionless Access & Automation",
    wash: "#F1F7FF",
    border: "#D7E9FF",
    accent: "#1652F0",
  },
  distribute: {
    id: "distribute",
    label: "DISTRIBUTE",
    concept: "Probability Everywhere",
    wash: "#F5F6FA",
    border: "#E2E4EE",
    accent: "#3D4258",
  },
};
