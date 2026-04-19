"use client";

import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Construction, LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface PlaceholderPageProps {
  title: string;
  breadcrumbs?: string[];
  icon?: LucideIcon;
  description?: string;
}

export function PlaceholderPage({
  title,
  breadcrumbs = [],
  icon: Icon = Construction,
  description,
}: PlaceholderPageProps) {
  const t = useTranslations("placeholder");

  return (
    <>
      <Header title={title} breadcrumbs={breadcrumbs} />
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
          <div className="relative mb-8">
            <div className="absolute inset-0 -m-6 border border-border rounded-sm" />
            <div className="absolute inset-0 -m-12 border border-border/50 rounded-sm" />
            <div className="absolute inset-0 -m-20 border border-border/20 rounded-sm" />
            <div className="relative h-14 w-14 border border-accent/40 rounded-sm bg-bg-raised flex items-center justify-center">
              <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
            </div>
          </div>

          <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim mb-3">
            {t("status")}
          </div>
          <h2 className="font-display text-2xl font-semibold text-text mb-2">{title}</h2>
          <p className="text-sm text-text-muted max-w-md text-center leading-relaxed">
            {description}
          </p>

          <div className="mt-10 w-full max-w-md bg-bg-sunken border border-border rounded-sm overflow-hidden">
            <div className="px-3 py-2 border-b border-border flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-accent-crit/60" />
                <span className="w-2 h-2 rounded-full bg-accent-warn/60" />
                <span className="w-2 h-2 rounded-full bg-accent/60" />
              </div>
              <span className="font-mono text-[10px] text-text-dim ml-2">{t("terminalLabel")}</span>
            </div>
            <div className="p-3 font-mono text-xs space-y-1">
              <div className="text-text-muted">
                <span className="text-accent">$</span> observer status --{t("feature")} {title.toLowerCase()}
              </div>
              <div className="text-text-dim pl-2">
                → {t("feature")}: <span className="text-accent-warn">{t("scaffolded")}</span>
              </div>
              <div className="text-text-dim pl-2">
                → {t("backend")}: <span className="text-accent-warn">{t("pending")}</span>
              </div>
              <div className="text-text-dim pl-2">
                → {t("ui")}: <span className="text-accent">{t("ready")}</span>
                <span className="cursor-blink" />
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
