"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trophy, TrendingUp } from "lucide-react";

interface Winner {
  category: string;
  name: string;
  votes: number;
  lead: number;
}

export default function WinnersGrid() {
  const [loading, setLoading] = useState(true);
  const [winners, setWinners] = useState<Winner[]>([]);

  useEffect(() => {
    fetchWinners();
  }, []);

  async function fetchWinners() {
    try {
      const { data, error } = await supabase
        .from("candidates")
        .select("name, category, vote_count");

      if (error) throw error;

      if (!data) return;

      const grouped: Record<string, any[]> = {};

      data.forEach((candidate) => {
        if (!grouped[candidate.category]) {
          grouped[candidate.category] = [];
        }

        grouped[candidate.category].push(candidate);
      });

      const categoryWinners: Winner[] = [];

      Object.entries(grouped).forEach(([category, nominees]) => {
        const sorted = [...nominees].sort(
          (a, b) => (b.vote_count || 0) - (a.vote_count || 0)
        );

        const winner = sorted[0];
        const runnerUp = sorted[1];

        categoryWinners.push({
          category,
          name: winner.name,
          votes: winner.vote_count || 0,
          lead:
            (winner.vote_count || 0) -
            (runnerUp?.vote_count || 0),
        });
      });

      categoryWinners.sort((a, b) => b.votes - a.votes);

      setWinners(categoryWinners);
    } catch (error) {
      console.error("Winner fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Category Leaders
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Current leaders across all voting categories
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse"
            >
              <div className="h-5 bg-gray-200 rounded mb-4" />
              <div className="h-8 bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {winners.map((winner) => (
            <div
              key={winner.category}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Category
                  </p>

                  <h3 className="font-semibold text-gray-900 mt-1">
                    {winner.category}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Trophy
                    size={20}
                    className="text-purple-600"
                  />
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900">
                {winner.name}
              </h4>

              <p className="text-sm text-gray-500 mt-1">
                Leading nominee
              </p>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    Total Votes
                  </p>

                  <p className="font-bold text-gray-900">
                    {winner.votes.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                  <TrendingUp
                    size={16}
                    className="text-purple-600"
                  />

                  <span className="text-sm font-medium text-purple-700">
                    +{winner.lead}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}