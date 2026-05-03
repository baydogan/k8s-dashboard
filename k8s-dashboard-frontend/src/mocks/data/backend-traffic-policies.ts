import type { BackendTrafficPolicy } from "@/entities/backend-traffic-policy";

export const MOCK_BACKEND_TRAFFIC_POLICIES: BackendTrafficPolicy[] = [
  { name: "api-traffic-policy",     namespace: "production", targetService: "api-gateway",     loadBalancer: "LeastRequest",   age: "20d" },
  { name: "auth-traffic-policy",    namespace: "production", targetService: "auth-service",    loadBalancer: "RoundRobin",     age: "18d" },
  { name: "worker-traffic-policy",  namespace: "production", targetService: "worker-queue",    loadBalancer: "Random",         age: "15d" },
  { name: "session-traffic-policy", namespace: "production", targetService: "frontend",        loadBalancer: "ConsistentHash", age: "12d" },
  { name: "db-traffic-policy",      namespace: "database",   targetService: "postgres",        loadBalancer: "LeastRequest",   age: "25d" },
  { name: "cache-traffic-policy",   namespace: "cache",      targetService: "redis",           loadBalancer: "RoundRobin",     age: "20d" },
  { name: "staging-policy",         namespace: "staging",    targetService: "api-gateway",     loadBalancer: "RoundRobin",     age: "14d" },
];
