import { motion } from 'framer-motion';
import styles from './AddHomework.module.css';
import { Button } from '@/components/ui/Button';
import { Slide } from '@/components/ui/Icons/Slide';
import { Typhography } from '@/components/ui/Typhography';

interface AddHomeworkProps {
  addHomework: (homework: HomeworkElement) => void;
  onClose: () => void;
}

export const AddHomework = ({ onClose }: AddHomeworkProps) => {
  return (
    <motion.aside
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        duration: 0.35,
        ease: 'easeInOut'
      }}
      className={styles['layout']}>
      <header className={styles['header']}>
        <Button variant="slide" rotate={true} className={styles['close']} onClick={onClose}>
          <Slide />
        </Button>
        <Typhography tag="h3" variant="secondary" children={'Предмет'} />
      </header>
    </motion.aside>
  );
};
