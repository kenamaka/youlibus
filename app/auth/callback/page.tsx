"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // This processes the access_token from the URL
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth callback error:", error);
          router.replace("/login");
          return;
        }

        // If session exists → go to dashboard
        if (data.session) {
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        router.replace("/login");
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
        <p>Verifying authentication...</p>
      </div>
    </div>
  );
}