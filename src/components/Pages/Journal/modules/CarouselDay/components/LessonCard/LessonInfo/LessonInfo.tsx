import React from 'react';
import { createPortal } from 'react-dom';

import styles from './LessonInfo.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typhography } from '@/components/ui/Typhography';
import { OutputClass } from '@/utils/api/requests/schedule/get/response';
import { usePostModeratorAddHomeworkClassMutation } from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';
import { motion } from 'framer-motion';

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
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",

      }}
      className={styles['environment']}
    >
      <div className={styles['container']}>
        <Button variant="accept" onClick={showDetails}>
          Выйти?
        </Button>
        <Input
          onChange={(e) => setHomeworkText(e.target.value)}
          label="Добавить задание"
          variant="homework"
          name={`${apiData.class.startTime}`}
        />
        <Button variant="accept" onClick={sendLessonHomework}>
          {isLoading ? 'Отправка...' : 'Добавить'}
        </Button>
        {isError && (
          <Typhography tag="p" variant="thirdy">
            Ошибка
          </Typhography>
        )}
      </div>
    </motion.div>,
    portalTarget
  );
};
