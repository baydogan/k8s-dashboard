export interface RoleBinding {
  name: string;
  namespace: string;
  roleRef: string;
  roleKind: "Role" | "ClusterRole";
  subjects: number;
  age: string;
}
