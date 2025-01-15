import React from 'react';

import styles from './AddHomework.module.css';
import { Button } from '@/components/ui/Button';
import { Slide } from '@/components/ui/Icons/Slide';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { usePostModeratorAddHomeworkDateMutation } from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';
import { motion } from 'framer-motion';

interface AddHomeworkProps {
  currentValue: ValuesDate;
  addHomework: (homework: HomeworkElement) => void;
  onClose: () => void;
}

export const AddHomework = ({ currentValue, addHomework, onClose }: AddHomeworkProps) => {
  const [postModeratorAddHomeworkDateMutation, { isLoading, isError }] = usePostModeratorAddHomeworkDateMutation();
  const [homeworkText, setHomeworkText] = React.useState('');

  const sendLessonHomework = async () => {
    const postModeratorAddHomeworkDateResponse = await postModeratorAddHomeworkDateMutation({
      params: {
        subjectId: 1, //test
        homeworkText: homeworkText,
        dueDate: `${currentValue.day} ${currentValue.month} ${currentValue.year}`
      }
    });
    if (!postModeratorAddHomeworkDateResponse.error) {
      addHomework({ homeworkText: homeworkText, homeworkID: postModeratorAddHomeworkDateResponse.data.homework_id });
    }
  };

  return (
    <motion.aside
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
        <Button variant="slide" rotate={true} className={styles['close']} onClick={onClose}>
          <Slide />
        </Button>
        <Typhography tag="h3" variant="secondary" children={`Добавить задание`} />
      </header>
      <article className={styles['section']}>
        <Input
          onChange={(e) => setHomeworkText(e.target.value)}
          label="Добавить задание"
          variant="homework"
          name={`${currentValue.day} ${currentValue.month} ${currentValue.year}`}
        />
        <Button variant="accept" disabled={isLoading || !homeworkText} onClick={sendLessonHomework}>
          {isLoading ? <Loader /> : 'Добавить'}
        </Button>
        {isError && (
          <Typhography tag="p" variant="thirdy">
            Ошибка
          </Typhography>
        )}
      </article>
    </motion.aside>
  );
};
