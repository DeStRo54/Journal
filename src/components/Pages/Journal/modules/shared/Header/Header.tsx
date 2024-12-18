import styles from './Header.module.css';
import { Typhography } from '@/components/ui/Typhography';
import { AdminLogo } from '@/components/ui/Icons/Admin';
import { AddLogo } from '@/components/ui/Icons/Add';
import { SettingsLogo } from '@/components/ui/Icons/Settings';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Typhography tag="h1" variant="primary">
        Бан хоумисам
      </Typhography>
      <div className={styles.container}>
        <Typhography tag="h2" variant="primary">
          <AdminLogo className={styles['icon']} />
        </Typhography>
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
