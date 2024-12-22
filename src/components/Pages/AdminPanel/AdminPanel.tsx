
import styles from './AdminPanel.module.css';
import { Typhography } from '@/components/ui/Typhography';

export const AdminPanel = () => {
  return <div className={styles.container}>
    <Typhography tag="h1" variant="primary" className={styles.title}>Admin panel</Typhography>
  </div>;
};