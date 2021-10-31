import { UseCheckPermissions, WithPermissions, WithPermissionsProps } from '../models';

export function createWithPermissionsWrapper(useCheckPermissions: UseCheckPermissions): WithPermissions {
	return ({ checkAll = true, children, permissions, placeholder = <div /> }: WithPermissionsProps) => {
		const { checkPermissions } = useCheckPermissions();
		return checkPermissions(permissions, checkAll) ? children : placeholder;
	};
}
