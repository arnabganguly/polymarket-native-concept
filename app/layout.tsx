import type { Metadata } from "next";
import "./globals.css";
import { ExperienceProvider } from "@/lib/experience-context";

export const metadata: Metadata = {
  title: "Polymarket+ — Product Concept Prototype",
  description:
    "A concept prototype exploring how Polymarket could evolve with Understand, Trust, Participate, and Distribute. Built for Coinbase Roundtable Research.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white font-sans text-gray-900">
        <ExperienceProvider>{children}</ExperienceProvider>
      </body>
    </html>
  );
}
