"use client";

import { Moon, Sun } from "lucide-react";
import { useDashboardStore } from "@/shared/store/dashboard-store";

export function ThemeToggle() {
  const { theme, toggleTheme } = useDashboardStore();

  return (
    <button
      onClick={toggleTheme}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="h-8 w-8 flex items-center justify-center border border-border rounded-sm hover:border-border-strong text-text-muted hover:text-text transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="h-3.5 w-3.5" />
      ) : (
        <Moon className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
