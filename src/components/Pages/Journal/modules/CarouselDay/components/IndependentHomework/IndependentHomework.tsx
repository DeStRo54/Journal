import React from 'react';

import styles from './IndependentHomework.module.css';
import { Typhography } from '@/components/ui/Typhography';
import { useSelector } from 'react-redux';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import { BaseRole } from '@/utils/constants/userRoles';
import { AddHomework } from './AddHomework/AddHomework';

interface IndependentHomeworkProps {
  Homeworks: Homework[];
}

export const IndependentHomework = ({ Homeworks }: IndependentHomeworkProps) => {
  const userRole = useSelector(getUserRole);

  const [addedHomeworks, setAddedHomeworks] = React.useState<string[]>([]);
  const addHomework = (homework: string) => setAddedHomeworks((prev) => [...prev, homework]);

  return (
    <>
      {!!Homeworks.length && !!addedHomeworks.length && (
        <div className={styles['container']}>
          <Typhography tag="p" variant="primary" children={`Общие задания`} className={styles['title']} />
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
