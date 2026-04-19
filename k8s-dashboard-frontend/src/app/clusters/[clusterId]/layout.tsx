import { Sidebar } from "@/shared/components/layout/sidebar";

interface ClusterLayoutProps {
  children: React.ReactNode;
  params: Promise<{ clusterId: string }>;
}

export default async function ClusterLayout({
  children,
  params,
}: ClusterLayoutProps) {
  const { clusterId } = await params;

  return (
    <div className="flex min-h-screen">
      <Sidebar clusterId={clusterId} />
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  );
}
