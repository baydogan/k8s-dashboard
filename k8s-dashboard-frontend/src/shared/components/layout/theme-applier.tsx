"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/shared/store/dashboard-store";

export function ThemeApplier() {
  const theme = useDashboardStore((s) => s.theme);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  return null;
}
