"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Logo } from "@/shared/components/ui/logo";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("auth.login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    localStorage.setItem("auth_token", "mock_jwt_token");
    router.push("/clusters");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Logo showTag={false} />
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-text mb-1">{t("title")}</h1>
            <p className="text-sm text-text-muted">{t("subtitle")}</p>
          </div>
        </div>

        <div className="bg-bg-raised border border-border rounded-xl p-6 shadow-card space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full mt-2">
              {loading ? (
                <span>{t("submitting")}<span className="cursor-blink" /></span>
              ) : (
                <>
                  <span>{t("submit")}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-text-muted">
          {t("noAccount")}{" "}
          <Link href="/register" className="text-accent hover:text-accent/80 font-medium transition-colors">
            {t("registerLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
