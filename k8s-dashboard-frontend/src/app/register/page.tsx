"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, UserPlus } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Logo } from "@/shared/components/ui/logo";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: integrate with backend /api/auth/register
    await new Promise((r) => setTimeout(r, 600));
    localStorage.setItem("auth_token", "mock_jwt_token");
    router.push("/clusters");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] font-mono text-text-dim">
        <span className="w-2 h-2 bg-accent rounded-full animate-pulse-dot" />
        SYSTEM · READY
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-mono text-text-dim">
        [AUTH / REGISTER / NEW]
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center">
          <Logo showTag={false} className="scale-125 mb-8" />
          <div className="text-center">
            <h1 className="font-display text-2xl font-semibold text-text mb-2">
              Create Account
            </h1>
            <p className="text-sm text-text-muted font-mono">
              <UserPlus className="inline h-3 w-3 mr-1" />
              provision_new_operator
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
            label="Email"
            type="email"
            placeholder="ops@k8s.internal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="min. 8 characters"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <span>PROVISIONING<span className="cursor-blink" /></span>
            ) : (
              <>
                <span>CREATE ACCOUNT</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs font-mono text-text-muted">
          Already registered?{" "}
          <Link
            href="/login"
            className="text-accent hover:text-accent/80 transition-colors"
          >
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
}
