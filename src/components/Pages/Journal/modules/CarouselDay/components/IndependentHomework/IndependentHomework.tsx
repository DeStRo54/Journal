import React from 'react';
import { useSelector } from 'react-redux';

import { AddHomework } from './AddHomework/AddHomework';
import styles from './IndependentHomework.module.css';
import { Typhography } from '@/components/ui/Typhography';
import { BaseRole } from '@/utils/constants/userRoles';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';

interface IndependentHomeworkProps {
  Homeworks: Homework[];
}

export const IndependentHomework = ({ Homeworks }: IndependentHomeworkProps) => {
  const userRole = useSelector(getUserRole);

  const [addedHomeworks, setAddedHomeworks] = React.useState<HomeworkArray>(Homeworks.map((homework) => {
    return {
      homeworkText: homework.homeworkText,
      homeworkID: homework.homeworkID
    }
  }));
  const addHomework = (homework: HomeworkElement) => setAddedHomeworks((prev) => [...prev, homework]);

  return (
    <>
      {!!Homeworks.length && !!addedHomeworks.length && (
        <div className={styles['container']}>
          <Typhography tag="p" variant="primary" children={`Задания на день`} className={styles['title']} />
          <ul className={styles['content']}>
            {Homeworks.map((homework) => (
              <li key={homework.homeworkID}>{homework.homeworkText}</li>
            ))}
          </ul>
        </div>
      )}
      {userRole > BaseRole && <AddHomework addHomework={addHomework} />}
    </>
  );
};
