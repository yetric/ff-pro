/**
 * JWT token management for Pro API
 */

const TOKEN_KEY = import.meta.env.VITE_STORAGE_KEY || "ff_pro_auth";

export interface AuthToken {
    token: string;
    expiresAt: number;
    tier: "free" | "scout" | "pro";
}

export function getToken(): AuthToken | null {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return null;

    try {
        const token = JSON.parse(stored) as AuthToken;
        if (token.expiresAt < Date.now()) {
            localStorage.removeItem(TOKEN_KEY);
            return null;
        }
        return token;
    } catch {
        return null;
    }
}

export function setToken(token: AuthToken): void {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
    return getToken() !== null;
}
