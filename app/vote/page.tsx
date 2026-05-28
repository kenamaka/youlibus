"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import Loader from "@/src/components/vote/Loader";
import SplashScreen from "@/src/components/vote/SplashScreen";
import CandidateCard from "@/src/components/vote/CandidateCard";

import { useCandidates } from "@/hooks/useCandidates";

import { getFingerprint } from "@/lib/fingerprint";

import {
  castVote,
  hasUserVoted,
} from "@/services/vote";

export default function VotePage() {
  const { candidates, loading, refresh } =
    useCandidates();

  const [fingerprint, setFingerprint] =
    useState("");

  const [hasVoted, setHasVoted] =
    useState(false);

  const [started, setStarted] =
    useState(false);

  useEffect(() => {
    init();
  }, []);

  // ✅ FIXED INIT (this is the missing piece)
  async function init() {
    try {
      const id = await getFingerprint();

      setFingerprint(id);

      // 🔥 check DB if user already voted
      const voted = await hasUserVoted(id);

      if (voted) {
        setHasVoted(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleVote(candidateId: string) {
    try {
      await castVote(candidateId, fingerprint);

      toast.success("Vote submitted successfully");

      setHasVoted(true);

      refresh();
    } catch (error: any) {
      console.error(error);

      // 🔥 even if DB rejects, lock user anyway
      setHasVoted(true);

      toast.error("You have already voted or something went wrong");
    }
  }

  if (loading) {
    return <Loader />;
  }

  // =========================
  // SPLASH SCREEN LOGIC
  // =========================
  if (!started || hasVoted) {
    return (
      <SplashScreen
        hasVoted={hasVoted}
        onStart={() => {
          if (hasVoted) {
            window.history.back();
            return;
          }

          setStarted(true);
        }}
      />
    );
  }

  // =========================
  // VOTING SCREEN
  // =========================
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#18181B]">
      {/* Background Glows */}
      <div className="absolute left-[-150px] top-[-150px] h-[320px] w-[320px] rounded-full bg-[#6D28D9]/20 blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-150px] h-[320px] w-[320px] rounded-full bg-[#4C1D95]/20 blur-3xl" />

      {/* Top Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 pb-10 pt-10 md:px-8 lg:px-12">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#D4D4D8]">
                Awards Voting
              </p>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
              Choose Your
              <br />
              Favorite.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#A1A1AA] md:text-lg md:leading-8">
              Swipe through nominees and cast your vote.
              You can only vote once.
            </p>
          </div>
        </div>

        {/* Candidates Slider */}
        <div
          className="
            flex snap-x snap-mandatory gap-6
            overflow-x-auto scroll-smooth
            px-4 pb-14 md:px-8 lg:px-12
            scrollbar-hide
          "
        >
          {candidates.map((candidate, index) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              index={index}
              disabled={hasVoted}
              onVote={() => handleVote(candidate.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}