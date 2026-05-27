"use client";

import { useEffect, useState } from "react";
import { fetchCandidates } from "@/services/vote";
import { Candidate } from "@/types/candidate";

export function useCandidates() {
  const [candidates, setCandidates] = useState<
    Candidate[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidates();
  }, []);

  async function loadCandidates() {
    try {
      const data = await fetchCandidates();

      setCandidates(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    candidates,
    loading,
    refresh: loadCandidates,
  };
}