export function generateMockPodLogs(podName: string, container: string, tailLines: number): string {
  const now = new Date();
  const isCrash   = podName.includes("worker-queue") || podName.includes("crash");
  const isDB      = podName.includes("postgres") || podName.includes("redis") || podName.includes("mysql");
  const isMetrics = podName.includes("metrics") || podName.includes("prometheus");

  const templates = isCrash
    ? [
        (ts: string, n: number) => `${ts} INFO  [${container}] Starting worker process (attempt ${n})`,
        (ts: string) => `${ts} INFO  [${container}] Connecting to message broker at rabbitmq:5672`,
        (ts: string) => `${ts} ERROR [${container}] dial tcp: connect: connection refused`,
        (ts: string) => `${ts} ERROR [${container}] Failed to establish connection after 30s timeout`,
        (ts: string, n: number) => `${ts} WARN  [${container}] Backing off for ${n * 2}s before retry`,
        (ts: string) => `${ts} FATAL [${container}] Max retries exceeded, exiting with code 1`,
      ]
    : isDB
    ? [
        (ts: string) => `${ts} INFO  [${container}] database system is ready to accept connections`,
        (ts: string) => `${ts} DEBUG [${container}] connection received: host=10.42.1.22 user=app database=main`,
        (ts: string) => `${ts} DEBUG [${container}] execute: SELECT * FROM sessions WHERE expires_at > NOW()`,
        (ts: string) => `${ts} INFO  [${container}] checkpoint starting: time`,
        (ts: string) => `${ts} INFO  [${container}] checkpoint complete: wrote 12 buffers (0.1%); 0 WAL file added`,
        (ts: string) => `${ts} DEBUG [${container}] autovacuum: processing database "main"`,
      ]
    : isMetrics
    ? [
        (ts: string) => `${ts} INFO  [${container}] Server is ready to receive web requests.`,
        (ts: string) => `${ts} DEBUG [${container}] Scrape target discovered: http://10.42.1.15:9090/metrics`,
        (ts: string) => `${ts} INFO  [${container}] Completed scrape of 142 samples in 12ms`,
        (ts: string) => `${ts} WARN  [${container}] Target scrape took longer than expected: 850ms`,
        (ts: string) => `${ts} DEBUG [${container}] TSDB compaction started`,
        (ts: string) => `${ts} INFO  [${container}] TSDB GC duration: 2.1ms`,
      ]
    : [
        (ts: string) => `${ts} INFO  [${container}] Server listening on :8080`,
        (ts: string) => `${ts} INFO  [${container}] GET /health 200 OK (2ms)`,
        (ts: string) => `${ts} DEBUG [${container}] Cache hit for key: user:session:abc123`,
        (ts: string) => `${ts} INFO  [${container}] POST /api/v1/events 201 Created (18ms)`,
        (ts: string) => `${ts} INFO  [${container}] GET /api/v1/pods 200 OK (42ms)`,
        (ts: string) => `${ts} WARN  [${container}] Request queue depth reaching 80% capacity`,
        (ts: string) => `${ts} DEBUG [${container}] Processed batch of 64 items`,
      ];

  const lines: string[] = [];
  for (let i = tailLines; i > 0; i--) {
    const ts = new Date(now.getTime() - i * 3500).toISOString().replace("T", " ").slice(0, 23);
    lines.push(templates[i % templates.length](ts, tailLines - i + 1));
  }
  return lines.join("\n");
}
