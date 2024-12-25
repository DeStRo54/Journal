import React from 'react';

import styles from './LessonInfo.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typhography } from '@/components/ui/Typhography';
import { OutputClass } from '@/utils/api/requests/schedule/get/response';
import { usePostModeratorAddHomeworkClassMutation } from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';
import { createPortal } from 'react-dom';
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
    console.error('Элемент с классом journal-body не найден');
    return null;
  }

  const sendLessonHomework = async () => {
    try {
      await postModeratorAddHomeworkClassMutation({
        params: {
          classSemNumber: apiData.class.semClassNumber,
          subjectId: apiData.class.subjectId,
          homeworkText: homeworkText,
          dueDate: apiData.class.startTime
        }
      });
    } catch (error) {
      console.error('Ошибка при отправке задания:', error);
    }
  };

  return createPortal(
    <motion.div
      initial={{ x: "100%" }} // Начальная позиция за пределами экрана справа
      animate={{ x: 0 }} // Конечная позиция
      exit={{ x: "100%" }} // Позиция при выходе (опционально)
      transition={{
        type: "spring", // Тип анимации (можно использовать 'tween')
        stiffness: 120, // Жёсткость пружины (регулирует скорость и эффект упругости)
        damping: 20, // Амортизация
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
