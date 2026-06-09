import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";
import { useAuthStore } from "./useProAuth";

export function useProAPI<T>(
    endpoint: string,
    options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">,
) {
    const token = useAuthStore((state) => state.token?.token);

    return useQuery<T, Error>({
        queryKey: [endpoint, token],
        queryFn: () => apiFetch<T>(endpoint, { token }),
        ...options,
    });
}
