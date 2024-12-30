import React from 'react';
import { createPortal } from 'react-dom';

import styles from './LessonInfo.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typhography } from '@/components/ui/Typhography';
import { OutputClass } from '@/utils/api/requests/schedule/get/response';
import { usePostModeratorAddHomeworkClassMutation } from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';
import { motion } from 'framer-motion';
import { Slide } from '@/components/ui/Icons/Slide';
import clsx from 'clsx';

interface LessonInfoProps {
  apiData: OutputClass;
  showDetails: () => void;
}

export const LessonInfo = ({ apiData, showDetails }: LessonInfoProps) => {
  const [postModeratorAddHomeworkClassMutation, { isLoading, isError }] = usePostModeratorAddHomeworkClassMutation();
  const [homeworkText, setHomeworkText] = React.useState('');

  const portalTarget = document.getElementById('journal');
  if (!portalTarget) {
    return null;
  }

  const sendLessonHomework = async () => {
    await postModeratorAddHomeworkClassMutation({
      params: {
        classSemNumber: apiData.class.semClassNumber,
        subjectId: apiData.class.subjectId,
        Category: apiData.class.category,
        homeworkText: homeworkText,
        dueDate: apiData.class.startTime
      }
    });
  };

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
          <section className={clsx(styles['section'], styles['moderator'])}>
            <Input
              onChange={(e) => setHomeworkText(e.target.value)}
              label="Добавить задание"
              variant="homework"
              name={`${apiData.class.startTime}`}
            />
            <Button variant="accept" disabled={isLoading || !homeworkText} onClick={sendLessonHomework}>
              {isLoading ? 'Отправка...' : 'Добавить'}
            </Button>
            {isError && (
              <Typhography tag="p" variant="thirdy">
                Ошибка
              </Typhography>
            )}
          </section>
        </div>
      </motion.div>
    </motion.div>,
    portalTarget
  );
};
