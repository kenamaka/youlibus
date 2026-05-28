"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import Loader from "@/src/components/vote/Loader";
import SplashScreen from "@/src/components/vote/SplashScreen";
import CandidateCard from "@/src/components/vote/CandidateCard";

import { useCandidates } from "@/hooks/useCandidates";

import {
  getFingerprint,
  getDeviceId,
} from "@/lib/fingerprint";

import {
  castVote,
  hasUserVoted,
} from "@/services/vote";

export default function VotePage() {
  const { candidates, loading, refresh } =
    useCandidates();

  // =====================================
  // STATES
  // =====================================

  const [fingerprint, setFingerprint] =
    useState("");

  const [deviceId, setDeviceId] =
    useState("");

  const [hasVoted, setHasVoted] =
    useState(false);

  const [started, setStarted] =
    useState(false);

  // =====================================
  // INIT
  // =====================================

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      // =====================================
      // GET DEVICE ID (persistent)
      // =====================================

      const localDeviceId = getDeviceId();

      setDeviceId(localDeviceId);

      // =====================================
      // GET FINGERPRINT
      // =====================================

      const fingerprintId =
        await getFingerprint();

      setFingerprint(fingerprintId);

      // =====================================
      // CHECK IF USER ALREADY VOTED
      // =====================================

      const voted = await hasUserVoted(
        fingerprintId,
        localDeviceId
      );

      if (voted) {
        setHasVoted(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // =====================================
  // HANDLE VOTE
  // =====================================

  async function handleVote(
    candidateId: string
  ) {
    try {
      const response = await castVote(
        candidateId,
        fingerprint,
        deviceId
      );

      if (!response.success) {
        setHasVoted(true);

        toast.error(response.message);

        return;
      }

      toast.success(response.message);

      setHasVoted(true);

      refresh();
    } catch (error: any) {
      console.error(error);

      // Lock UI even if backend rejects
      setHasVoted(true);

      toast.error(
        "You have already voted or something went wrong"
      );
    }
  }

  // =====================================
  // LOADER
  // =====================================

  if (loading) {
    return <Loader />;
  }

  // =====================================
  // SPLASH SCREEN
  // =====================================

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

  // =====================================
  // VOTING SCREEN
  // =====================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#18181B]">
      {/* Background Glows */}
      <div className="absolute left-[-150px] top-[-150px] h-[320px] w-[320px] rounded-full bg-[#6D28D9]/20 blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-150px] h-[320px] w-[320px] rounded-full bg-[#4C1D95]/20 blur-3xl" />

      {/* Overlay */}
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
              Swipe through nominees and cast
              your vote. You can only vote once.
            </p>
          </div>
        </div>

        {/* Candidate Slider */}
        <div
          className="
            flex snap-x snap-mandatory gap-6
            overflow-x-auto scroll-smooth
            px-4 pb-14 md:px-8 lg:px-12
            scrollbar-hide
          "
        >
          {candidates.map(
            (candidate, index) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                index={index}
                disabled={hasVoted}
                onVote={() =>
                  handleVote(candidate.id)
                }
              />
            )
          )}
        </div>
      </div>
    </main>
  );
}