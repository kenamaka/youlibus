
"use client";

import { useRouter } from "next/navigation";
import SplashScreen from "@/src/components/vote/SplashScreen";
import { CATEGORIES } from "@/src/constants/categories";
import { useVoteStore } from "@/src/store/vote-store";

export default function VotePage() {
  const router = useRouter();

  const votedCategories = useVoteStore(
    (state) => state.votedCategories
  );

  const completedCategories =
    votedCategories.length;

  const totalCategories =
    CATEGORIES.length;

  return (
    <SplashScreen
      completedCategories={completedCategories}
      totalCategories={totalCategories}
      onStart={() =>
        router.push("/vote/categories")
      }
    />
  );
}