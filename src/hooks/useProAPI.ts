import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";
import { useAuthStore } from "./useProAuth";

export function useProAPI<T>(endpoint: string) {
  const token = useAuthStore((state) => state.token?.token);

  return useQuery({
    queryKey: [endpoint, token],
    queryFn: () => apiFetch<T>(endpoint, { token }),
  });
}
