export type GatewayClassStatus = "Accepted" | "InvalidParameters" | "Pending";

export interface GatewayClass {
  name: string;
  controller: string;
  status: GatewayClassStatus;
  age: string;
}
