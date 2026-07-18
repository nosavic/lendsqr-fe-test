import { useCallback, useEffect, useState } from "react";
import { fetchJson } from "@/lib/api";
import type { UserStats } from "@/types/user";

type RequestStatus = "loading" | "success" | "error";

interface UseUserStatsResult {
  stats: UserStats | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function useUserStats(): UseUserStatsResult {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetchJson<UserStats>("/api/users/stats", controller.signal);
        if (!active) return;
        setStats(response);
        setStatus("success");
      } catch {
        if (!active || controller.signal.aborted) return;
        setStatus("error");
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, [reloadKey]);

  const refetch = useCallback(() => {
    setStatus("loading");
    setReloadKey((key) => key + 1);
  }, []);

  return {
    stats,
    isLoading: status === "loading",
    isError: status === "error",
    refetch,
  };
}
