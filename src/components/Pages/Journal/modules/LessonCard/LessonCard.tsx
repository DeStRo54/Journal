import styles from './LessonCard.module.css';

interface LessonCardProps {
  apiData: {
    type: string;
    subject: string;
    para: number;
    time: string;
    cabinet: string;
    groups: string[];
    teacher: string;
  };
}

export const LessonCard = ({ apiData }: LessonCardProps) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <p className={styles['type']}>{apiData.type}</p>
      <p className={styles['subject']}>{apiData.subject}</p>
      <div className={styles['time-info']}>
        <p>{apiData.para} пара</p>
        <p>{apiData.time}</p>
      </div>
    </div>
    <div className={styles.body}>
      <p>{apiData.cabinet}</p>
      <p>{apiData.groups.join(', ')}</p>
      <p>{apiData.teacher}</p>
    </div>
  </div>
);
