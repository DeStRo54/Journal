import React from 'react';

import styles from './LessonCard.module.css';
import { LessonInfo } from './LessonInfo/LessonInfo';
import { OutputClass } from '@/utils/api/requests/schedule/get/response';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

interface LessonCardProps {
  apiData: OutputClass;
}

export const LessonCard = ({ apiData }: LessonCardProps) => {
  const [showInfo, setShowInfo] = React.useState(false);
  const para = apiData.class;
  const homeworks = apiData.homework;

  const [type, subject] = [para.summary.split(' ').shift(), para.summary.split(' ').splice(1).join(' ')];

  const convertDateToTime = (rawDate: string) => {
    const timePart = rawDate.split('T')[1];
    const [hours, minutes] = timePart.split(':');
    return `${hours}:${minutes}`;
  };

  const paraBegin = convertDateToTime(para.startTime);
  const paraEnd = convertDateToTime(para.endTime);

  const lessonsNumbers = {
    '09:00': 1,
    '10:40': 2,
    '12:40': 3,
    '14:20': 4,
    '16:20': 5,
    '18:00': 6,
    '19:40': 7
  };

  const getTeacher = (rawDescrciption: string) => {
    const stageA = rawDescrciption.split('\n')[0].split(' ');
    const stageB = stageA.splice(1, stageA.length - 1);

    if (stageB[0] === undefined) return '';

    return `${stageB[0]} ${stageB[1]?.substring(0, 1)}. ${stageB[2]?.substring(0, 1)}.`;
  };

  const showDetails = () => setShowInfo(!showInfo);

  const lessonColor = {
    ЛК: 'lect',
    ПР: 'pract',
    Лаб: 'lab',
    Зачет: 'zach',
    Экзамен: 'exam'
  };

  return (
    <React.Fragment>
      <div className={styles.container} onClick={showDetails}>
        <div className={styles.header}>
          <h1 className={styles['subject']}>{subject}</h1>
          <p className={clsx(styles['type'], styles[lessonColor[type as keyof typeof lessonColor]])}>{type}</p>
        </div>
        <div className={styles['time-info']}>
          <p>{`${lessonsNumbers[paraBegin as keyof typeof lessonsNumbers]} пара`}</p>
          <p>{`${paraBegin} - ${paraEnd}`}</p>
        </div>
        <div className={styles['cabinet-info']}>
          <p>{para.location}</p>
          <p>{getTeacher(para.description)}</p>
        </div>
        {homeworks.map((homework, index) => (
          <div key={index} className={styles['homework-info']}>
            <h1>Задание</h1>
            <p className={styles['task']}>{homework.homeworkText}</p>
          </div>
        ))}
      </div>
      <AnimatePresence>{showInfo && <LessonInfo apiData={apiData} showDetails={showDetails} />}</AnimatePresence>
    </React.Fragment>
  );
};
