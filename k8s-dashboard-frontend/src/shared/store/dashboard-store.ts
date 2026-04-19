import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DashboardStore {
  selectedNamespace: string;
  setSelectedNamespace: (ns: string) => void;

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      selectedNamespace: "all",
      setSelectedNamespace: (ns) => set({ selectedNamespace: ns }),

      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      theme: "dark",
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
    }),
    {
      name: "dashboard-preferences",
    }
  )
);
