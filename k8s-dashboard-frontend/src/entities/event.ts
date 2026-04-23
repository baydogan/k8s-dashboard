export type EventType = "Normal" | "Warning" | "Critical";

export interface ClusterEvent {
  type: EventType;
  reason: string;
  message: string;
  namespace: string;
  involvedObject: string;
  objectKind: "Pod" | "Deployment" | "Node" | "Service" | "ReplicaSet" | "Job";
  count: number;
  age: string;
  lastSeen: string;
}
