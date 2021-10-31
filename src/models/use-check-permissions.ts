export type UseCheckPermissions = () => UseCheckPermissionsMethods;

export interface UseCheckPermissionsMethods {
  checkPermissions: (permissions?: string[] | string | null, checkAll?: boolean) => boolean;
}
