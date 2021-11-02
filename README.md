# react-check-permissions

## Well, what is it?

**react-check-permissions** is a simple package for checking user permissions in a React frontend application. It provides a hook and a wrapper for conditional component rendering.

## How to use it

Install with the package manager of your choice:

```bash
npm i @merry-solutions/react-check-permissions
```

or

```bash
yarn add @merry-solutions/react-check-permissions
```

Create a file to export permission checkers, provided by this package, i.e. `permission-checkers.ts`.

Import factory function `createPermissionCheckers` from `@merry-solutions/react-check-permissions` and generate the hook and wrapper component to export and use in your application. The only argument it expects is a function for obtaining current user rights with `() => string[]` signature.

For example, let's imagine you are storing user profile in redux, with userProfile reducer:

```typescript
// ./store.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    userProfile: (state, action) => ({
      name: 'Bob',
      permissions: ['THE_ONLY_PERMISSION_I_HAVE'],
    }),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

Generating permission checkers in this case would involve using useSelector, to get the slice with user permissions:

```typescript
// ./permission-checkers.ts
import { createPermissionCheckers } from '@merry-solutions/react-check-permissions';
import { useAppSelector } from './store';

export const { useCheckPermissions, WithPermissions } = createPermissionCheckers(() =>
  useAppSelector(({ userProfile }) => userProfile.permissions)
);
```

Once you have generated `useCheckPermissions` and `WithPermissions`, they can be used anywhere in the application.

### Using the hook to check permissions

The `checkPermissions` method the hook provides expects a permission or an array of permissions to check and a boolean flag `checkAll`, which denotes if all permissions to be checked are required to be present in the available permissions or not.
Use it in your components when you need to check permissions to take decisions.

```typescript
const { checkPermissions } = useCheckPermissions();
console.log(checkPermissions('THE_ONLY_PERMISSION_I_HAVE'));
// true, since its the only permission Bob has
```

### Using the wrapper component for conditional rendering

`WithPermissions` is a component that displays or hides ~~yo kids hide yo wife~~ children based on the permission check (which it performs under the hood discreetly using the same `useCheckPermissions` hook). It accepts same parameters as the hook does, with one additional being a placeholder to show in cases the user has no right to view the children.

```typescript
<WithPermissions permissions={['THE_PERMISSION_BOB_DOESNT_HAVE']} placeholder={<p>Go away or something.</p>}>
  <p>Learn super secret stuff</p>
</WithPermissions>;
{
  /* And of course Bob's going to take a hike. */
}
```

That's it, plain and simple :)
