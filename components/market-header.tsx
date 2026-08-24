import { market } from "@/lib/market";

export function MarketHeader() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[12px] font-medium">
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-600">{market.category}</span>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-600">{market.subcategory}</span>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-amber-700">
          DEMO MARKET · FICTIONAL DATA
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="mt-1 h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900" />
        <h1 className="text-[22px] font-bold leading-tight text-gray-900 sm:text-[26px]">{market.title}</h1>
      </div>

      <div className="flex items-center gap-4 text-[13px] text-gray-500">
        <span>{market.volume} Vol.</span>
        <span>·</span>
        <span>Ends {market.endDate}</span>
      </div>
    </div>
  );
}
