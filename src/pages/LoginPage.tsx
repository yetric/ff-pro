import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Alert, Text } from "@yetric/ui";
import { useAuthStore } from "../hooks/useProAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }

      const data = await response.json();
      login(data);
      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Authentication failed. Make sure you're logged in to the main app."
      );
    } finally {
      setIsLoading(false);
    }
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
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {error && (
              <Alert color="red">
                <Text>{error}</Text>
              </Alert>
            )}

            <Input label="Email" placeholder="you@example.com" disabled />
            <Input label="Password" placeholder="Your password" type="password" disabled />

            <Text style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              Log in to the main Fotbollsfeber app first, then click the button below to authenticate.
            </Text>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Authenticate with Pro Token"}
            </Button>
          </form>

          <Text style={{ fontSize: "0.75rem", color: "#6b7280", textAlign: "center", marginTop: "1rem" }}>
            You must have an active Pro subscription to access this app.
          </Text>
        </CardContent>
      </Card>
    </div>
  );
}
