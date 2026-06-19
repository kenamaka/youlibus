"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface Props {
  open: boolean;
  candidate: {
    id: string;
    name: string;
    vote_count: number;
  } | null;
  onClose: () => void;
  onSubmit: (newVotes: number) => Promise<void>;
}

export default function EditVoteModal({
  open,
  candidate,
  onClose,
  onSubmit,
}: Props) {
  const [votes, setVotes] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (candidate) {
      setVotes(candidate.vote_count);
    }
  }, [candidate]);

  async function handleSubmit() {
    if (!candidate) return;

    setSaving(true);

    await onSubmit(votes);

    setSaving(false);
    onClose();
  }

  function handleCancel() {
    if (candidate) {
      setVotes(candidate.vote_count);
    }

    onClose();
  }

  return (
    <AnimatePresence>
      {open && candidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <h2 className="text-xl font-bold text-gray-900">
              Edit Votes
            </h2>

            <p className="text-gray-500 mt-1">
              Update candidate vote count
            </p>

            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Candidate
              </p>

              <p className="font-semibold text-lg text-gray-900">
                {candidate.name}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">
                Votes
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setVotes((prev) =>
                      Math.max(0, prev - 1)
                    )
                  }
                  className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center"
                >
                  <Minus size={18} />
                </button>

                <input
                  type="number"
                  min="0"
                  value={votes}
                  onChange={(e) =>
                    setVotes(
                      Number(e.target.value) || 0
                    )
                  }
                  className="flex-1 h-12 text-center rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  onClick={() =>
                    setVotes((prev) => prev + 1)
                  }
                  className="h-12 w-12 rounded-xl bg-purple-600 text-white flex items-center justify-center"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700"
              >
                {saving ? "Updating..." : "Submit"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}