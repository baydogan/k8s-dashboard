"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Terminal } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Logo } from "@/shared/components/ui/logo";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("auth.login");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: integrate with backend /api/auth/login
    await new Promise((r) => setTimeout(r, 600));
    localStorage.setItem("auth_token", "mock_jwt_token");
    router.push("/clusters");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] font-mono text-text-dim">
        <span className="w-2 h-2 bg-accent rounded-full animate-pulse-dot" />
        {tc("systemReady")}
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-mono text-text-dim">
        {t("corner")}
      </div>
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-text-dim">
        {t("internal")}
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-text-dim">
        {new Date().toISOString().split("T")[0]}
      </div>

      <div className="w-full max-w-sm relative">
        <div className="mb-10 flex flex-col items-center">
          <Logo showTag={false} className="scale-125 mb-8" />
          <div className="text-center">
            <h1 className="font-display text-2xl font-semibold text-text mb-2">
              {t("title")}
            </h1>
            <p className="text-sm text-text-muted font-mono">
              <Terminal className="inline h-3 w-3 mr-1" />
              {t("subtitle")}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-bg-raised border border-border p-6 space-y-5 rounded-sm relative"
        >
          <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-accent" />
          <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-accent" />
          <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-accent" />
          <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-accent" />

          <Input
            id="email"
            label={t("emailLabel")}
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            label={t("passwordLabel")}
            type="password"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full">
            {loading ? (
              <span>{t("submitting")}<span className="cursor-blink" /></span>
            ) : (
              <>
                <span>{t("submit")}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs font-mono text-text-muted">
          {t("noAccount")}{" "}
          <Link href="/register" className="text-accent hover:text-accent/80 transition-colors">
            {t("registerLink")} →
          </Link>
        </p>
      </div>
    </div>
  );
}
