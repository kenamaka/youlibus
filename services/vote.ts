import { supabase } from "@/lib/supabase";

// ========================================
// FETCH CANDIDATES
// ========================================

export async function fetchCandidates(
  category: string
) {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("category", category)
    .order("vote_count", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}
// ========================================
// GENERATE / GET VOTE TOKEN
// ========================================

export function getVoteToken() {
  const existingToken =
    localStorage.getItem("vote_token");

  if (existingToken) {
    return existingToken;
  }

  const newToken = crypto.randomUUID();

  localStorage.setItem(
    "vote_token",
    newToken
  );

  return newToken;
}

// ========================================
// CHECK IF USER HAS VOTED
// ========================================
export async function hasUserVoted(
  fingerprintId: string,
  deviceId: string,
  category: string
) {
  const voteToken =
    localStorage.getItem("vote_token");

  const conditions = [
    `fingerprint_id.eq.${fingerprintId}.and.category.eq.${category}`,
    `device_id.eq.${deviceId}.and.category.eq.${category}`,
  ];

  if (voteToken) {
    conditions.push(
      `vote_token.eq.${voteToken}.and.category.eq.${category}`
    );
  }

  const { data, error } = await supabase
    .from("votes")
    .select("id")
    .or(conditions.join(","))
    .limit(1);

  if (error) throw error;

  return data && data.length > 0;
}// ========================================
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
  category: string,
  fingerprintId: string,
  deviceId: string
) {
  const ipAddress = await getUserIp();

  const voteToken = getVoteToken();

  const { data, error } = await supabase.rpc(
    "cast_vote",
    {
      p_candidate_id: candidateId,
      p_category: category,
      p_fingerprint_id: fingerprintId,
      p_device_id: deviceId,
      p_ip_address: ipAddress,
      p_vote_token: voteToken,
    }
  );

  if (error) throw error;

  return data;
}