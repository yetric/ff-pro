import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Center,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Card,
  Text,
  Container,
  Alert,
} from "@yetric/ui";
import { useAuthStore } from "../hooks/useProAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Call the main app's token endpoint to get JWT
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/token`,
        {
          method: "POST",
          credentials: "include", // Send iron-session cookie
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
    <Center h="100vh">
      <Container size={420}>
        <Stack gap="lg">
          <div>
            <Text size="xl" fw={700} ta="center">
              FF Pro
            </Text>
            <Text size="sm" c="dimmed" ta="center" mt={5}>
              Professional football analytics
            </Text>
          </div>

          <Card withBorder shadow="md" p="lg" radius="md">
            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                {error && (
                  <Alert color="red" title="Error">
                    {error}
                  </Alert>
                )}

                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  disabled
                />

                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  disabled
                />

                <Text size="xs" c="dimmed">
                  Log in to the main Fotbollsfeber app first, then click the
                  button below to authenticate.
                </Text>

                <Button
                  fullWidth
                  type="submit"
                  loading={isLoading}
                >
                  Authenticate with Pro Token
                </Button>
              </Stack>
            </form>
          </Card>

          <Text size="xs" ta="center" c="dimmed">
            You must have an active Pro subscription to access this app.
          </Text>
        </Stack>
      </Container>
    </Center>
  );
}
