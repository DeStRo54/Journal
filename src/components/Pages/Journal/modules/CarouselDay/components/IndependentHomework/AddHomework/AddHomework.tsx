
import { Button } from '@/components/ui/Button';
import { AddLogo } from '@/components/ui/Icons/Add';
import { Typhography } from '@/components/ui/Typhography';
import styles from './AddHomework.module.css';

interface AddHomeworkProps {
  addHomework: (homework: string) => void;
}

export const AddHomework = ({ }: AddHomeworkProps) => {
  return (
    <div className={styles['content']}>
      <Typhography tag="p" variant="secondary" children={`Добавить задание`} />
      <Button variant="slide" rotate={true} onClick={() => { }} children={<AddLogo />} />
    </div>
  )
}