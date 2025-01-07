import { lazy } from 'react';

const Auth = lazy(() => import('@/components/Pages/Auth/Auth').then((module) => ({ default: module.Auth })));
const Journal = lazy(() =>
  import('@/components/Pages/Journal/Journal').then((module) => ({ default: module.Journal }))
);
const AdminPanel = lazy(() =>
  import('@/components/Pages/AdminPanel/AdminPanel').then((module) => ({ default: module.AdminPanel }))
);

const ProfileSettings = lazy(() =>
  import('@/components/Pages/ProfileSettings/ProfileSettings').then((module) => ({ default: module.ProfileSettings }))
);

export { Auth, Journal, AdminPanel, ProfileSettings };
