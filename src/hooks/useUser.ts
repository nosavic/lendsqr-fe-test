import { useCallback, useEffect, useState } from "react";
import { fetchJson, isNotFound } from "@/lib/api";
import { readCachedUser, writeCachedUser } from "@/lib/user-storage";
import type { User } from "@/types/user";

type RequestStatus = "loading" | "success" | "error" | "notfound";

interface UseUserResult {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isNotFound: boolean;
  refetch: () => void;
}

export function useUser(id: string | undefined): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!id) return;

    let active = true;
    const controller = new AbortController();

    (async () => {
      const cached = readCachedUser(id);
      if (cached && active) {
        setUser(cached);
        setStatus("success");
      }

      try {
        const fresh = await fetchJson<User>(`/api/users/${id}`, controller.signal);
        if (!active) return;
        setUser(fresh);
        writeCachedUser(fresh);
        setStatus("success");
      } catch (error) {
        if (!active || controller.signal.aborted) return;
        if (isNotFound(error)) {
          setStatus("notfound");
        } else if (!cached) {
          setStatus("error");
        }
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, [id, reloadKey]);

  const refetch = useCallback(() => {
    setStatus("loading");
    setReloadKey((key) => key + 1);
  }, []);

  return {
    user,
    isLoading: status === "loading",
    isError: status === "error",
    isNotFound: status === "notfound",
    refetch,
  };
}
