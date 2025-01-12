import { useSelector } from 'react-redux';

import styles from './LessonCard.module.css';
import { ModeratorBlock } from './ModeratorBlock/ModeratorBlock';
import { Button } from '@/components/ui/Button';
import { Slide } from '@/components/ui/Icons/Slide';
import { Typhography } from '@/components/ui/Typhography';
import { BaseRole } from '@/utils/constants/userRoles';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import { motion } from 'framer-motion';

interface LessonInfoProps {
  apiData: OutputClass;
  homeworks: string[];
  addHomework: (homework: string) => void;
  showDetails: () => void;
}

const RestructDescription = (description: string) => {
  return description.split(' ').splice(1).join(' ').split('\n')[0];
};

export const LessonCard = ({ apiData, homeworks, showDetails, addHomework }: LessonInfoProps) => {
  const userRole = useSelector(getUserRole);

  const description = RestructDescription(apiData.class.description);

  return (
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
          <Typhography tag="h3" variant="additional" className={styles['info']} children={'Задание'} />
          {homeworks.length === 0 && <Typhography tag="p" variant="thirdy" children={'Отсутствует'} />}
          <ul className={styles['homework-list']}>
            {homeworks.map((value, index) => (
              <motion.ol
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                key={index}
                className={styles['homework-list-item']}
              >
                {value}
              </motion.ol>
            ))}
          </ul>
        </section>
        <section className={styles['section']}>
          <Typhography tag="h3" variant="additional" className={styles['info']} children={'Место'} />
          <Typhography tag="p" variant="thirdy" children={apiData.class.location} />
        </section>
        <section className={styles['section']}>
          <Typhography tag="h3" variant="additional" className={styles['info']} children={'Преподаватель'} />
          <Typhography tag="p" variant="thirdy" children={description} />
        </section>
        {userRole > BaseRole && <ModeratorBlock apiData={apiData} addHomework={addHomework} />}
      </div>
    </motion.div>
  );
};
