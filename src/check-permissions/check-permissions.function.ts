export function checkPermissions(currentPermissions: string[], requiredPermissions?: string[] | string | null, checkAll = true): boolean {
  if (!requiredPermissions) {
    return true;
  }
  if (!Array.isArray(requiredPermissions)) {
    requiredPermissions = [requiredPermissions];
  }

  if (checkAll) {
    return requiredPermissions.every((p) => currentPermissions.includes(p));
  }

  return requiredPermissions.some((p) => currentPermissions.includes(p));
}
