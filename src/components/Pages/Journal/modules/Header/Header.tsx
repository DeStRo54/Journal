import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.css';
import { AdminLogo } from '@/components/ui/Icons/Admin';
import { SettingsLogo } from '@/components/ui/Icons/Settings';
import { Typhography } from '@/components/ui/Typhography';
import { getUser } from '@/utils/redux/storeSlices/userSlice/selectors';
import { AdminRole } from '@/utils/constants/userRoles';

export const Header = () => {
  const navigate = useNavigate();
  const { role, group_name } = useSelector(getUser);

  const showAdminComponent = role === AdminRole;

  const goToAdminPanel = () => navigate('/admin');
  const goToProfileSettings = () => navigate('/profile');

  return (
    <header className={styles.header}>
      <Typhography tag="h1" variant="header">
        {group_name}
      </Typhography>
      <div className={styles.container}>
        {showAdminComponent && (
          <Typhography tag="h1" variant="primary" onClick={goToAdminPanel}>
            <AdminLogo className={styles['icon']} />
          </Typhography>
        )}
        <Typhography tag="h1" variant="primary" onClick={goToProfileSettings}>
          <SettingsLogo className={styles['icon']} />
        </Typhography>
      </div>
    </header>
  );
};
