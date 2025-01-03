import clsx from 'clsx';
import styles from './LessonsList.module.css';

interface LessonsListProps {
  lessons: Lessons;
}

const lessonColor = {
  ЛК: 'lect',
  ПР: 'pract',
  Лаб: 'lab',
  Зачет: 'zach',
  Консультация: 'cons',
  Экзамен: 'exam'
};

export const LessonsList = ({ lessons }: LessonsListProps) => {
  return (
    <ul className={styles['list']}>
      {lessons.map((lesson) => (
        <ol
          key={lesson.class.startTime}
          className={clsx(styles['item'], styles[lessonColor[lesson.class.category as keyof typeof lessonColor]])}
        />
      ))}
    </ul>
  );
};
