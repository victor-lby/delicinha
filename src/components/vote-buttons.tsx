"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { voteApp } from "@/app/actions";
import { useTransition } from "react";

export function VoteButtons({
  slug,
  isPremium,
}: {
  slug: string;
  isPremium?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  function handleVote(direction: "up" | "down") {
    startTransition(async () => {
      await voteApp(slug, direction);
    });
  }

  return (
    <div className={`flex gap-2 ${pending ? "opacity-50 pointer-events-none" : ""}`}>
      <button
        onClick={() => handleVote("up")}
        className={`w-[48px] h-[48px] rounded-xl flex items-center justify-center transition-transform hover:scale-110 ${
          isPremium ? "bg-white text-[#FF008A]" : "bg-[#F4F5F7] text-zinc-500 hover:bg-green-50 hover:text-green-600"
        }`}
      >
        <ThumbsUp className="w-5 h-5" strokeWidth={2.4} />
      </button>
      <button
        onClick={() => handleVote("down")}
        className={`w-[48px] h-[48px] rounded-xl flex items-center justify-center transition-transform hover:scale-110 ${
          isPremium ? "bg-white/20 text-white" : "bg-[#F4F5F7] text-zinc-500 hover:bg-red-50 hover:text-red-500"
        }`}
      >
        <ThumbsDown className="w-5 h-5" strokeWidth={2.4} />
      </button>
    </div>
  );
}
