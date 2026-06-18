"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import DashboardHeader from "@/src/auth/Navbar";
import DashboardStats from "@/src/auth/Dashboard";
import CategoryDistributionChart from "@/src/auth/Category";
import WinnersGrid from "@/src/auth/WinnerGrid";
import TopNomineesChart from "@/src/auth/TopNominee";
import CategoryBreakdown from "@/src/auth/CateogryBreakdown";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        router.replace("/login");
        return;
      }

      setUser(session.user);
      setLoading(false);
    }

    checkAuth();

    const { data: listener } =
      supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          router.replace("/login");
        } else {
          setUser(session.user);
        }
      });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />

          <p className="text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <DashboardHeader
        email={user?.email}
        onLogout={handleLogout}
      />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">

        {/* OVERVIEW STATS */}
        <DashboardStats />

        {/* CATEGORY DISTRIBUTION */}
        <CategoryDistributionChart />

        {/* CURRENT CATEGORY WINNERS */}
        <WinnersGrid />

        {/* TOP NOMINEES OVERALL */}
        <TopNomineesChart />

        {/* CATEGORY ACCORDION BREAKDOWN */}
        <CategoryBreakdown />

      </div>
    </main>
  );
}