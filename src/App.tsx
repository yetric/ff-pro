import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@yetric/ui/styles";
import { Center, Stack, Text, Button, ThemeProvider } from "@yetric/ui";
import { useAuthStore } from "./hooks/useProAuth";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NerdViewPage from "./pages/NerdViewPage";
import "./App.css";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  useEffect(() => {
    // Set dark theme as default
    document.documentElement.setAttribute("data-mantine-color-scheme", "dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={{ colorScheme: "dark" }}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<DashboardPage />} />
              <Route path="/nerd" element={<NerdViewPage />} />
            </Route>

            <Route
              path="*"
              element={
                <Center h="100vh">
                  <Stack gap="md" align="center">
                    <Text size="xl" fw={600}>
                      Page not found
                    </Text>
                    <Button
                      onClick={() => (window.location.href = "/")}
                    >
                      Go home
                    </Button>
                  </Stack>
                </Center>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
