"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast, Toaster } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

 async function handleLogin() {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    toast.error("Please enter your email");
    return;
  }

  console.log("=================================");
  console.log("Original Email:", JSON.stringify(email));
  console.log("Clean Email:", JSON.stringify(cleanEmail));

  setLoading(true);
  setSent(false);

  try {
    console.log("Checking admin email...");

    const { data, error } = await supabase.rpc("is_admin_email", {
      p_email: cleanEmail,
    });

    console.log("RPC Response:", data);
    console.log("RPC Error:", error);
    console.log("Returned Type:", typeof data);

    if (error) {
      console.error(error);
      toast.error(error.message || "Failed to verify admin");
      return;
    }

    if (data !== true) {
      console.log("Admin check failed");
      toast.error("User does not exist");
      return;
    }

    console.log("✅ User exists");
    console.log("Sending magic link...");

    const {
      data: authData,
      error: authError,
    } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    console.log("Auth Response:", authData);
    console.log("Auth Error:", authError);

    if (authError) {
      console.error(authError);
      toast.error(
        authError.message || "Failed to send magic link"
      );
      return;
    }

    console.log("✅ Magic link sent");

    setSent(true);
    toast.success(
      "Magic link sent successfully. Check your email."
    );
  } catch (err: any) {
    console.error("Unexpected Error:", err);

    toast.error(
      err?.message || "An unexpected error occurred."
    );
  } finally {
    console.log("Finished login process");
    console.log("=================================");

    setLoading(false);
  }
}
  return (
      <>
    <Toaster
      position="top-center"
      richColors
      closeButton
    />
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white px-4">

      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-zinc-900/60 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">
              Admin Login
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Secure access to your dashboard
            </p>
          </div>

          {/* INFO BOX (IMPORTANT UX FIX) */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-6 text-xs text-gray-300 space-y-1">
            <p>1. Enter your admin email</p>
            <p>2. We will send a magic login link</p>
            <p>3. Click the link in your email</p>
            <p>4. You will be redirected to dashboard</p>
          </div>

          {/* INPUT */}
          <div className="space-y-4">

            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500 outline-none"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              disabled={!email || loading}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                !email || loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? "Sending magic link..." : "Send Login Link"}
            </button>

            {/* SUCCESS */}
            {sent && (
              <div className="text-center text-sm text-green-400">
                Magic link sent. Check your email inbox or spam folder.
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Admin authentication powered by Cissoft Company
        </p>
      </div>
    </main>
    </>
  );
}