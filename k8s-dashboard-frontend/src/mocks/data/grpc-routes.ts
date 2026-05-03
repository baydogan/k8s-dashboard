import type { GRPCRoute } from "@/entities/grpc-route";

export const MOCK_GRPC_ROUTES: GRPCRoute[] = [
  { name: "auth-grpc-route",    namespace: "production", parentRefs: ["grpc-gateway"],    hostnames: ["auth-grpc.example.com"],    rules: 3, age: "10d" },
  { name: "payment-grpc-route", namespace: "production", parentRefs: ["grpc-gateway"],    hostnames: ["payment-grpc.example.com"], rules: 2, age: "9d"  },
  { name: "order-grpc-route",   namespace: "production", parentRefs: ["grpc-gateway"],    hostnames: ["orders-grpc.example.com"],  rules: 4, age: "8d"  },
  { name: "internal-rpc",       namespace: "production", parentRefs: ["internal-gateway"],hostnames: ["rpc.internal"],             rules: 2, age: "7d"  },
  { name: "mesh-grpc",          namespace: "istio-system",parentRefs: ["mesh-gateway"],   hostnames: [],                           rules: 1, age: "14d" },
];
