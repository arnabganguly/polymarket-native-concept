"use client";

import { useState } from "react";
import { MessageCircle, ThumbsUp, ChevronDown } from "lucide-react";
import { commentSort, marketComments } from "@/lib/comments";

function initials(name: string) {
  return name.replace(/_/g, " ").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}

export function CommentsPanel() {
  const [sort, setSort] = useState<(typeof commentSort)[number]>("Newest");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="rounded-xl border border-gray-200 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-gray-900">
          <MessageCircle size={15} />
          Comments
          <span className="text-gray-400">({marketComments.length})</span>
        </div>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as (typeof commentSort)[number])}
            className="appearance-none rounded-md border border-gray-200 bg-white py-1 pl-2.5 pr-6 text-[12px] font-semibold text-gray-600 outline-none"
          >
            {commentSort.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[11px] font-bold text-gray-500">
          YOU
        </div>
        <input
          readOnly
          placeholder="Add a comment…"
          className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-2 text-[12.5px] text-gray-500 outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col divide-y divide-gray-100">
        {marketComments.map((c) => (
          <div key={c.id} className="flex gap-2.5 py-3 first:pt-0 last:pb-0">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
              style={{ background: c.avatarColor }}
            >
              {initials(c.author)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-1.5 text-[12.5px]">
                <span className="font-bold text-gray-900">{c.author}</span>
                {c.position && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      c.position.startsWith("Yes") ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {c.position}
                  </span>
                )}
                <span className="text-gray-400">· {c.timeAgo}</span>
              </div>
              <p className="mt-0.5 text-[13px] leading-snug text-gray-700">{c.body}</p>
              <div className="mt-1.5 flex items-center gap-3 text-[11.5px] font-semibold text-gray-400">
                <button
                  onClick={() => toggleLike(c.id)}
                  className={`flex items-center gap-1 hover:text-gray-700 ${liked[c.id] ? "text-[#1652F0]" : ""}`}
                >
                  <ThumbsUp size={12} className={liked[c.id] ? "fill-current" : undefined} />
                  {c.likes + (liked[c.id] ? 1 : 0)}
                </button>
                <button className="hover:text-gray-700">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
