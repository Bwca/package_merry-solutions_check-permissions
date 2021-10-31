import { createCheckPermissionsHook } from '../create-check-permissions-hook';
import { createWithPermissionsWrapper } from '../create-with-permissions-wrapper';
import { GetPermissions, UseCheckPermissions, WithPermissions } from '../models';

export function createPermissionCheckers(fun: GetPermissions): PermissionCheckers {
  const useCheckPermissions = createCheckPermissionsHook(fun);
  const withPermissions = createWithPermissionsWrapper(useCheckPermissions);
  return {
    useCheckPermissions,
    WithPermissions: withPermissions,
  };
}

interface PermissionCheckers {
  useCheckPermissions: UseCheckPermissions;
  WithPermissions: WithPermissions;
}
