import { Button } from '@/components/ui/Button';
import styles from './AdminPanel.module.css';
import { Typhography } from '@/components/ui/Typhography';
import { usePostAdminAddGroupMutation } from '@/utils/redux/apiSlices/adminApiSlice/adminApi';

export const AdminPanel = () => {

  const [postGroup] = usePostAdminAddGroupMutation();

  const addGroup = async () => {
    const a = await postGroup({
      params: {
        "name": "БСБО-01-23",
        "course": 1,
        "icalLink": "http://english.mirea.ru/schedule/api/ical/1/698"
      }
    });
  };

  return (
    <div className={styles.container}>
      <Typhography tag="h1" variant="primary" className={styles.title}>
        Admin panel
      </Typhography>
      <Button variant="accept" onClick={addGroup}>Add group</Button>
    </div>
  );
};
