// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';

import { UseCheckPermissions, WithPermissions, WithPermissionsProps } from '../models';

export function createWithPermissionsWrapper(useCheckPermissions: UseCheckPermissions): WithPermissions {
  return ({ checkAll = true, children, permissions, placeholder = <div /> }: WithPermissionsProps) => {
    const { checkPermissions } = useCheckPermissions();
    return checkPermissions(permissions, checkAll) ? children : placeholder;
  };
}
