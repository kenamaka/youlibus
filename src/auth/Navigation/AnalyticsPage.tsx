"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Vote = {
  id: string;
  ip_address: string;
  created_at: string;
  user_agent?: string;
};

export default function AnalyticsPage() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVotes();
  }, []);

  async function fetchVotes() {
    setLoading(true);

    const { data } = await supabase
      .from("votes")
      .select("id, ip_address, created_at, user_agent");

    setVotes(data || []);
    setLoading(false);
  }

  /* =========================
     🕒 HOURLY VOTING PATTERN
  ========================== */
  const hourlyData = useMemo(() => {
    const hours: Record<number, number> = {};

    votes.forEach((v) => {
      const hour = new Date(v.created_at).getHours();
      hours[hour] = (hours[hour] || 0) + 1;
    });

    return Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      votes: hours[i] || 0,
    }));
  }, [votes]);

  /* =========================
     📱 DEVICE BREAKDOWN
     (basic detection)
  ========================== */
  const deviceData = useMemo(() => {
    let mobile = 0;
    let desktop = 0;

    votes.forEach((v) => {
      const ua = v.user_agent?.toLowerCase() || "";

      if (
        ua.includes("mobile") ||
        ua.includes("android") ||
        ua.includes("iphone")
      ) {
        mobile++;
      } else {
        desktop++;
      }
    });

    return [
      { name: "Mobile", value: mobile },
      { name: "Desktop", value: desktop },
    ];
  }, [votes]);

  /* =========================
     🌍 TOP IP ADDRESSES
  ========================== */
  const ipData = useMemo(() => {
    const map: Record<string, number> = {};

    votes.forEach((v) => {
      if (!v.ip_address) return;
      map[v.ip_address] = (map[v.ip_address] || 0) + 1;
    });

    return Object.entries(map)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [votes]);

  const COLORS = ["#7C3AED", "#22C55E"];

  if (loading) {
    return (
      <div className="p-6 text-gray-500">Loading analytics...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Real-time voting behavior insights
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total Votes</p>
          <p className="text-2xl font-bold">{votes.length}</p>
        </div>

        <div className="bg-white rounded-xl p-4">
          <p className="text-gray-500 text-sm">Unique IPs</p>
          <p className="text-2xl font-bold">
            {new Set(votes.map((v) => v.ip_address)).size}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4">
          <p className="text-gray-500 text-sm">Mobile Votes</p>
          <p className="text-2xl font-bold">
            {deviceData[0].value}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4">
          <p className="text-gray-500 text-sm">Desktop Votes</p>
          <p className="text-2xl font-bold">
            {deviceData[1].value}
          </p>
        </div>
      </div>

      {/* HOURLY CHART */}
      <div className="bg-white rounded-xl p-4">
        <h2 className="font-semibold mb-4">
          Voting Activity by Hour
        </h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="votes"
                fill="#7C3AED"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DEVICE + IP */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* DEVICE */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold mb-4">
            Device Breakdown
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {deviceData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IP LIST */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold mb-4">
            Top Voting Locations (IP)
          </h2>

          <div className="space-y-3">
            {ipData.map((ip) => (
              <div
                key={ip.ip}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-600">{ip.ip}</span>
                <span className="font-semibold">
                  {ip.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}