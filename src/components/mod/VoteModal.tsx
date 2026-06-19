"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  category: string;
  onDone: () => void;
}

export default function VoteSuccessModal({
  open,
  category,
  onDone,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-[90%] max-w-md rounded-2xl bg-[#18181B] border border-white/10 p-6 text-center"
          >
            {/* ICON */}
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="text-green-400" size={34} />
              </div>
            </div>

            {/* TEXT */}
            <h2 className="text-xl font-bold text-white">
              Vote Submitted!
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Your vote for{" "}
              <span className="text-white font-medium">
                {category}
              </span>{" "}
              has been recorded successfully.
            </p>

            {/* BUTTON */}
            <button
              onClick={onDone}
              className="mt-6 w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold"
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}