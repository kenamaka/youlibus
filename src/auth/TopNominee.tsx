"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Nominee {
  name: string;
  votes: number;
}

export default function TopNomineesChart() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Nominee[]>([]);

  useEffect(() => {
    fetchTopNominees();
  }, []);

  async function fetchTopNominees() {
    try {
      const { data: candidates, error } = await supabase
        .from("candidates")
        .select("name, vote_count");

      if (error) throw error;

      const sorted =
        candidates
          ?.map((candidate) => ({
            name: candidate.name,
            votes: candidate.vote_count || 0,
          }))
          .sort((a, b) => b.votes - a.votes)
          .slice(0, 10) || [];

      setData(sorted);
    } catch (error) {
      console.error("Top nominees error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Top 10 Nominees
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Highest ranked nominees across all categories
        </p>
      </div>

      {loading ? (
        <div className="h-[450px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 5,
                right: 20,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
              />

              <XAxis
                type="number"
                tick={{ fill: "#6B7280" }}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={140}
                tick={{
                  fill: "#374151",
                  fontSize: 12,
                }}
              />

              <Tooltip
                cursor={{
                  fill: "#F3F4F6",
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                }}
              />

              <Bar
                dataKey="votes"
                fill="#9333EA"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}