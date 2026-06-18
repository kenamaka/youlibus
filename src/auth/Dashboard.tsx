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
   <>
   </>
  );
}