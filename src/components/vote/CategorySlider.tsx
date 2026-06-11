"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Category {
  name: string;
  image: string;
}

interface Props {
  categories: Category[];
  votedCategories: string[];
  onSelect: (category: string) => void;
}

export default function CategorySlider({
  categories,
  votedCategories,
  onSelect,
}: Props) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // =========================
  // SCROLL HANDLERS
  // =========================
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 380;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-screen bg-[#18181B] text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute left-[-150px] top-[-150px] h-[320px] w-[320px] rounded-full bg-[#6D28D9]/20 blur-3xl" />
      <div className="absolute bottom-[-150px] right-[-150px] h-[320px] w-[320px] rounded-full bg-[#4C1D95]/20 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30" />

      {/* =========================
          FLOATING BACK BUTTON
      ========================= */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
      >
        <ArrowLeft size={16} />
        Back
      </motion.button>

      {/* Header */}
      <div className="relative z-10 px-4 pt-24 md:px-10">
        <h1 className="text-4xl md:text-6xl font-black">
          Choose Category
        </h1>

        <p className="text-gray-400 mt-2">
          Swipe or use arrows to navigate
        </p>
      </div>

      {/* =========================
          ARROW NAVIGATION
      ========================= */}
      <div className="absolute top-1/2 left-4 z-20">
        <button
          onClick={() => scroll("left")}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10"
        >
          <ChevronLeft />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 z-20">
        <button
          onClick={() => scroll("right")}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10"
        >
          <ChevronRight />
        </button>
      </div>

      {/* =========================
          SLIDER
      ========================= */}
      <div className="relative z-10 mt-10">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-4 md:px-10 pb-14 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        >
          {categories.map((cat) => {
            const isVoted = votedCategories.includes(cat.name);

            return (
              <motion.button
                key={cat.name}
                whileHover={{ scale: isVoted ? 1 : 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => !isVoted && onSelect(cat.name)}
                disabled={isVoted}
                className="relative min-w-[300px] cursor-pointer md:min-w-[360px] h-[480px] rounded-[28px] overflow-hidden snap-center"
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover scale-110"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4C1D95]/60 via-transparent to-black/80" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h2 className="text-xl md:text-2xl font-bold">
                    {cat.name}
                  </h2>

                  <p className="text-sm text-gray-300 mt-2">
                    {isVoted ? "Already Voted" : "Tap to vote"}
                  </p>

                  {isVoted && (
                    <div className="absolute top-4 right-4 bg-green-500/20 border border-green-400 text-green-300 text-xs px-3 py-1 rounded-full">
                      ✓ Voted
                    </div>
                  )}
                </div>

                {/* Hover ring */}
                {!isVoted && (
                  <div className="absolute inset-0 rounded-[28px] ring-1 ring-white/10 hover:ring-purple-500/40 transition" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}