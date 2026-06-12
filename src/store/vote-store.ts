import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VoteState {
  selectedCategory: string | null;
  selectedCandidate: string | null;
  votedCategories: string[];

  setSelectedCategory: (cat: string) => void;
  setSelectedCandidate: (id: string | null) => void;
  markCategoryAsVoted: (cat: string) => void;
}

export const useVoteStore = create<VoteState>()(
  persist(
    (set) => ({
      selectedCategory: null,
      selectedCandidate: null,
      votedCategories: [],

      setSelectedCategory: (cat) =>
        set({ selectedCategory: cat }),

      setSelectedCandidate: (id) =>
        set({ selectedCandidate: id }),

      markCategoryAsVoted: (cat) =>
        set((state) => ({
          votedCategories: state.votedCategories.includes(cat)
            ? state.votedCategories
            : [...state.votedCategories, cat],
          selectedCandidate: null,
        })),
    }),
    {
      name: "vote-storage",
    }
  )
);