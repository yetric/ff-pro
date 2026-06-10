import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";
import { useAuthStore } from "./useProAuth";

export function useProAPI<T>(endpoint: string) {
  const token = useAuthStore((state) => state.token?.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return useQuery({
    queryKey: [endpoint, token],
    queryFn: () => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return apiFetch<T>(endpoint, { token });
    },
    enabled: isAuthenticated && !!token,
  });
}
