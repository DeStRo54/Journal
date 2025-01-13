import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import { AdminLogo } from '@/components/ui/Icons/Admin';
import { SettingsLogo } from '@/components/ui/Icons/Settings';
import { Typhography } from '@/components/ui/Typhography';
import { AdminRole } from '@/utils/constants/userRoles';
import { getUser } from '@/utils/redux/storeSlices/userSlice/selectors';

export const Header = () => {
  const { role, group_name } = useSelector(getUser);

  const showAdminComponent = role === AdminRole;

  return (
    <header className={styles.header}>
      <Typhography tag="h1" variant="header" children={group_name} />
      <div className={styles.container}>
        {showAdminComponent && (
          <Link to="/admin">
            <AdminLogo className={styles['icon']} />
          </Link>
        )}
        <Link to="/profile">
          <SettingsLogo className={styles['icon']} />
        </Link>
      </div>
    </header>
  );
};
