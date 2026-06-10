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
    const error = searchParams.get("error");

    // Clear state from localStorage
    localStorage.removeItem("oauth_state");

    if (error) {
      navigate(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!token) {
      navigate("/login?error=No token received");
      return;
    }

    // Token is base64-encoded JSON, decode it to verify format
    try {
      const tokenData = JSON.parse(atob(token));

      // Store the original base64 token string, not the parsed data
      login({
        token: token, // Store the base64 string itself
        expiresAt: tokenData.expiresAt,
        tier: tokenData.tier,
      });
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
