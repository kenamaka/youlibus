'use client'

import CategorySlider from "@/src/components/vote/CategorySlider";
import { CATEGORIES } from "@/src/constants/categories";
import { useVoteStore } from "@/src/store/vote-store";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const router = useRouter();

  const votedCategories = useVoteStore(
    (state) => state.votedCategories
  );

  const setSelectedCategory = useVoteStore(
    (state) => state.setSelectedCategory
  );

  return (
    <CategorySlider
      categories={CATEGORIES}
      votedCategories={votedCategories}
      onSelect={(category) => {
        setSelectedCategory(category);
        router.push(`/vote/${encodeURIComponent(category)}`);
      }}
    />
  );
}