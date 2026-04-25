import type { ApiServerSloData } from "@/entities/api-server";

// Simulates a noisy time-series with occasional spikes
function wave(base: number, amp: number, len: number, spikes?: [number, number][]): number[] {
  return Array.from({ length: len }, (_, i) => {
    let v = base + Math.sin(i * 0.6) * amp + (Math.random() * amp * 0.4);
    spikes?.forEach(([idx, val]) => { if (i === idx) v = val; });
    return Math.max(0, v);
  });
}

const N = 24;

export const MOCK_API_SERVER: ApiServerSloData = {
  sloStatus: "met",
  sloTarget: 99.9,
  readAvailability: 99.97,
  writeAvailability: 99.91,
  totalRequestRate: 847,
  errorRate: 0.08,

  latencyRead:  { p50: 18, p90: 67,  p99: 142 },
  latencyWrite: { p50: 11, p90: 44,  p99: 89  },

  verbRates: [
    { verb: "GET",    ratePerSec: 312, errorRate: 0.03 },
    { verb: "LIST",   ratePerSec: 198, errorRate: 0.05 },
    { verb: "WATCH",  ratePerSec: 174, errorRate: 0.00 },
    { verb: "CREATE", ratePerSec: 74,  errorRate: 0.14 },
    { verb: "UPDATE", ratePerSec: 51,  errorRate: 0.08 },
    { verb: "PATCH",  ratePerSec: 28,  errorRate: 0.11 },
    { verb: "DELETE", ratePerSec: 10,  errorRate: 0.20 },
  ],

  statusCodeRates: [
    { code: "2xx", ratePerSec: 845.8, variant: "success"  },
    { code: "4xx", ratePerSec: 0.94,  variant: "warning"  },
    { code: "5xx", ratePerSec: 0.26,  variant: "critical" },
  ],

  memory: {
    current: 502,
    sparkline: wave(492, 14, N),
  },

  cpu: {
    current: 0.072,
    sparkline: wave(0.065, 0.03, N, [[14, 0.128], [15, 0.11]]),
  },

  goroutines: {
    current: 2204,
    sparkline: wave(2210, 18, N, [[8, 2240], [9, 2235], [18, 2228]]),
  },

  workQueueControllers: [
    {
      name: "APIServiceRegistrationController",
      host: "192.168.49.2:8443",
      lastLatencyMs: 79.3,
      sparkline: wave(5, 8, N, [[2, 9200], [3, 400]]),
      color: "stroke-accent",
    },
    {
      name: "DiscoveryController",
      host: "192.168.49.2:8443",
      lastLatencyMs: 9.82,
      sparkline: wave(2, 4, N, [[14, 10200], [15, 800]]),
      color: "stroke-accent-warn",
    },
    {
      name: "DynamicCABundle-aggregator-proxy-cert",
      host: "192.168.49.2:8443",
      lastLatencyMs: null,
      sparkline: wave(0.1, 0.3, N),
      color: "stroke-accent-info",
    },
    {
      name: "DynamicCABundle-client-ca-bundle",
      host: "192.168.49.2:8443",
      lastLatencyMs: null,
      sparkline: wave(0.2, 0.4, N),
      color: "stroke-accent-crit",
    },
    {
      name: "DynamicCABundle-request-header",
      host: "192.168.49.2:8443",
      lastLatencyMs: null,
      sparkline: wave(0.1, 0.2, N),
      color: "stroke-[#e879f9]",
    },
    {
      name: "DynamicCABundle-serving-cert",
      host: "192.168.49.2:8443",
      lastLatencyMs: null,
      sparkline: wave(0.15, 0.3, N),
      color: "stroke-[#a78bfa]",
    },
    {
      name: "DynamicClientCertificate",
      host: "192.168.49.2:8443",
      lastLatencyMs: 0.099,
      sparkline: wave(0.08, 0.15, N),
      color: "stroke-accent",
    },
    {
      name: "DynamicServingCertificateController",
      host: "192.168.49.2:8443",
      lastLatencyMs: 0.099,
      sparkline: wave(0.09, 0.12, N),
      color: "stroke-accent-warn",
    },
    {
      name: "LocalAvailabilityController",
      host: "192.168.49.2:8443",
      lastLatencyMs: 3.79,
      sparkline: wave(1.5, 2.5, N, [[10, 280], [19, 3200]]),
      color: "stroke-accent-info",
    },
  ],
};
