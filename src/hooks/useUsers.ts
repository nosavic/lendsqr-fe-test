import { useCallback, useEffect, useState } from "react";
import { fetchJson } from "@/lib/api";
import { filtersToSearchParams } from "@/lib/user-filters";
import type { UserFilters } from "@/lib/user-filters";
import type { User } from "@/types/user";

interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
}

interface UseUsersParams {
  page: number;
  pageSize: number;
  filters: UserFilters;
}

interface UseUsersResult {
  users: User[];
  total: number;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
}

export function useUsers({ page, pageSize, filters }: UseUsersParams): UseUsersResult {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [isError, setIsError] = useState(false);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const filterParams = filtersToSearchParams(filters).toString();
  const requestKey = `${page}|${pageSize}|${filterParams}|${reloadKey}`;

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    (async () => {
      const params = new URLSearchParams(filterParams);
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));

      try {
        const response = await fetchJson<UsersResponse>(`/api/users?${params.toString()}`, controller.signal);
        if (!active) return;
        setUsers(response.data);
        setTotal(response.total);
        setIsError(false);
        setLoadedKey(requestKey);
      } catch {
        if (!active || controller.signal.aborted) return;
        setIsError(true);
        setLoadedKey(requestKey);
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, [page, pageSize, filterParams, reloadKey, requestKey]);

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  const isFetching = loadedKey !== requestKey;

  return {
    users,
    total,
    isLoading: isFetching && loadedKey === null,
    isFetching,
    isError,
    refetch,
  };
}
