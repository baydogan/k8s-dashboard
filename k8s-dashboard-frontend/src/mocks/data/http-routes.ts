import type { HTTPRoute } from "@/entities/http-route";

export const MOCK_HTTP_ROUTES: HTTPRoute[] = [
  { name: "api-route",        namespace: "production", parentRefs: ["prod-gateway"],     hostnames: ["api.example.com"],          rules: 4, age: "20d" },
  { name: "frontend-route",   namespace: "production", parentRefs: ["prod-gateway"],     hostnames: ["app.example.com"],          rules: 1, age: "18d" },
  { name: "auth-route",       namespace: "production", parentRefs: ["prod-gateway"],     hostnames: ["auth.example.com"],         rules: 3, age: "15d" },
  { name: "internal-api",     namespace: "production", parentRefs: ["internal-gateway"], hostnames: ["api.internal"],             rules: 2, age: "12d" },
  { name: "metrics-route",    namespace: "monitoring", parentRefs: ["monitoring-gw"],    hostnames: ["metrics.internal"],         rules: 1, age: "3d"  },
  { name: "staging-api",      namespace: "staging",    parentRefs: ["staging-gateway"],  hostnames: ["staging-api.example.com"], rules: 4, age: "20d" },
  { name: "staging-frontend", namespace: "staging",    parentRefs: ["staging-gateway"],  hostnames: ["staging.example.com"],     rules: 1, age: "20d" },
  { name: "webhook-route",    namespace: "production", parentRefs: ["prod-gateway"],     hostnames: ["hooks.example.com"],        rules: 2, age: "8d"  },
];
