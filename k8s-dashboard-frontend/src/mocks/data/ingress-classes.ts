import type { IngressClass } from "@/entities/ingress-class";

export const MOCK_INGRESS_CLASSES: IngressClass[] = [
  { name: "nginx",          controller: "k8s.io/ingress-nginx",                    isDefault: true,  age: "45d" },
  { name: "nginx-internal", controller: "k8s.io/ingress-nginx",                    isDefault: false, age: "30d" },
  { name: "traefik",        controller: "traefik.io/ingress-controller",            isDefault: false, age: "20d" },
  { name: "istio",          controller: "istio.io/ingress-controller",              isDefault: false, age: "15d" },
  { name: "alb",            controller: "ingress.k8s.aws/alb",                     isDefault: false, age: "10d" },
  { name: "gce",            controller: "ingress.gke.io/ingress",                  isDefault: false, age: "60d" },
];
