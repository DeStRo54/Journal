import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.css';
import { AddLogo } from '@/components/ui/Icons/Add';
import { AdminLogo } from '@/components/ui/Icons/Admin';
import { SettingsLogo } from '@/components/ui/Icons/Settings';
import { Typhography } from '@/components/ui/Typhography';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';

export const Header = () => {
  const navigate = useNavigate();
  const role = useSelector(getUserRole);
  const showAdminComponent = role === 'admin';
  const goToAdminPanel = () => navigate('/journal/moderator');

  return (
    <header className={styles.header}>
      <Typhography tag="h1" variant="primary">
        Группа
      </Typhography>
      <div className={styles.container}>
        {showAdminComponent &&
          <Typhography tag="h2" variant="primary" onClick={goToAdminPanel}>
            <AdminLogo className={styles['icon']} />
          </Typhography>
        }
        <Typhography tag="h2" variant="primary">
          <AddLogo className={styles['icon']} />
        </Typhography>
        <Typhography tag="h2" variant="primary">
          <SettingsLogo className={styles['icon']} />
        </Typhography>
      </div>
    </header>
  );
};
