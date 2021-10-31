import { checkPermissions } from '../check-permissions';
import { GetPermissions, UseCheckPermissions } from '../models';

export function createCheckPermissionsHook(getCurrentPermissions: GetPermissions): UseCheckPermissions {
	return () => {
		return {
			checkPermissions: (permissions?: string[] | string | null, checkAll = true): boolean =>
				checkPermissions(getCurrentPermissions(), permissions, checkAll),
		};
	};
}
