import React from 'react';
import { useSelector } from 'react-redux';

import { AddHomework } from './AddHomework/AddHomework';
import styles from './IndependentHomework.module.css';
import { Typhography } from '@/components/ui/Typhography';
import { BaseRole } from '@/utils/constants/userRoles';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import { AddLogo } from '@/components/ui/Icons/Add';
import { Modal } from '@/components/ui/Modal';
import clsx from 'clsx';

interface IndependentHomeworkProps {
  Homeworks: Homework[];
}

export const IndependentHomework = ({ Homeworks }: IndependentHomeworkProps) => {
  const userRole = useSelector(getUserRole);
  const [isOpen, setIsOpen] = React.useState(false);

  const [addedHomeworks, setAddedHomeworks] = React.useState<HomeworkArray>(Homeworks.map((homework) => {
    return {
      homeworkText: homework.homeworkText,
      homeworkID: homework.homeworkID
    }
  }));

  const onClose = () => setIsOpen(false);

  const addHomework = (homework: HomeworkElement) => setAddedHomeworks((prev) => [...prev, homework]);

  return (
    <>
      {!!Homeworks.length && !!addedHomeworks.length && (
        <article className={styles['container']}>
          <Typhography tag="p" variant="primary" children={`Задания на день`} className={styles['title']} />
          <ul className={styles['content']}>
            {Homeworks.map((homework) => (
              <li key={homework.homeworkID}>{homework.homeworkText}</li>
            ))}
          </ul>
        </article>
      )}
      {userRole > BaseRole &&
        <article className={clsx(styles['mod-content'], isOpen && styles['active'])} onClick={() => { setIsOpen(true) }}>
          <AddLogo className={styles['add-icon']} />
        </article>}
      <Modal showInfo={isOpen} showDetails={onClose} modalId={'journal'}>
        <AddHomework addHomework={addHomework} onClose={onClose} />
      </Modal>
    </>
  );
};
