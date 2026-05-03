import type { ReferenceGrant } from "@/entities/reference-grant";

export const MOCK_REFERENCE_GRANTS: ReferenceGrant[] = [
  { name: "allow-prod-gateway",   namespace: "production",  fromKind: "HTTPRoute",  fromNamespace: "staging",    toKind: "Service", age: "20d" },
  { name: "allow-grpc-backend",   namespace: "production",  fromKind: "GRPCRoute",  fromNamespace: "production", toKind: "Service", age: "10d" },
  { name: "allow-monitoring",     namespace: "monitoring",  fromKind: "HTTPRoute",  fromNamespace: "production", toKind: "Service", age: "5d"  },
  { name: "cross-ns-backend",     namespace: "database",    fromKind: "HTTPRoute",  fromNamespace: "production", toKind: "Service", age: "15d" },
  { name: "allow-cache-access",   namespace: "cache",       fromKind: "HTTPRoute",  fromNamespace: "production", toKind: "Service", age: "12d" },
];
