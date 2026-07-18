import { useEffect, useState } from "react";
import { fetchJson } from "@/lib/api";

interface OrganizationsResponse {
  organizations: string[];
}

export function useUserOrganizations(): string[] {
  const [organizations, setOrganizations] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchJson<OrganizationsResponse>("/api/users/organizations", controller.signal)
      .then((response) => setOrganizations(response.organizations))
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return organizations;
}
