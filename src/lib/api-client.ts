/**
 * HTTP client for Pro API endpoints
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3005/api/pro";

export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit & { token?: string },
): Promise<T> {
    const { token, ...fetchOptions } = options || {};

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...fetchOptions,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
}
