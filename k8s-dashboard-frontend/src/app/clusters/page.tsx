import Link from "next/link";
import { ArrowUpRight, Plus, Cpu, Box, Layers } from "lucide-react";
import { Logo } from "@/shared/components/ui/logo";
import { Button } from "@/shared/components/ui/button";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { Badge } from "@/shared/components/ui/badge";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { getClusters } from "@/services/cluster-service";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";

export default async function ClustersPage() {
  const clusters = await getClusters();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="h-14 border-b border-border px-6 flex items-center justify-between bg-bg-raised/30 backdrop-blur-sm">
        <Logo />
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-text-dim">
            <span className="h-1.5 w-1.5 bg-accent rounded-full animate-pulse-dot" />
            API · ONLINE
          </span>
          <ThemeToggle />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-text-dim tracking-[0.2em] mb-3">
              <span className="w-6 h-px bg-accent" />
              REGISTERED / CLUSTERS
            </div>
            <h1 className="font-display text-3xl font-semibold text-text mb-1">
              Select a cluster
            </h1>
            <p className="text-sm text-text-muted max-w-lg">
              Choose a Kubernetes cluster to observe, or register a new one by
              uploading a kubeconfig.
            </p>
          </div>
          <Link href="/clusters/new">
            <Button variant="primary" size="lg">
              <Plus className="h-4 w-4" />
              ADD CLUSTER
            </Button>
          </Link>
        </div>

        {/* Cluster grid */}
        {clusters.length === 0 ? (
          <EmptyState
            icon={Cpu}
            title="No clusters registered"
            description="Add your first Kubernetes cluster by uploading its kubeconfig file."
            action={
              <Link href="/clusters/new">
                <Button variant="primary">
                  <Plus className="h-4 w-4" />
                  REGISTER CLUSTER
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clusters.map((cluster, i) => (
              <Link
                key={cluster.id}
                href={`/clusters/${cluster.id}/overview`}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <article className="h-full bg-bg-raised border border-border rounded-sm p-5 hover:border-accent/50 hover:bg-bg-raised/80 transition-all duration-200 relative overflow-hidden">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-5 relative">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <StatusDot status={cluster.status} />
                        <Badge variant={cluster.status === "healthy" ? "success" : cluster.status === "warning" ? "warning" : "critical"}>
                          {cluster.status}
                        </Badge>
                      </div>
                      <h3 className="font-display text-base font-medium text-text truncate">
                        {cluster.name}
                      </h3>
                      <p className="text-[10px] font-mono text-text-dim mt-1">
                        {cluster.version} · registered {cluster.createdAt}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-accent transition-colors shrink-0" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 relative">
                    <div className="border-l border-border pl-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Cpu className="h-2.5 w-2.5 text-text-dim" />
                        <span className="text-[9px] font-mono tracking-wider text-text-dim uppercase">
                          Nodes
                        </span>
                      </div>
                      <div className="font-display text-xl text-text">{cluster.nodeCount}</div>
                    </div>
                    <div className="border-l border-border pl-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Box className="h-2.5 w-2.5 text-text-dim" />
                        <span className="text-[9px] font-mono tracking-wider text-text-dim uppercase">
                          Pods
                        </span>
                      </div>
                      <div className="font-display text-xl text-text">{cluster.podCount}</div>
                    </div>
                    <div className="border-l border-border pl-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Layers className="h-2.5 w-2.5 text-text-dim" />
                        <span className="text-[9px] font-mono tracking-wider text-text-dim uppercase">
                          Ns
                        </span>
                      </div>
                      <div className="font-display text-xl text-text">
                        {cluster.namespaceCount}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {/* Add card */}
            <Link
              href="/clusters/new"
              className="group animate-slide-up"
              style={{ animationDelay: `${clusters.length * 60}ms` }}
            >
              <div className="h-full min-h-[180px] border border-dashed border-border rounded-sm flex flex-col items-center justify-center gap-3 hover:border-accent/50 hover:bg-accent/5 transition-all">
                <div className="h-10 w-10 rounded-sm border border-border group-hover:border-accent/50 flex items-center justify-center transition-colors">
                  <Plus className="h-4 w-4 text-text-muted group-hover:text-accent transition-colors" />
                </div>
                <div className="text-center">
                  <div className="font-mono text-xs text-text">Register cluster</div>
                  <div className="font-mono text-[10px] text-text-dim mt-1">
                    upload kubeconfig
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
