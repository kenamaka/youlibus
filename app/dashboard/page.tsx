"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import DashboardStats from "@/src/auth/Dashboard";
import CategoryTable from "@/src/auth/Category";
import Leaderboard from "@/src/auth/Leadership";

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
     <div className="min-h-screen flex items-center justify-center bg-black text-white">
  <div className="flex flex-col items-center gap-4">

    {/* Spinner */}
    <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />

    {/* Text */}
    <p className="text-sm text-gray-400">
      Loading dashboard...
    </p>

  </div>
</div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Voting Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* ADMIN INFO (optional future use) */}
      {user && (
        <p className="text-sm text-gray-400">
          Logged in as: {user.email}
        </p>
      )}

      {/* DASHBOARD COMPONENTS */}
      <DashboardStats />
      <CategoryTable />
      <Leaderboard />
    </main>
  );
}