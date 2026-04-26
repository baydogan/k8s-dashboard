export interface EndpointPort {
  port: number;
  protocol: "TCP" | "UDP" | "SCTP";
  name?: string;
}

export interface Endpoint {
  name: string;
  namespace: string;
  readyAddresses: number;
  notReadyAddresses: number;
  ports: EndpointPort[];
  age: string;
}
