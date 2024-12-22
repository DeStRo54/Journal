import styles from './LessonCard.module.css';
import { OutputClass } from '@/utils/api/requests/schedule/get/response';

interface LessonCardProps {
  apiData: OutputClass;
}

export const LessonCard = ({ apiData }: LessonCardProps) => {
  const para = apiData.class;
  const homeworks = apiData.homework;

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles['subject']}>{para.summary}</h1>
      </div>
      <div className={styles['time-info']}>
        <p>{`${lessonsNumbers[paraBegin as keyof typeof lessonsNumbers]} пара`}</p>
        <p>{`${paraBegin} - ${paraEnd}`}</p>
      </div>
      <div className={styles['cabinet-info']}>
        <p>{para.location}</p>
        {/* <p>{apiData.teacher}</p> */}
      </div>
      {homeworks.map((homework, index) => (
        <div key={index} className={styles['homework']}>
          <h1>Задание</h1>
          <p className={styles['task']}>{homework.homeworkText}</p>
        </div>
      ))}
    </div>
  );
};
