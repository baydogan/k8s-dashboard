"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/i18n/actions";

export function LocaleToggle() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function toggle() {
    const next = locale === "tr" ? "en" : "tr";
    startTransition(async () => {
      await setLocale(next);
      window.location.reload();
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      title={locale === "tr" ? "Switch to English" : "Türkçe'ye geç"}
      className="h-8 w-8 flex items-center justify-center border border-border rounded-sm hover:border-border-strong text-text-muted hover:text-text transition-colors font-mono text-[10px] tracking-wider disabled:opacity-50"
    >
      {locale.toUpperCase()}
    </button>
  );
}
