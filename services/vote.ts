import { supabase } from "@/lib/supabase";

export async function fetchCandidates() {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .order("vote_count", { ascending: false });

  if (error) throw error;

  return data;
}

export async function hasUserVoted(fingerprintId: string) {
  const { data, error } = await supabase
    .from("votes")
    .select("id")
    .eq("fingerprint_id", fingerprintId)
    .maybeSingle();

  if (error) throw error;

  return !!data;
}

export async function castVote(
  candidateId: string,
  fingerprintId: string
) {
  const { data, error } = await supabase.rpc("cast_vote", {
    p_candidate_id: candidateId,
    p_fingerprint_id: fingerprintId,
  });

  if (error) throw error;

  return data;
}