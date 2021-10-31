import { ReactElement } from 'react';

export interface WithPermissionsProps {
  checkAll?: boolean;
  children: ReactElement<string, string>;
  permissions?: string[];
  placeholder?: JSX.Element;
}
