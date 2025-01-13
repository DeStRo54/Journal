import { motion } from 'framer-motion';
import styles from './AddHomework.module.css';

interface AddHomeworkProps {
  addHomework: (homework: HomeworkElement) => void;
}

export const AddHomework = ({ }: AddHomeworkProps) => {

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        duration: 0.35,
        ease: 'easeInOut'
      }}
      className={styles['layout']}>
      Test
    </motion.div>
  );
};
