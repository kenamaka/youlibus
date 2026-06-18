"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Vote,
  Layers3,
  Users,
  Trophy,
} from "lucide-react";

interface StatsData {
  totalVotes: number;
  totalCategories: number;
  totalNominees: number;
  topNominee: string;
  topVotes: number;
}

export default function DashboardStats() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<StatsData>({
    totalVotes: 0,
    totalCategories: 0,
    totalNominees: 0,
    topNominee: "-",
    topVotes: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const { data, error } = await supabase
        .from("candidates")
        .select("name, category, vote_count");

      if (error) throw error;

      if (!data) return;

      const totalVotes = data.reduce(
        (sum, candidate) => sum + (candidate.vote_count || 0),
        0
      );

      const categories = new Set(
        data.map((candidate) => candidate.category)
      );

      const topCandidate = [...data].sort(
        (a, b) => (b.vote_count || 0) - (a.vote_count || 0)
      )[0];

      setStats({
        totalVotes,
        totalCategories: categories.size,
        totalNominees: data.length,
        topNominee: topCandidate?.name || "-",
        topVotes: topCandidate?.vote_count || 0,
      });
    } catch (err) {
      console.error("Dashboard stats error:", err);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    {
      title: "Total Votes",
      value: stats.totalVotes.toLocaleString(),
      icon: Vote,
      subtitle: "Votes cast",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: Layers3,
      subtitle: "Award categories",
    },
    {
      title: "Nominees",
      value: stats.totalNominees,
      icon: Users,
      subtitle: "Total candidates",
    },
    {
      title: "Top Nominee",
      value: stats.topNominee,
      icon: Trophy,
      subtitle: `${stats.topVotes.toLocaleString()} votes`,
    },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Overview
          </h2>

          <p className="text-sm text-gray-500">
            Live voting statistics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-3xl
p-6
hover:bg-white/10
hover:border-purple-500/30
transition-all
duration-300
shadow-lg
"
              // className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Icon
                    size={22}
                    className="text-purple-600"
                  />
                </div>
              </div>

              {loading ? (
                <>
                  <div className="h-7 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 truncate">
                    {card.value}
                  </h3>

                  <p className="text-sm font-medium text-gray-600 mt-1">
                    {card.title}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {card.subtitle}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}