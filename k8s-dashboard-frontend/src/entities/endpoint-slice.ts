export type EndpointSliceAddressType = "IPv4" | "IPv6" | "FQDN";

export interface EndpointSlicePort {
  port: number;
  protocol: "TCP" | "UDP" | "SCTP";
  name?: string;
}

export interface EndpointSlice {
  name: string;
  namespace: string;
  addressType: EndpointSliceAddressType;
  service: string;
  totalEndpoints: number;
  readyEndpoints: number;
  ports: EndpointSlicePort[];
  age: string;
}
