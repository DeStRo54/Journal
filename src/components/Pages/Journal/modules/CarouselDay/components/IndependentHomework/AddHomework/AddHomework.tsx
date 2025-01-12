import styles from './AddHomework.module.css';
import { Button } from '@/components/ui/Button';
import { AddLogo } from '@/components/ui/Icons/Add';

interface AddHomeworkProps {
  addHomework: (homework: string) => void;
}

export const AddHomework = ({}: AddHomeworkProps) => {
  return (
    <div className={styles['content']}>
      <Button variant="slide" rotate={true} onClick={() => {}} children={<AddLogo />} />
    </div>
  );
};
