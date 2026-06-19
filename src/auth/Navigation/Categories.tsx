"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EditModal from '@/src/components/mod/EditModal'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";

import { CATEGORIES } from "@/src/constants/categories";

type Candidate = {
  id: string;
  name: string;
  vote_count: number;
  category: string;
};

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState(
    CATEGORIES[0].name
  );

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

const [selectedCandidate, setSelectedCandidate] =
  useState<Candidate | null>(null);

  async function updateCandidateVotes(
  newVoteCount: number
) {
  if (!selectedCandidate) return;

  const { error } = await supabase
    .from("candidates")
    .update({
      vote_count: newVoteCount,
    })
    .eq("id", selectedCandidate.id);

  if (error) {
    console.error(error);
    return;
  }

  setCandidates((prev) =>
    prev
      .map((candidate) =>
        candidate.id === selectedCandidate.id
          ? {
              ...candidate,
              vote_count: newVoteCount,
            }
          : candidate
      )
      .sort(
        (a, b) =>
          (b.vote_count || 0) -
          (a.vote_count || 0)
      )
  );
}
  useEffect(() => {
    fetchCategoryData();
  }, [activeCategory]);

  async function fetchCategoryData() {
    setLoading(true);

    const { data, error } = await supabase
      .from("candidates")
      .select("id,name,vote_count,category")
      .eq("category", activeCategory)
      .order("vote_count", { ascending: false });

    if (error) {
      console.error(error);
      setCandidates([]);
    } else {
      setCandidates(data || []);
    }

    setLoading(false);
  }

  const totalVotes = candidates.reduce(
    (sum, c) => sum + (c.vote_count || 0),
    0
  );

  const totalCandidates = candidates.length;

  const topCandidate = candidates[0];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Categories Report
        </h1>

        <p className="text-gray-500 mt-1">
          View voting results and rankings by category.
        </p>
      </div>

      {/* CATEGORY PILLS */}
      <div className="flex gap-3 overflow-x-auto pb-3 whitespace-nowrap scrollbar-hide">
        {CATEGORIES.map((cat: any) => {
          const isActive = activeCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-purple-50"
                }
              `}
            >
              {cat.shortName ?? cat.name}
            </button>
          );
        })}
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="space-y-4 mt-6">
          <div className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-40 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      ) : (
        <>
          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-sm text-gray-500">
                Total Votes
              </p>

              <p className="text-3xl font-bold mt-2">
                {totalVotes}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-sm text-gray-500">
                Candidates
              </p>

              <p className="text-3xl font-bold mt-2">
                {totalCandidates}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 col-span-2 md:col-span-1">
              <p className="text-sm text-gray-500">
                Current Leader
              </p>

              <p className="text-lg font-semibold text-purple-600 mt-2">
                {topCandidate?.name || "N/A"}
              </p>
            </div>
          </div>

          {/* CHART */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mt-6">
            <h2 className="font-semibold text-gray-900 mb-4">
              Vote Distribution
            </h2>

            {candidates.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No candidates found for this category.
              </div>
            ) : (
              <div className="w-full h-[350px] min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={candidates}
                    margin={{
                      top: 30,
                      right: 10,
                      left: -25,
                      bottom: 10,
                    }}
                  >
                    <XAxis
                      dataKey="name"
                      interval={0}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      cursor={{ fill: "transparent" }}
                    />

                    <Bar
                      dataKey="vote_count"
                      fill="#7C3AED"
                      radius={[10, 10, 0, 0]}
                    >
                      <LabelList
                        dataKey="vote_count"
                        position="top"
                        fontSize={12}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
{/* RANKINGS */}
<div className="mt-6">
  <div className="flex items-center justify-between mb-4">
    <h2 className="font-semibold text-gray-900">
      Candidate Rankings
    </h2>

    <span className="text-sm text-gray-500">
      {candidates.length} Candidates
    </span>
  </div>

  <div className="space-y-3">
    {candidates.map((candidate, index) => (
      <div
        key={candidate.id}
        className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between"
      >
        {/* LEFT */}
        <div>
          <p className="text-xs text-gray-500">
            Rank #{index + 1}
          </p>

          <p className="font-semibold text-gray-900 mt-1">
            {candidate.name}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xl font-bold text-purple-600">
              {candidate.vote_count}
            </p>

            <p className="text-xs text-gray-500">
              votes
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCandidate(candidate);
              setEditOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-200 transition"
          >
            Edit
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
        </>
      )}
      <EditModal
  open={editOpen}
  candidate={selectedCandidate}
  onClose={() => {
    setEditOpen(false);
    setSelectedCandidate(null);
  }}
  onSubmit={updateCandidateVotes}
/>
    </div>
  );
}