"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

import { useVoteStore } from "@/src/store/vote-store";
import { useCandidates } from "@/hooks/useCandidates";
import VoteSuccessModal from "@/src/components/vote/VoteModal";
import NomineeCard from "@/src/components/vote/CandidateCard";
import Loader from "@/src/components/vote/Loader";
import { CATEGORIES } from "@/src/constants/categories";

import {
  getFingerprint,
  getDeviceId,
} from "@/lib/fingerprint";

import { castVote } from "@/services/vote";

export default function CategoryVotePage() {
  const router = useRouter();
  const params = useParams();

  // =========================
  // CATEGORY FROM URL
  // =========================
  const category = decodeURIComponent(
    params.category as string
  );
const [showSuccess, setShowSuccess] = useState(false);
  // =========================
  // ZUSTAND STORE
  // =========================
  const selectedCandidate = useVoteStore(
    (state) => state.selectedCandidate
  );

  const setSelectedCandidate =
    useVoteStore(
      (state) => state.setSelectedCandidate
    );

  const markCategoryAsVoted =
    useVoteStore(
      (state) => state.markCategoryAsVoted
    );

  const votedCategories =
    useVoteStore(
      (state) => state.votedCategories
    );

  // =========================
  // LOCAL STATE
  // =========================
  const [fingerprint, setFingerprint] =
    useState("");
  const [deviceId, setDeviceId] =
    useState("");
  const [loadingVote, setLoadingVote] =
    useState(false);

  // =========================
  // FETCH CANDIDATES
  // =========================
  const { candidates, loading } =
    useCandidates(category);

  // =========================
  // INIT DEVICE IDS
  // =========================
  useEffect(() => {
    async function init() {
      const fp = await getFingerprint();
      const dev = getDeviceId();

      setFingerprint(fp);
      setDeviceId(dev);
    }

    init();
  }, []);

  // =========================
  // CHECK IF CATEGORY IS VOTED
  // =========================
  const isCategoryVoted =
    votedCategories.includes(category);

  // =========================
  // HANDLE VOTE
  // =========================
async function handleVote() {
  if (!selectedCandidate) {
    toast.error("Please select a nominee");
    return;
  }

  try {
    setLoadingVote(true);

    const res = await castVote(
      selectedCandidate,
      category,
      fingerprint,
      deviceId
    );

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    // show modal instead of instant redirect
    setShowSuccess(true);

  } catch (error) {
    console.error(error);
    toast.error("Voting failed");
  } finally {
    setLoadingVote(false);
  }
}
  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return <Loader />;
  }

  // =========================
  // IF ALREADY VOTED
  // =========================
  if (isCategoryVoted) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-[#18181B] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Already Voted
          </h1>
          <p className="text-gray-400 mt-2">
            You have already voted in this category
          </p>

          <button
            onClick={() => router.push("/vote")}
            className="mt-6 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700"
          >
            Back to Categories
          </button>
        </div>
      </main>
    );
  }
const categoryData = CATEGORIES.find(
  (c) => c.name === category
);
  // =========================
  // UI
  // =========================
  return (
    <main className="min-h-screen bg-[#18181B] text-white">

      {/* HERO */}
<div className="relative h-[300px] md:h-[520px] lg:h-[600px]">
  <img
    src={categoryData?.image || "/fallback.jpg"}
    alt={category}
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/60" />

  <div className="absolute bottom-5 left-5">
    <p className="text-sm text-gray-300 uppercase">
      Voting Category
    </p>

    <h1 className="text-2xl md:text-4xl font-bold">
      {category}
    </h1>
  </div>
</div>
      {/* NOMINEES */}
      <div className="px-4 md:px-10 py-6 pb-32">
        <h2 className="text-lg font-semibold mb-4">
          Select a Nominee
        </h2>

        <div className="space-y-3">
          {candidates.map((c) => (
            <NomineeCard
              key={c.id}
              name={c.name}
              selected={
                selectedCandidate === c.id
              }
              onSelect={() =>
                setSelectedCandidate(c.id)
              }
            />
          ))}
        </div>
      </div>

      {/* VOTE BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10">
        <button
          disabled={
            !selectedCandidate || loadingVote
          }
          onClick={handleVote}
          className={`w-full py-4 cursor-pointer rounded-xl font-bold transition ${
            !selectedCandidate
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loadingVote
            ? "Submitting Vote..."
            : "Submit Vote"}
        </button>
      </div>
      <VoteSuccessModal
  open={showSuccess}
  category={category}
  onDone={() => {
    markCategoryAsVoted(category);
    setSelectedCandidate(null);
    setShowSuccess(false);
    router.push("/vote");
  }}
/>
    </main>
  );
}