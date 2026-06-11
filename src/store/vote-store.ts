// // import { create } from "zustand";
// // import { persist } from "zustand/middleware";

// // interface VoteStore {
// //   selectedCategory: string | null;

// //   votedCategories: string[];

// //   setSelectedCategory: (
// //     category: string
// //   ) => void;

// //   setVotedCategories: (
// //     categories: string[]
// //   ) => void;

// //   markCategoryAsVoted: (
// //     category: string
// //   ) => void;

// //   hasVotedInCategory: (
// //     category: string
// //   ) => boolean;
// // }

// // export const useVoteStore =
// //   create<VoteStore>()(
// //     persist(
// //       (set, get) => ({
// //         selectedCategory: null,

// //         votedCategories: [],

// //         setSelectedCategory: (
// //           category
// //         ) =>
// //           set({
// //             selectedCategory: category,
// //           }),

// //         setVotedCategories: (
// //           categories
// //         ) =>
// //           set({
// //             votedCategories: categories,
// //           }),

// //         markCategoryAsVoted: (
// //           category
// //         ) => {
// //           const current =
// //             get().votedCategories;

// //           if (
// //             current.includes(category)
// //           ) {
// //             return;
// //           }

// //           set({
// //             votedCategories: [
// //               ...current,
// //               category,
// //             ],
// //           });
// //         },

// //         hasVotedInCategory: (
// //           category
// //         ) =>
// //           get().votedCategories.includes(
// //             category
// //           ),
// //       }),
// //       {
// //         name: "vote-store",
// //       }
// //     )
// //   );

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface VoteStore {
//   selectedCategory: string | null;

//   votedCategories: string[];

//   setSelectedCategory: (
//     category: string
//   ) => void;

//   markCategoryAsVoted: (
//     category: string
//   ) => void;

//   hasVotedInCategory: (
//     category: string
//   ) => boolean;
// }

// export const useVoteStore =
//   create<VoteStore>()(
//     persist(
//       (set, get) => ({
//         selectedCategory: null,

//         votedCategories: [],

//         setSelectedCategory: (
//           category
//         ) =>
//           set({
//             selectedCategory: category,
//           }),

//         markCategoryAsVoted: (
//           category
//         ) => {
//           const current =
//             get().votedCategories;

//           if (
//             current.includes(category)
//           ) {
//             return;
//           }

//           set({
//             votedCategories: [
//               ...current,
//               category,
//             ],
//           });
//         },

//         hasVotedInCategory: (
//           category
//         ) =>
//           get().votedCategories.includes(
//             category
//           ),
//       }),
//       {
//         name: "vote-store",
//       }
//     )
//   );

import { create } from "zustand";

interface VoteState {
  selectedCategory: string | null;
  selectedCandidate: string | null;
  votedCategories: string[];

  setSelectedCategory: (cat: string) => void;
  setSelectedCandidate: (id: string | null) => void;
  markCategoryAsVoted: (cat: string) => void;
}

export const useVoteStore = create<VoteState>((set) => ({
  selectedCategory: null,
  selectedCandidate: null,
  votedCategories: [],

  setSelectedCategory: (cat) =>
    set({ selectedCategory: cat }),

  setSelectedCandidate: (id) =>
    set({ selectedCandidate: id }),

  markCategoryAsVoted: (cat) =>
    set((state) => ({
      votedCategories: [...state.votedCategories, cat],
      selectedCandidate: null,
    })),
}));