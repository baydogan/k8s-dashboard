export type SloStatus = "met" | "at_risk" | "violated";

export interface VerbRate {
  verb: string;
  ratePerSec: number;
  errorRate: number;
}

export interface LatencyPercentiles {
  p50: number;
  p90: number;
  p99: number;
}

export interface StatusCodeRate {
  code: string;
  ratePerSec: number;
  variant: "success" | "warning" | "critical" | "muted";
}

export interface WorkQueueController {
  name: string;
  host: string;
  lastLatencyMs: number | null;
  sparkline: number[];
  color: string;
}

export interface TimeSeries {
  current: number;
  sparkline: number[];
}

export interface ApiServerSloData {
  sloStatus: SloStatus;
  sloTarget: number;
  readAvailability: number;
  writeAvailability: number;
  totalRequestRate: number;
  errorRate: number;
  latencyRead: LatencyPercentiles;
  latencyWrite: LatencyPercentiles;
  verbRates: VerbRate[];
  statusCodeRates: StatusCodeRate[];
  memory: TimeSeries;
  cpu: TimeSeries;
  goroutines: TimeSeries;
  workQueueControllers: WorkQueueController[];
}
