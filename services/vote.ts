import { supabase } from "@/lib/supabase";

export async function fetchCandidates() {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .order("vote_count", { ascending: false });

  if (error) throw error;

  return data;
}

// ========================================
// CHECK IF USER HAS VOTED
// ========================================

export async function hasUserVoted(
  fingerprintId: string,
  deviceId: string
) {
  const { data, error } = await supabase
    .from("votes")
    .select("id")
    .or(
      `fingerprint_id.eq.${fingerprintId},device_id.eq.${deviceId}`
    )
    .maybeSingle();

  if (error) throw error;

  return !!data;
}

// ========================================
// GET USER IP
// ========================================

export async function getUserIp() {
  const response = await fetch("/api/ip");

  const data = await response.json();

  return data.ip;
}

// ========================================
// CAST VOTE
// ========================================

export async function castVote(
  candidateId: string,
  fingerprintId: string,
  deviceId: string
) {
  // Get real IP from backend
  const ipAddress = await getUserIp();

  const { data, error } = await supabase.rpc(
    "cast_vote",
    {
      p_candidate_id: candidateId,
      p_fingerprint_id: fingerprintId,
      p_device_id: deviceId,
      p_ip_address: ipAddress,
    }
  );

  if (error) throw error;

  return data;
}