import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';

export const Layout = () => (
  <div className={styles.layout}>
    <Outlet />
  </div>
);
