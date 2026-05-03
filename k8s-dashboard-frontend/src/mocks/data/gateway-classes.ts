import type { GatewayClass } from "@/entities/gateway-class";

export const MOCK_GATEWAY_CLASSES: GatewayClass[] = [
  { name: "envoy-gateway",   controller: "gateway.envoyproxy.io/gatewayclass-controller",   status: "Accepted",          age: "30d" },
  { name: "nginx-gateway",   controller: "gateway.nginx.org/nginx-gateway-controller",       status: "Accepted",          age: "20d" },
  { name: "istio",           controller: "istio.io/gateway-controller",                      status: "Accepted",          age: "15d" },
  { name: "traefik-gateway", controller: "traefik.io/gateway-controller",                    status: "Pending",           age: "5d"  },
  { name: "gke-l7",          controller: "networking.gke.io/gateway",                        status: "Accepted",          age: "45d" },
  { name: "experimental-gw", controller: "example.io/experimental-controller",               status: "InvalidParameters", age: "2d"  },
];
