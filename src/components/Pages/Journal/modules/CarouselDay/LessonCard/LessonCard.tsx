import styles from './LessonCard.module.css';

interface LessonCardProps {
  apiData: {
    type: string;
    subject: string;
    para: number;
    time: string;
    cabinet: string;
    teacher: string;
    homework: string;
  };
}

export const LessonCard = ({ apiData }: LessonCardProps) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h1 className={styles['subject']}>{apiData.subject}</h1>
      <p className={styles['type']}>{apiData.type}</p>
    </div>
    <div className={styles['time-info']}>
      <p>{apiData.para} пара</p>
      <p>{apiData.time}</p>
    </div>
    <div className={styles['cabinet-info']}>
      <p>{apiData.cabinet}</p>
      <p>{apiData.teacher}</p>
    </div>
    {apiData.type === 'pract' && ( // практика or лекция
      <div className={styles['homework']}>
        <h1>Задание</h1>
        <p className={styles['task']}>{apiData.homework}</p>
      </div>
    )}
  </div>
);
