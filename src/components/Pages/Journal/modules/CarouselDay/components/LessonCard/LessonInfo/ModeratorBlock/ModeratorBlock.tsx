import React from 'react';

import styles from './ModeratorBlock.module.css';
import { Skeleton } from '@/components/shared/Skeleton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typhography } from '@/components/ui/Typhography';
import { OutputClass } from '@/utils/api/requests/schedule/get/response';
import { usePostModeratorAddHomeworkClassMutation } from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';

interface ModeratorBlockProps {
  apiData: OutputClass;
  addHomework: (homework: string) => void;
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
    if (isError) {
      console.log(postModeratorAddHomeworkClassResponse.error);
      return;
    }
    addHomework(homeworkText);
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
