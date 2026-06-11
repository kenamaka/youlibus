"use client";

import { useEffect, useState } from "react";

import { fetchCandidates } from "@/services/vote";

import { Candidate } from "@/types/candidate";

interface UseCandidatesReturn {
  candidates: Candidate[];
  loading: boolean;
  refresh: () => Promise<void>;
}

export function useCandidates(
  category?: string
): UseCandidatesReturn {
  const [candidates, setCandidates] =
    useState<Candidate[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCandidates();
  }, [category]);

  async function loadCandidates() {
    try {
      setLoading(true);

      const data = await fetchCandidates(
        category ?? ""
      );

      setCandidates(data || []);
    } catch (error) {
      console.error(error);
      setCandidates([]);
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