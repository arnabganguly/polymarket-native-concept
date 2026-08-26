"use client";

import { SiteHeader } from "@/components/site-header";
import { MarketHeader } from "@/components/market-header";
import { ProbabilityChart } from "@/components/probability-chart";
import { OutcomesPanel } from "@/components/outcomes-panel";
import { TradingPanel } from "@/components/trading-panel";
import { TrustCard } from "@/components/trust-card";
import { UnderstandPanel } from "@/components/understand-panel";
import { ParticipatePanel } from "@/components/participate-panel";
import { DistributePanel } from "@/components/distribute-panel";
import { CommentsPanel } from "@/components/comments-panel";
import { PresentationBar } from "@/components/presentation-bar";
import { ConceptFooter } from "@/components/concept-footer";
import { useExperience } from "@/lib/experience-context";

export default function Home() {
  const { mode } = useExperience();
  const enhanced = mode === "enhanced";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 py-6">
        <div id="section-market" className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-5">
            <MarketHeader />
            <div className="rounded-xl border border-gray-200 p-4">
              <ProbabilityChart />
            </div>

            {enhanced && <TrustCard />}

            <OutcomesPanel />

            {enhanced && <UnderstandPanel />}

            {!enhanced && <CommentsPanel />}
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start">
            <TradingPanel />
          </div>
        </div>

        {enhanced && (
          <div className="mt-6 flex flex-col gap-6">
            <ParticipatePanel />
            <DistributePanel />
          </div>
        )}

        {!enhanced && (
          <div className="mt-8 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-center text-[12px] text-gray-400">
            Switch to <span className="font-bold text-gray-600">POLYMARKET+</span> in the header to see proposed
            Understand, Trust, Participate, and Distribute enhancements.
          </div>
        )}
      </main>

      <ConceptFooter />
      <PresentationBar />
    </div>
  );
}
