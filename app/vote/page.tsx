"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import Loader from "@/src/components/vote/Loader";
import SplashScreen from "@/src/components/vote/SplashScreen";
import CandidateCard from "@/src/components/vote/CandidateCard";

import { getFingerprint } from "@/lib/fingerprint";

import { useCandidates } from "@/hooks/useCandidates";

import { castVote } from "@/services/vote";

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

  async function init() {
    try {
      const id = await getFingerprint();

      setFingerprint(id);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleVote(candidateId: string) {
    try {
      const response = await castVote(
        candidateId,
        fingerprint
      );

      if (!response.success) {
        setHasVoted(true);

        toast.error(response.message);

        return;
      }

      toast.success(response.message);

      setHasVoted(true);

      refresh();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    }
  }

  if (loading) {
    return <Loader />;
  }

  // Splash Screen
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

  // Voting Screen
  return (
    <main className="min-h-screen bg-black px-4 py-8">
      <div className="mx-auto w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">
            Vote
          </h1>

          <p className="mt-2 text-gray-400">
            Select one candidate only
          </p>
        </div>

        {/* Candidates */}
        <div className="space-y-6">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              disabled={hasVoted}
              onVote={() =>
                handleVote(candidate.id)
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}