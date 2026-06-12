import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useRealtimeVotes() {
  const [votes, setVotes] = useState<any[]>([]);

  async function fetchVotes() {
    const { data } = await supabase
      .from("votes")
      .select("*");

    setVotes(data || []);
  }

  useEffect(() => {
    fetchVotes();

    const channel = supabase
      .channel("realtime-votes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "votes",
        },
        () => {
          fetchVotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return votes;
}