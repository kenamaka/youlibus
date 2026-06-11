"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useVotedCategories(
  fingerprintId: string,
  deviceId: string,
  voteToken: string | null
) {
  const [votedCategories, setVotedCategories] =
    useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fingerprintId || !deviceId) return;

    load();
  }, [fingerprintId, deviceId]);

  async function load() {
    setLoading(true);

    const { data, error } = await supabase
      .from("votes")
      .select("category")
      .or(
        voteToken
          ? `fingerprint_id.eq.${fingerprintId},device_id.eq.${deviceId},vote_token.eq.${voteToken}`
          : `fingerprint_id.eq.${fingerprintId},device_id.eq.${deviceId}`
      );

    if (error) {
      console.error(error);
      setVotedCategories([]);
      setLoading(false);
      return;
    }

    const unique = Array.from(
      new Set(data?.map((v) => v.category))
    );

    setVotedCategories(unique);
    setLoading(false);
  }

  return { votedCategories, loading, refresh: load };
}