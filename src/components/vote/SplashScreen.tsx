"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { ArrowRight, ChevronLeft } from "lucide-react";

interface SplashScreenProps {
  hasVoted?: boolean;
  onStart: () => void;
}

export default function SplashScreen({
  hasVoted,
  onStart,
}: SplashScreenProps) {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#18181B]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/25.jpeg"

          alt="Awards Background"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Purple Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4C1D95]/30 via-black/40 to-black" />

        {/* Glow Effects */}
        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#6D28D9]/30 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-[#4C1D95]/40 blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative z-10 flex w-full flex-col justify-between px-6 py-10 md:px-12 lg:px-20"
      >
        {/* Top */}
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-8 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl">
            <p className="text-sm font-medium tracking-wide text-[#E4E4E7]">
              YOULIBUS AWARDS 2026
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-left text-5xl font-black leading-[1.02] tracking-tight text-white md:text-7xl lg:text-8xl">
            
            Celebrate
            <br />
            Excellence.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-left text-base leading-7 text-[#D4D4D8] md:text-lg md:leading-8">
            {hasVoted
              ? "Your vote has already been submitted successfully. Thank you for participating in this year's award voting."
              : "Vote for the most outstanding nominee in this year's prestigious awards event."}
          </p>
        </div>

        {/* Bottom Action Card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
          }}
          className="mt-16 w-full rounded-[32px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl md:max-w-md"
        >
          <div className="mb-5">
            <p className="text-sm text-[#D4D4D8]">
              {hasVoted
                ? "Voting completed"
                : "Ready to cast your vote?"}
            </p>
          </div>

          <motion.button
            whileTap={{
              scale: 0.98,
            }}
            whileHover={{
              scale: 1.01,
            }}
            onClick={onStart}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#6D28D9] px-6 py-4 text-base font-semibold text-white shadow-2xl shadow-purple-900/30"
          >
            {hasVoted ? (
              <>
                <ChevronLeft size={20} />
                Back
              </>
            ) : (
              <>
                Get Started
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  );
}