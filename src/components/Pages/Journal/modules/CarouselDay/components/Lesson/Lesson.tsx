import React from 'react';

import styles from './Lesson.module.css';
import { LessonCard } from './LessonCard/LessonCard';
import { Modal } from '@/components/ui/Modal';
import { Typhography } from '@/components/ui/Typhography';
import clsx from 'clsx';

interface LessonProps {
  apiData: OutputClass;
  updateHeight: () => void;
}

const lessonsNumbers = {
  '09:00': 1,
  '10:40': 2,
  '12:40': 3,
  '14:20': 4,
  '16:20': 5,
  '18:00': 6,
  '19:40': 7
};

const lessonColor = {
  ЛК: 'lect',
  ПР: 'pract',
  Лаб: 'lab',
  Зачет: 'zach',
  Консультация: 'cons',
  Экзамен: 'exam'
};

const convertSummary = (rawDescrciption: string) => rawDescrciption.split(' ').slice(1).join(' ');

const convertDateToTime = (rawDate: string) => {
  const timePart = rawDate.split('T')[1];
  const [hours, minutes] = timePart.split(':');
  return `${hours}:${minutes}`;
};

const getTeacher = (rawDescrciption: string) => {
  const stageA = rawDescrciption.split('\n')[0].split(' ');
  const stageB = stageA.splice(1, stageA.length - 1);

  if (stageB[0] === undefined) return '';

  return `${stageB[0]} ${stageB[1]?.substring(0, 1)}. ${stageB[2]?.substring(0, 1)}.`;
};

export const Lesson = ({ apiData, updateHeight }: LessonProps) => {
  const para = apiData.class;
  const [homeworks, setHomeworks] = React.useState(apiData.homework.map((value) => value.homeworkText));

  const [showInfo, setShowInfo] = React.useState(false);

  const paraBegin = convertDateToTime(para.startTime);
  const paraEnd = convertDateToTime(para.endTime);

  const showDetails = () => setShowInfo(!showInfo);

  const addHomework = (homework: string) => {
    setHomeworks((prev) => [...prev, homework]);
    updateHeight();
  };

  return (
    <React.Fragment>
      <div className={styles.container} onClick={showDetails}>
        <div className={styles.header}>
          <h1 className={styles['subject']}>{convertSummary(para.summary)}</h1>
          <p className={clsx(styles['type'], styles[lessonColor[para.category as keyof typeof lessonColor]])}>
            {para.category}
          </p>
        </div>
        {homeworks.length > 0 && (
          <ul className={styles['homework-info']}>
            <h1>Задание</h1>
            {homeworks.map((homework, index) => (
              <ol key={index} className={styles['task']}>
                {homework}
              </ol>
            ))}
          </ul>
        )}
        <div className={styles['time-info']}>
          <p>{`${lessonsNumbers[paraBegin as keyof typeof lessonsNumbers]} пара`}</p>
          <p>{`${paraBegin} - ${paraEnd}`}</p>
        </div>
        <div className={styles['cabinet-info']}>
          <Typhography tag="p" variant="additional" children={para.location} />
          <Typhography tag="p" variant="additional" children={getTeacher(para.description)} />
        </div>
      </div>
      <Modal modalId="journal" showInfo={showInfo} showDetails={showDetails}>
        <LessonCard apiData={apiData} homeworks={homeworks} showDetails={showDetails} addHomework={addHomework} />
      </Modal>
    </React.Fragment>
  );
};
