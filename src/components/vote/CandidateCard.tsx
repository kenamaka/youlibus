"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { useState } from "react";

import { ArrowRight } from "lucide-react";

import { Candidate } from "@/types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
  disabled?: boolean;
  onVote: () => void;
  index: number;
}

export default function CandidateCard({
  candidate,
  disabled,
  onVote,
}: CandidateCardProps) {
  const [active, setActive] =
    useState(false);

  return (
    <>
    <motion.div
      onClick={() => setActive(true)}
      animate={{
        scale: active ? 1 : 0.9,
        opacity: active ? 1 : 0.55,
        y: active ? 0 : 20,
      }}
      transition={{
        duration: 0.45,
      }}
      className="
        relative flex-shrink-0
        snap-center
        overflow-hidden
        rounded-[36px]
        border border-white/10
        bg-white/5
        shadow-2xl
        backdrop-blur-xl
        group
        cursor-pointer

        w-[82vw]
        h-[580px]

        md:w-[420px]
        md:h-[650px]

        lg:w-[480px]
      "
    >
      {/* Image */}
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={candidate.image_url}
          alt={candidate.name}
          fill
           sizes="
    (max-width: 768px) 82vw,
    (max-width: 1024px) 420px,
    480px
  "
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />



        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Purple Tint */}
        <div className="absolute inset-0 bg-[#4C1D95]/10" />
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 backdrop-blur-2xl">
          {/* Name */}
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#D4D4D8]">
              Nominee
            </p>

            <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
              {candidate.name}
            </h2>
          </div>

          {/* CTA */}
          {active && (
            <motion.button
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileTap={{
                scale: 0.98,
              }}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();

                onVote();
              }}
              className="
                mt-6 flex w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-[#4C1D95]
                via-[#5B21B6]
                to-[#6D28D9]
                px-6 py-4
                text-base
                font-semibold
                text-white
                shadow-2xl
                shadow-purple-900/30
                transition
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Vote Candidate

              <ArrowRight size={18} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Active Ring */}
      {active && (
        <div className="absolute inset-0 rounded-[36px] ring-2 ring-[#6D28D9]/70" />
      )}
    </motion.div>
    </>
  );
}