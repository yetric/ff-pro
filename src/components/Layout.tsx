import { Outlet, useNavigate } from "react-router-dom";
import { AppShell, Group, NavLink, Stack, Button, Text, Avatar, Menu } from "@yetric/ui";
import { useAuthStore } from "../hooks/useProAuth";

export default function Layout() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: true },
      }}
      padding="md"
    >
      <AppShell.Header withBorder p="md">
        <Group justify="space-between" w="100%">
          <Text size="lg" fw={700}>
            FF Pro
          </Text>
          <Menu position="bottom-end" shadow="md">
            <Menu.Target>
              <Avatar color="blue" radius="xl" style={{ cursor: "pointer" }} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item disabled>
                <Text size="sm">{token?.tier}</Text>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" onClick={handleLogout}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <NavLink
            label="Dashboard"
            onClick={() => navigate("/")}
            active={location.pathname === "/"}
          />
          <NavLink
            label="Nerd View"
            onClick={() => navigate("/nerd")}
            active={location.pathname === "/nerd"}
          />
          {/* TODO: Add more pages */}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
