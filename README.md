# Polymarket+ — Product Concept Prototype

A high-fidelity, Polymarket-inspired product concept prototype built for a
Coinbase Roundtable Research interview. It starts from Polymarket's existing
market page UX and extends it with four proposed strategic pillars —
**Understand, Trust, Participate, Distribute** — designed to feel like a
native evolution of the product rather than a bolted-on research tool.

> **PRODUCT CONCEPT PROTOTYPE** · Not affiliated with or endorsed by
> Polymarket. All market data is fictional demo data.

This is a **separate, standalone project** from any other Polymarket-themed
prototype in this workspace. It has its own repository, its own GitHub Pages
deployment, and does not share code, git history, or a deployment target with
any other project.

## What this is

- A single fictional demo market: *"What will the Fed do at its next
  meeting?"* with mocked, clearly-labeled outcome probabilities.
- A **CURRENT EXPERIENCE / POLYMARKET+** toggle in the header that reveals the
  baseline product vs. the four proposed pillars.
- A **Presentation Mode** (bottom-center control) that steps through a
  90-second demo narrative: Current Market → Understand → Trust →
  Participate → Distribute → Vision.
- A `/vision` page summarizing the growth loop and the
  `GOAL: 10X MONTHLY ACTIVE PARTICIPANTS` target.

## Existing vs. proposed functionality

| Feature | Status |
|---|---|
| Market title, chart, outcomes, Yes/No pricing | Existing |
| Buy/Sell, Market/Limit orders | Existing |
| Target Sell (limit order) | Existing |
| Market APIs | Existing |
| Why did this move / What could move it next / Ask this market | Proposed |
| Signal Quality (Trust) indicator | Proposed |
| One-Click Access (Apple Pay / Debit / USDC) | Proposed |
| Protect Position (stop-loss style) | Proposed |
| Smart Alerts with "explain the move" | Proposed |
| Conceptual Intelligence API | Proposed |
| Embeddable widget | Proposed |

## Tech stack

Next.js (App Router, static export) + TypeScript + Tailwind CSS v4. No
backend, no live APIs, no real payments or authentication — all data is
deterministic and mocked so the demo works reliably offline once loaded.

## Local development

```bash
npm install
npm run dev
```

## Static export / GitHub Pages build

```bash
npm run build:pages   # builds to ./out with the /polymarket-native-concept basePath
```

Deployed automatically via GitHub Actions (`.github/workflows/deploy-pages.yml`)
on every push to `main`.
