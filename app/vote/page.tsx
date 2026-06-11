// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import CategorySelector from "@/src/components/vote/CategoryGrid";
// import { CATEGORIES } from "@/src/constants/categories";

// import Loader from "@/src/components/vote/Loader";
// import SplashScreen from "@/src/components/vote/SplashScreen";
// import CandidateCard from "@/src/components/vote/CandidateCard";

// import { useCandidates } from "@/hooks/useCandidates";

// import {
//   getFingerprint,
//   getDeviceId,
// } from "@/lib/fingerprint";

// import {
//   castVote,
//   hasUserVoted,
// } from "@/services/vote";

// import { useVoteStore } from "@/src/store/vote-store";

// export default function VotePage() {
//   const router = useRouter();

//   // ===============================
//   // ZUSTAND STATE
//   // ===============================
//   const selectedCategory = useVoteStore(
//     (state) => state.selectedCategory
//   );

//   const setSelectedCategory = useVoteStore(
//     (state) => state.setSelectedCategory
//   );

//   const markCategoryAsVoted = useVoteStore(
//     (state) => state.markCategoryAsVoted
//   );

//   const votedCategories = useVoteStore(
//     (state) => state.votedCategories
//   );

//   // ===============================
//   // DERIVED STATE
//   // ===============================
//   const completedCategories =
//     votedCategories.length;

//   const totalCategories =
//     CATEGORIES.length;

//   // ===============================
//   // LOCAL STATE
//   // ===============================
//   const [fingerprint, setFingerprint] =
//     useState("");

//   const [deviceId, setDeviceId] =
//     useState("");

//   const [hasVoted, setHasVoted] =
//     useState(false);

//   const [started, setStarted] =
//     useState(false);

//   // ===============================
//   // CANDIDATES
//   // ===============================
//   const {
//     candidates,
//     loading,
//     refresh,
//   } = useCandidates(
//     selectedCategory || ""
//   );

//   // ===============================
//   // INIT
//   // ===============================
//   useEffect(() => {
//     init();
//   }, []);

//   async function init() {
//     try {
//       const localDeviceId =
//         getDeviceId();

//       const fingerprintId =
//         await getFingerprint();

//       setDeviceId(localDeviceId);
//       setFingerprint(fingerprintId);

//       if (selectedCategory) {
//         const voted =
//           await hasUserVoted(
//             fingerprintId,
//             localDeviceId,
//             selectedCategory
//           );

//         setHasVoted(voted);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // ===============================
//   // HANDLE VOTE
//   // ===============================
//   async function handleVote(
//     candidateId: string
//   ) {
//     try {
//       if (!selectedCategory) {
//         toast.error(
//           "Select a category first"
//         );
//         return;
//       }

//       const response =
//         await castVote(
//           candidateId,
//           selectedCategory,
//           fingerprint,
//           deviceId
//         );

//       if (!response.success) {
//         setHasVoted(true);
//         toast.error(
//           response.message
//         );
//         return;
//       }

//       toast.success(
//         response.message
//       );

//       markCategoryAsVoted(
//         selectedCategory
//       );

//       setHasVoted(true);

//       refresh();

//       // reset flow back to categories step
//       setSelectedCategory("");
//     } catch (error) {
//       console.error(error);

//       setHasVoted(true);

//       toast.error(
//         "Something went wrong"
//       );
//     }
//   }

//   // ===============================
//   // LOADING
//   // ===============================
//   if (loading) {
//     return <Loader />;
//   }

//   // ===============================
//   // STEP 1: NO CATEGORY → SHOW CATEGORY SELECTOR
//   // ===============================
//   if (!selectedCategory) {
//     return (
//       <main className="min-h-screen bg-[#18181B] text-white">
//         <SplashScreen
//           completedCategories={
//             completedCategories
//           }
//           totalCategories={
//             totalCategories
//           }
//           onStart={() => setStarted(true)}
//         />

//         {started && (
//           <CategorySelector
//             votedCategories={
//               votedCategories
//             }
//            onSelect={(category: string) =>
//   setSelectedCategory(category)
// }
//           />
//         )}
//       </main>
//     );
//   }

//   // ===============================
//   // STEP 2: CATEGORY SELECTED → VOTE UI
//   // ===============================
//   if (!started) {
//     return (
//       <SplashScreen
//         completedCategories={
//           completedCategories
//         }
//         totalCategories={
//           totalCategories
//         }
//         onStart={() =>
//           setStarted(true)
//         }
//       />
//     );
//   }

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#18181B]">
//       {/* Background Effects */}
//       <div className="absolute left-[-150px] top-[-150px] h-[320px] w-[320px] rounded-full bg-[#6D28D9]/20 blur-3xl" />

//       <div className="absolute bottom-[-150px] right-[-150px] h-[320px] w-[320px] rounded-full bg-[#4C1D95]/20 blur-3xl" />

//       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30" />

//       <div className="relative z-10">
//         {/* HEADER */}
//         <div className="px-4 pt-10 pb-10 md:px-8 lg:px-12">
//           <div className="max-w-4xl">
//             <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
//               <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#D4D4D8]">
//                 {selectedCategory}
//               </p>
//             </div>

//             <h1 className="text-4xl md:text-6xl font-black text-white">
//               Cast Your Vote
//             </h1>
//           </div>
//         </div>

//         {/* CANDIDATES */}
//         <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-14 md:px-8 lg:px-12 scrollbar-hide">
//           {candidates.map(
//             (candidate, index) => (
//               <CandidateCard
//                 key={candidate.id}
//                 candidate={candidate}
//                 index={index}
//                 disabled={hasVoted}
//                 onVote={() =>
//                   handleVote(
//                     candidate.id
//                   )
//                 }
//               />
//             )
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import SplashScreen from "@/src/components/vote/SplashScreen";
import { CATEGORIES } from "@/src/constants/categories";
import { useVoteStore } from "@/src/store/vote-store";

export default function VotePage() {
  const router = useRouter();

  const votedCategories = useVoteStore(
    (state) => state.votedCategories
  );

  const completedCategories =
    votedCategories.length;

  const totalCategories =
    CATEGORIES.length;

  return (
    <SplashScreen
      completedCategories={completedCategories}
      totalCategories={totalCategories}
      onStart={() =>
        router.push("/vote/categories")
      }
    />
  );
}