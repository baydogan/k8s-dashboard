import type { Gateway } from "@/entities/gateway";

export const MOCK_GATEWAYS: Gateway[] = [
  { name: "prod-gateway",      namespace: "production",  gatewayClass: "envoy-gateway", status: "Ready",    addresses: ["203.0.113.10"],                 listeners: 2, age: "25d" },
  { name: "internal-gateway",  namespace: "production",  gatewayClass: "nginx-gateway", status: "Ready",    addresses: ["10.0.0.5"],                     listeners: 1, age: "15d" },
  { name: "grpc-gateway",      namespace: "production",  gatewayClass: "envoy-gateway", status: "Ready",    addresses: ["203.0.113.11"],                 listeners: 1, age: "10d" },
  { name: "staging-gateway",   namespace: "staging",     gatewayClass: "nginx-gateway", status: "Ready",    addresses: ["10.0.1.5"],                     listeners: 2, age: "20d" },
  { name: "mesh-gateway",      namespace: "istio-system",gatewayClass: "istio",         status: "Ready",    addresses: ["10.96.0.1"],                    listeners: 3, age: "14d" },
  { name: "monitoring-gw",     namespace: "monitoring",  gatewayClass: "nginx-gateway", status: "NotReady", addresses: [],                               listeners: 1, age: "3d"  },
  { name: "experimental-gw",   namespace: "default",     gatewayClass: "experimental-gw",status:"Pending",  addresses: [],                               listeners: 0, age: "2d"  },
];
