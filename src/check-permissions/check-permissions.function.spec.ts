import { checkPermissions } from './check-permissions.function';

describe('Testing permission checking function', () => {
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
		const currentPermissions = [requiredPermission];

		// Act
		const hasPermissions = checkPermissions(currentPermissions, requiredPermission);

		// Assert
		expect(hasPermissions).toBeTruthy();
	});
	it('Result should be negative if not all required permissions are present', () => {
		// Arrange
		const requiredPermission = ['some-view-permission', 'some-other-permission'];
		const currentPermissions = [requiredPermission[0]];

		// Act
		const hasPermissions = checkPermissions(currentPermissions, requiredPermission);

		// Assert
		expect(hasPermissions).toBeFalsy();
	});
	it('Result should be positive if not all required permissions are present when checkAll parameter is set to false', () => {
		// Arrange
		const requiredPermission = ['some-view-permission', 'some-other-permission'];
		const currentPermissions = [requiredPermission[0]];

		// Act
		const hasPermissions = checkPermissions(currentPermissions, requiredPermission, false);

		// Assert
		expect(hasPermissions).toBeTruthy();
	});
});
