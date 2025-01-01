import { createPortal } from 'react-dom';

import styles from './LessonInfo.module.css';
import { Button } from '@/components/ui/Button';
import { Typhography } from '@/components/ui/Typhography';
import { OutputClass } from '@/utils/api/requests/schedule/get/response';
import { motion } from 'framer-motion';
import { Slide } from '@/components/ui/Icons/Slide';
import { ModeratorBlock } from './ModeratorBlock/ModeratorBlock';
import { useSelector } from 'react-redux';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';

interface LessonInfoProps {
  apiData: OutputClass;
  showDetails: () => void;
}

export const LessonInfo = ({ apiData, showDetails }: LessonInfoProps) => {
  const portalTarget = document.getElementById('journal');
  if (!portalTarget) {
    return null;
  }

  const role = useSelector(getUserRole);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles['environment']}
    >
      <div className={styles['background']} onClick={showDetails}></div>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{
          duration: 0.35,
          ease: 'easeInOut'
        }}
        className={styles['layout']}
      >
        <header className={styles['header']}>
          <Button variant="slide" rotate={true} className={styles['close']} onClick={showDetails}>
            <Slide />
          </Button>
          <Typhography tag="h3" variant="secondary" children={'Предмет'} />
        </header>
        <div className={styles['container']}>
          <section className={styles['section']}>
            <Typhography tag="h3" variant="additional" className={styles['info']} children={'Название предмета'} />
            <Typhography tag="p" variant="thirdy" children={apiData.class.summary} />
          </section>
          <section className={styles['section']}>
            <Typhography tag="h3" variant="additional" className={styles['info']} children={'Тип занятия'} />
            <Typhography tag="p" variant="thirdy" children={apiData.class.category} />
          </section>
          <section className={styles['section']}>
            <Typhography tag="h3" variant="additional" className={styles['info']} children={'Место'} />
            <Typhography tag="p" variant="thirdy" children={apiData.class.location} />
          </section>
          <section className={styles['section']}>
            <Typhography tag="h3" variant="additional" className={styles['info']} children={'Преподаватели'} />
            <Typhography tag="p" variant="thirdy" children={apiData.class.description} />
          </section>
          {role > 0 && <ModeratorBlock apiData={apiData} />}
        </div>
      </motion.div>
    </motion.div>,
    portalTarget
  );
};
