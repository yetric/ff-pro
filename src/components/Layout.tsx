import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Drawer, DrawerContent, DrawerTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Avatar, Text } from "@yetric/ui";
import { useAuthStore } from "../hooks/useProAuth";
import styles from "./Layout.module.css";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { label: "Dashboard", path: "/" },
    { label: "Nerd View", path: "/nerd" },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const NavButtons = ({ onClick }: { onClick?: (path: string) => void }) => (
    <ul className={styles.navList}>
      {navigationItems.map((item) => (
        <li key={item.path} className={styles.navItem}>
          <Button
            variant={isActive(item.path) ? "default" : "ghost"}
            onClick={() => onClick?.(item.path) || navigate(item.path)}
          >
            {item.label}
          </Button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.layoutContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Text className={styles.title}>FF Pro</Text>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* Mobile Hamburger */}
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" className={styles.hamburgerButton}>
                ☰
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className={styles.drawerContent}>
                <NavButtons onClick={handleNavClick} />
              </div>
            </DrawerContent>
          </Drawer>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar style={{ cursor: "pointer" }} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                <Text style={{ fontSize: "0.75rem" }}>{token?.tier || "free"}</Text>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Layout */}
      <div className={styles.mainLayout}>
        {/* Desktop Sidebar */}
        <aside className={styles.sidebar}>
          <NavButtons />
        </aside>

        {/* Content */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <Text>© 2026 FF Pro. All rights reserved.</Text>
      </footer>
    </div>
  );
}
