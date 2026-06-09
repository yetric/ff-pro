import { create } from "zustand";
import { getToken, setToken, clearToken, isAuthenticated, type AuthToken } from "../lib/auth";

interface AuthStore {
    token: AuthToken | null;
    isLoading: boolean;
    login: (token: AuthToken) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: getToken(),
    isLoading: false,
    login: (token) => {
        setToken(token);
        set({ token });
    },
    logout: () => {
        clearToken();
        set({ token: null });
    },
    isAuthenticated: () => isAuthenticated(),
}));
