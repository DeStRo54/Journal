import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typhography } from '@/components/ui/Typhography';
import { usePostModeratorAddHomeworkClassMutation } from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';
import React from 'react';
import styles from './ModeratorBlock.module.css';
import { OutputClass } from '@/utils/api/requests/schedule/get/response';
import { Skeleton } from '@/components/shared/Skeleton';

interface ModeratorBlockProps {
  apiData: OutputClass;
}

export const ModeratorBlock = ({ apiData }: ModeratorBlockProps) => {
  const [postModeratorAddHomeworkClassMutation, { isLoading, isError }] = usePostModeratorAddHomeworkClassMutation();
  const [homeworkText, setHomeworkText] = React.useState('');

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
