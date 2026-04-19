"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Upload, FileText } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Logo } from "@/shared/components/ui/logo";
import { LocaleToggle } from "@/shared/components/ui/locale-toggle";
import { useTranslations } from "next-intl";

export default function NewClusterPage() {
  const router = useRouter();
  const t = useTranslations("clusters.new");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(false);
  const [clusterName, setClusterName] = useState("");
  const [kubeconfig, setKubeconfig] = useState("");
  const [fileName, setFileName] = useState("");

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setKubeconfig(ev.target?.result as string);
    reader.readAsText(file);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: POST to /api/clusters
    await new Promise((r) => setTimeout(r, 800));
    router.push("/clusters");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-14 border-b border-border px-6 flex items-center justify-between bg-bg-raised/30">
        <Logo />
        <div className="flex items-center gap-3">
          <LocaleToggle />
          <Link
            href="/clusters"
            className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            {tc("back").toUpperCase()}
          </Link>
        </div>
      </div>

      <div className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2 text-[10px] font-mono text-text-dim tracking-[0.2em] mb-3">
          <span className="w-6 h-px bg-accent" />
          {t("breadcrumb")}
        </div>
        <h1 className="font-display text-2xl font-semibold text-text mb-2">
          {t("title")}
        </h1>
        <p className="text-sm text-text-muted mb-8">
          {t("description")}
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-bg-raised border border-border p-6 rounded-sm space-y-5"
        >
          <Input
            id="name"
            label={t("nameLabel")}
            placeholder={t("namePlaceholder")}
            value={clusterName}
            onChange={(e) => setClusterName(e.target.value)}
            required
          />

          <div>
            <label className="block text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase mb-2">
              {t("fileLabel")}
            </label>
            <label className="block cursor-pointer">
              <input
                type="file"
                accept=".yaml,.yml,.conf"
                onChange={handleFileUpload}
                className="sr-only"
              />
              <div className="border border-dashed border-border rounded-sm p-6 hover:border-accent/50 hover:bg-accent/5 transition-colors text-center">
                {fileName ? (
                  <div className="flex items-center justify-center gap-2 text-accent">
                    <FileText className="h-4 w-4" />
                    <span className="font-mono text-sm">{fileName}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="h-5 w-5 text-text-muted mx-auto mb-2" />
                    <p className="text-xs font-mono text-text">{t("fileUploadHint")}</p>
                    <p className="text-[10px] font-mono text-text-dim mt-1">{t("fileExtensions")}</p>
                  </>
                )}
              </div>
            </label>
          </div>

          <div>
            <label className="block text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase mb-2">
              {t("pasteLabel")}
            </label>
            <textarea
              value={kubeconfig}
              onChange={(e) => setKubeconfig(e.target.value)}
              placeholder={"apiVersion: v1\nkind: Config\nclusters:\n  - name: ..."}
              rows={8}
              className="w-full bg-bg-sunken border border-border text-text font-mono text-xs p-3 rounded-sm focus:outline-none focus:border-accent/60 resize-none placeholder:text-text-dim"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Link href="/clusters">
              <Button type="button" variant="ghost">{tc("cancel").toUpperCase()}</Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !clusterName || !kubeconfig}
            >
              {loading ? t("submitting") : t("submit")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
