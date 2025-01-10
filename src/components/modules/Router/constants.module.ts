import { lazy } from 'react';

const Auth = lazy(() => import('@/components/Pages/Auth/Auth').then((module) => ({ default: module.Auth })));

const JournalMobile = lazy(() =>
  import('@/components/Pages/Journal/JournalMobile/JournalMobile').then((module) => ({ default: module.JournalMobile }))
);

const JournalDesktop = lazy(() =>
  import('@/components/Pages/Journal/JournalDesktop/JournalDesktop').then((module) => ({
    default: module.JournalDesktop
  }))
);
const AdminPanel = lazy(() =>
  import('@/components/Pages/AdminPanel/AdminPanel').then((module) => ({ default: module.AdminPanel }))
);

const ProfileSettings = lazy(() =>
  import('@/components/Pages/ProfileSettings/ProfileSettings').then((module) => ({ default: module.ProfileSettings }))
);

export { Auth, JournalMobile, JournalDesktop, AdminPanel, ProfileSettings };
