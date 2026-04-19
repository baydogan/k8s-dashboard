"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowLeft, Upload, FileText } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Logo } from "@/shared/components/ui/logo";

export default function NewClusterPage() {
  const router = useRouter();
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

  async function handleSubmit(e: FormEvent) {
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
        <Link
          href="/clusters"
          className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-text transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          BACK
        </Link>
      </div>

      <div className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2 text-[10px] font-mono text-text-dim tracking-[0.2em] mb-3">
          <span className="w-6 h-px bg-accent" />
          CLUSTERS / NEW
        </div>
        <h1 className="font-display text-2xl font-semibold text-text mb-2">
          Register a new cluster
        </h1>
        <p className="text-sm text-text-muted mb-8">
          Upload a kubeconfig file to connect a Kubernetes cluster. Your
          credentials are encrypted at rest.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-bg-raised border border-border p-6 rounded-sm space-y-5"
        >
          <Input
            id="name"
            label="Cluster Label"
            placeholder="production-eu-west-1"
            value={clusterName}
            onChange={(e) => setClusterName(e.target.value)}
            required
          />

          {/* File upload */}
          <div>
            <label className="block text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase mb-2">
              Kubeconfig File
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
                    <p className="text-xs font-mono text-text">
                      Click to upload kubeconfig
                    </p>
                    <p className="text-[10px] font-mono text-text-dim mt-1">
                      .yaml / .yml / .conf
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Paste alternative */}
          <div>
            <label className="block text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase mb-2">
              Or paste directly
            </label>
            <textarea
              value={kubeconfig}
              onChange={(e) => setKubeconfig(e.target.value)}
              placeholder="apiVersion: v1&#10;kind: Config&#10;clusters:&#10;  - name: ..."
              rows={8}
              className="w-full bg-bg-sunken border border-border text-text font-mono text-xs p-3 rounded-sm focus:outline-none focus:border-accent/60 resize-none placeholder:text-text-dim"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Link href="/clusters">
              <Button type="button" variant="ghost">
                CANCEL
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !clusterName || !kubeconfig}
            >
              {loading ? "CONNECTING..." : "REGISTER CLUSTER"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
