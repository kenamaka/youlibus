"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useRealtimeVotes } from "@/hooks/useRealtime";

export default function DashboardStats() {
  const votes = useRealtimeVotes();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="text-white p-6">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* Total Votes */}
      <div className="bg-zinc-900 border border-white/10 p-5 rounded-xl">
        <p className="text-gray-400 text-sm">
          Total Votes
        </p>
        <h2 className="text-2xl font-bold mt-2">
          {votes.length}
        </h2>
      </div>

    </div>
  );
}