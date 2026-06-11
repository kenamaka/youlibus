// "use client";

// import { motion } from "framer-motion";
// import CategoryCard from "./CategoryCard";

// export interface VoteCategory {
//   id: string;
//   title: string;
//   image: string;
//   nomineeCount: number;
//   completed?: boolean;
// }

// interface CategoryGridProps {
//   categories: VoteCategory[];
//   onSelect: (category: VoteCategory) => void;
// }

// export default function CategoryGrid({
//   categories,
//   onSelect,
// }: CategoryGridProps) {
//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#18181B]">
//       {/* Background Glows */}
//       <div className="absolute left-[-180px] top-[-180px] h-[360px] w-[360px] rounded-full bg-[#6D28D9]/20 blur-3xl" />

//       <div className="absolute bottom-[-180px] right-[-180px] h-[360px] w-[360px] rounded-full bg-[#4C1D95]/20 blur-3xl" />

//       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30" />

//       <div className="relative z-10 px-4 py-10 md:px-8 lg:px-12">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-10 max-w-4xl"
//         >
//           <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
//             <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#D4D4D8]">
//               Awards Voting
//             </p>
//           </div>

//           <h1 className="text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
//             Choose a
//             <br />
//             Category
//           </h1>

//           <p className="mt-5 max-w-2xl text-base leading-7 text-[#A1A1AA] md:text-lg">
//             Select a category to view its nominees.
//             You may cast only one vote in each category.
//           </p>
//         </motion.div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
//           {categories.map((category, index) => (
//             <motion.div
//               key={category.id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 duration: 0.45,
//                 delay: index * 0.08,
//               }}
//             >
//               <CategoryCard
//                 title={category.title}
//                 image={category.image}
//                 nomineeCount={category.nomineeCount}
//                 completed={category.completed}
//                 onClick={() => onSelect(category)}
//               />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }



"use client";

import { CATEGORIES } from "@/src/constants/categories";

interface CategorySelectorProps {
  votedCategories: string[];
  onSelect: (category: string) => void;
}


export default function CategorySelector({
  votedCategories,
  onSelect,
}: CategorySelectorProps) {
  return (
    <div className="px-4 md:px-8 lg:px-12 pb-20">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Select a Category
        </h2>

        <p className="mt-2 text-gray-400">
          You can vote once per category
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => {
          const isVoted =
            votedCategories.includes(category.name);

          return (
            <button
              key={category.name}
              disabled={isVoted}
              // onClick={() => onSelect(category)}
              onClick={() => onSelect(category.name)}
              className={`
                relative rounded-2xl border  p-5 text-left transition-all cursor-pointer
                ${
                  isVoted
                    ? "cursor-not-allowed border-green-500/30 bg-green-500/10 opacity-60"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }
              `}
            >
              {/* Title */}
              <h3 className="text-white font-semibold text-sm leading-snug">
                {category.name}
              </h3>

              {/* Status */}
              <p className="mt-2 text-xs text-gray-400">
                {isVoted
                  ? "Already voted"
                  : "Click to vote"}
              </p>

              {/* Badge */}
              {isVoted && (
                <div className="absolute top-3 right-3 text-green-400 text-xs font-semibold">
                  ✓ Voted
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}