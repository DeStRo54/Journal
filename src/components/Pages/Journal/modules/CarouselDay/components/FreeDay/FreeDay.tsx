import styles from './FreeDay.module.css';
import { BezParIcon } from '@/components/ui/Icons/BezPar';
import { Typhography } from '@/components/ui/Typhography';

export const FreeDay = () => {
  return (
    <div className={styles['container']}>
      <Typhography tag="p" variant="primary" children={'Без пар'} className={styles['title']} />
      <BezParIcon className={styles['icon']} />
    </div>
  );
};
