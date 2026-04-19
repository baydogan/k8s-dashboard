import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/shared/lib/query-provider";
import { ThemeApplier } from "@/shared/components/layout/theme-applier";

export const metadata: Metadata = {
  title: "K8S Observer — Cluster Dashboard",
  description: "Observability dashboard for Kubernetes clusters with AI insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Prevent flash of wrong theme on initial load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=JSON.parse(localStorage.getItem('dashboard-preferences')||'{}');if(p.state&&p.state.theme==='light')document.documentElement.classList.add('light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <QueryProvider>
          <ThemeApplier />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
