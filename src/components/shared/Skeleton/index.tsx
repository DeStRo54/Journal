import styles from './Skeleton.module.css';

export const Skeleton = () => {
  return (
    <div className={styles["circular-skeleton"]}>
      <div className={styles["spinner"]}></div>
    </div>
  );
};

