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
          <div className="h-14 w-14 rounded-xl border border-border bg-bg-raised shadow-card flex items-center justify-center mb-6">
            <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
          </div>

          <p className="text-xs font-mono text-text-dim mb-2 tracking-wider uppercase">
            {t("status")}
          </p>
          <h2 className="text-2xl font-semibold text-text mb-2">{title}</h2>
          <p className="text-sm text-text-muted max-w-md text-center leading-relaxed">
            {description}
          </p>

          <div className="mt-10 w-full max-w-md bg-bg-sunken border border-border rounded-lg overflow-hidden shadow-card">
            <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-crit/60" />
              <span className="h-2 w-2 rounded-full bg-accent-warn/60" />
              <span className="h-2 w-2 rounded-full bg-accent/60" />
              <span className="font-mono text-[10px] text-text-dim ml-2">{t("terminalLabel")}</span>
            </div>
            <div className="p-4 font-mono text-xs space-y-1.5">
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
