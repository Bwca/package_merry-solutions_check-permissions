/** @jest-environment jsdom */

import { renderHook } from '@testing-library/react-hooks/dom';

import { createCheckPermissionsHook } from './create-check-permissions-hook.function';

describe('Tests for createCheckPermissionsHook factory and its hook', () => {
  let checkPermissions: (permissions?: string[] | string | null, checkAll?: boolean) => boolean;

  beforeEach(() => {
    const { result } = renderHook(createCheckPermissionsHook(() => ['some-view-permission']));
    checkPermissions = result.current.checkPermissions;
  });

  it('The hook should be created', () => {
    expect(checkPermissions).toBeTruthy();
  });

  it('Result should be positive if no required permissions provided', () => {
    // Arrange
    const currentPermissions: string[] = [];

    // Act
    const hasPermissions = checkPermissions(currentPermissions);

    // Assert
    expect(hasPermissions).toBeTruthy();
  });
  it('Result should be positive if required permissions are present in current permissions', () => {
    // Arrange
    const requiredPermission = 'some-view-permission';

    // Act
    const hasPermissions = checkPermissions(requiredPermission);

    // Assert
    expect(hasPermissions).toBeTruthy();
  });
  it('Result should be negative if not all required permissions are present', () => {
    // Arrange
    const requiredPermission = ['some-view-permission', 'some-other-permission'];

    // Act
    const hasPermissions = checkPermissions(requiredPermission);

    // Assert
    expect(hasPermissions).toBeFalsy();
  });
  it('Result should be positive if not all required permissions are present when checkAll parameter is set to false', () => {
    // Arrange
    const requiredPermission = ['some-view-permission', 'some-other-permission'];

    // Act
    const hasPermissions = checkPermissions(requiredPermission, false);

    // Assert
    expect(hasPermissions).toBeTruthy();
  });
});
