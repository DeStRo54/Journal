import { OutputClass } from '@/utils/api/requests/schedule/get/response';

import styles from './LessonInfo.module.css';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { usePostModeratorAddHomeworkClassMutation } from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';
import { Typhography } from '@/components/ui/Typhography';
import React from 'react';

interface LessonInfoProps {
  apiData: OutputClass;
  showDetails: () => void;
}

export const LessonInfo = ({ apiData, showDetails }: LessonInfoProps) => {
  const [postModeratorAddHomeworkClassMutation, { isLoading, isError }] = usePostModeratorAddHomeworkClassMutation();
  const [homeworkText, setHomeworkText] = React.useState('');

  const sendLessonHomework = async () => {
    await postModeratorAddHomeworkClassMutation({
      params: {
        classSemNumber: apiData.class.semClassNumber,
        subjectId: apiData.class.subjectId,
        homeworkText: homeworkText,
        dueDate: apiData.class.startTime,
      }
    });
  }

  return (
    <div className={styles['environment']}>
      <div className={styles['container']}>
        <Button variant="accept" onClick={showDetails} children={'Выйти?'} />
        <Input onChange={e => setHomeworkText(e.target.value)} label={'Добавить задание'} variant="homework" name={`${apiData.class.startTime}}`} />
        <Button variant="accept" onClick={sendLessonHomework} children={isLoading ? 'Отправка...' : 'Добавить'} />
        {isError && <Typhography tag='p' variant='thirdy' children={'Ошибка'} />}
      </div>
    </div>
  );
};
