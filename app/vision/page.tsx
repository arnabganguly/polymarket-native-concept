"use client";

import { SiteHeader } from "@/components/site-header";
import { VisionView } from "@/components/vision-view";

export default function VisionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <VisionView />
    </div>
  );
}
