
"use client";

import { useRouter } from "next/navigation";
import SplashScreen from "@/src/components/vote/SplashScreen";
import { CATEGORIES } from "@/src/constants/categories";
import { useVoteStore } from "@/src/store/vote-store";
import VotingCountdown from "@/src/components/vote/VotingCountDown";


export default function VotePage() {
  const router = useRouter();

  const votedCategories = useVoteStore(
    (state) => state.votedCategories
  );

  const completedCategories =
    votedCategories.length;

  const totalCategories =
    CATEGORIES.length;
const votingStart = new Date("2026-06-20T23:59:00");
const now = new Date();

if (now < votingStart) {
  return <VotingCountdown/>;
}


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