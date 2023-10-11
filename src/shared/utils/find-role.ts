import { parentRoles } from "../consts/parent-roles";

export function findRole(value: string) {
  return parentRoles.find((r) => r.value === value)?.label;
}
