import styles from './FreeDay.module.css';
// import { BezParIcon } from '@/components/ui/Icons/BezPar';
import { Typhography } from '@/components/ui/Typhography';

export const FreeDay = () => {
  return (
    <div className={styles['container']}>
      {/* <BezParIcon className={styles['icon']} /> */}
      <Typhography tag="p" variant="header" children={`Без пар`} className={styles['title']} />
    </div>
  );
};
