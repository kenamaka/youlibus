"use client";

import { motion } from "framer-motion";

interface Props {
  name: string;
  selected: boolean;
  onSelect: () => void;
}

export default function NomineeCard({
  name,
  selected,
  onSelect,
}: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={`w-full flex items-center justify-between p-4 rounded-xl border transition ${
        selected
          ? "border-purple-500 bg-purple-500/20"
          : "border-white/10 bg-white/5"
      }`}
    >
      <span className="text-white font-medium">
        {name}
      </span>

      <div
        className={`h-5 w-5 cursor-pointer rounded-full border ${
          selected
            ? "bg-purple-500 border-purple-500"
            : "border-white/40"
        }`}
      />
    </motion.button>
  );
}