import { Button, Card, CardContent, CardHeader, CardTitle, Text, Alert } from "@yetric/ui";
import { useSearchParams } from "react-router-dom";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  const handleLogin = () => {
    const redirectUri = `${window.location.origin}/auth/callback`;
    const state = Math.random().toString(36).substring(7);

    // Store state in localStorage for verification
    localStorage.setItem("oauth_state", state);

    // Redirect to main app login with callback URL
    window.location.href = `${import.meta.env.VITE_API_BASE_URL.replace("/api/pro", "")}/api/auth/pro?redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Card style={{ width: "100%", maxWidth: "420px" }}>
        <CardHeader>
          <CardTitle>FF Pro</CardTitle>
          <Text style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.5rem" }}>
            Professional football analytics
          </Text>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {error && (
              <Alert color="red">
                <Text>{error}</Text>
              </Alert>
            )}

            <Text style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Sign in with your Fotbollsfeber account to access FF Pro.
            </Text>

            <Button onClick={handleLogin} style={{ width: "100%" }}>
              Login with Fotbollsfeber
            </Button>

            <Text style={{ fontSize: "0.75rem", color: "#6b7280", textAlign: "center" }}>
              You must have an active Pro subscription to access this app.
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
