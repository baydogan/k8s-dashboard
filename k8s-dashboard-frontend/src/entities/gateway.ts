export type GatewayStatus = "Ready" | "NotReady" | "Pending";

export interface Gateway {
  name: string;
  namespace: string;
  gatewayClass: string;
  status: GatewayStatus;
  addresses: string[];
  listeners: number;
  age: string;
}
