"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { Candidate } from "@/types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
  disabled?: boolean;
  onVote: () => void;
}

export default function CandidateCard({
  candidate,
  disabled,
  onVote,
}: CandidateCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
      }}
      className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      {/* Image */}
      <div className="relative h-80 w-full">
        <Image
          src={candidate.image_url}
          alt={candidate.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-5 p-5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {candidate.name}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            {candidate.vote_count} votes
          </p>
        </div>

        <motion.button
          whileTap={{
            scale: 0.96,
          }}
          disabled={disabled}
          onClick={onVote}
          className="w-full rounded-2xl bg-yellow-500 py-4 text-lg font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          Vote Candidate
        </motion.button>
      </div>
    </motion.div>
  );
}