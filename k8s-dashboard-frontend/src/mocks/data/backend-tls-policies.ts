import type { BackendTLSPolicy } from "@/entities/backend-tls-policy";

export const MOCK_BACKEND_TLS_POLICIES: BackendTLSPolicy[] = [
  { name: "postgres-tls",     namespace: "database",    targetService: "postgres",        targetPort: 5432, caCertRef: "db-ca-cert",       age: "30d" },
  { name: "redis-tls",        namespace: "cache",       targetService: "redis",           targetPort: 6379, caCertRef: "cache-ca-cert",    age: "21d" },
  { name: "api-backend-tls",  namespace: "production",  targetService: "api-gateway",     targetPort: 8443, caCertRef: "internal-ca",      age: "15d" },
  { name: "auth-backend-tls", namespace: "production",  targetService: "auth-service",    targetPort: 4443, caCertRef: "internal-ca",      age: "12d" },
  { name: "metrics-tls",      namespace: "monitoring",  targetService: "prometheus",      targetPort: 9090, caCertRef: "monitoring-ca",    age: "10d" },
];
