import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader, Text, Box } from "@yetric/ui";
import { useAuthStore } from "../hooks/useProAuth";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = searchParams.get("token");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    // Check state for CSRF protection
    const storedState = localStorage.getItem("oauth_state");
    localStorage.removeItem("oauth_state");

    if (error) {
      navigate(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!token) {
      navigate("/login?error=No token received");
      return;
    }

    if (state !== storedState) {
      navigate("/login?error=Invalid state parameter");
      return;
    }

    // Parse token (format: {token, expiresAt, tier})
    try {
      const tokenData = JSON.parse(atob(token));
      login(tokenData);
      navigate("/");
    } catch (err) {
      navigate("/login?error=Invalid token format");
    }
  }, [searchParams, login, navigate]);

  return (
    <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{ textAlign: "center" }}>
        <Loader />
        <Text style={{ marginTop: "1rem", color: "#6b7280" }}>Authenticating...</Text>
      </div>
    </Box>
  );
}
