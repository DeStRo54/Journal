import React from 'react';

import styles from './ModeratorBlock.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { Typhography } from '@/components/ui/Typhography';
import { usePostModeratorAddHomeworkClassMutation } from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';

interface ModeratorBlockProps {
  apiData: OutputClass;
  addHomework: (homework: HomeworkElement) => void;
}

export const ModeratorBlock = ({ apiData, addHomework }: ModeratorBlockProps) => {
  const [postModeratorAddHomeworkClassMutation, { isLoading, isError }] = usePostModeratorAddHomeworkClassMutation();
  const [homeworkText, setHomeworkText] = React.useState('');

  const sendLessonHomework = async () => {
    const postModeratorAddHomeworkClassResponse = await postModeratorAddHomeworkClassMutation({
      params: {
        classSemNumber: apiData.class.semClassNumber,
        subjectId: apiData.class.subjectId,
        Category: apiData.class.category,
        homeworkText: homeworkText,
        dueDate: apiData.class.startTime
      }
    });

    if (!postModeratorAddHomeworkClassResponse.error) {
      addHomework({ homeworkText: homeworkText, homeworkID: postModeratorAddHomeworkClassResponse.data.homework_id });
    }
  };

  return (
    <section className={styles['section']}>
      <Input
        onChange={(e) => setHomeworkText(e.target.value)}
        label="Добавить задание"
        variant="homework"
        name={`${apiData.class.startTime}`}
      />
      <Button variant="accept" disabled={isLoading || !homeworkText} onClick={sendLessonHomework}>
        {isLoading ? <Skeleton /> : 'Добавить'}
      </Button>
      {isError && (
        <Typhography tag="p" variant="thirdy">
          Ошибка
        </Typhography>
      )}
    </section>
  );
};
