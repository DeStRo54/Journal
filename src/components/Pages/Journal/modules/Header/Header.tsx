import styles from './Header.module.css';
import { Typhography } from '@/components/ui/Typhography';

import { IoMdSettings } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";

export const Header = () => {
	return (
		<header className={styles.header}>
			<Typhography tag="h1" variant="primary">
				Группа
			</Typhography>
			<div className={styles.container}>
				<Typhography tag="h2" variant="secondary">
					<CiSquarePlus className={styles['icon']} />
				</Typhography>
				<Typhography tag="h2" variant="secondary">
					<IoMdSettings className={styles['icon']} />
				</Typhography>
			</div>
		</header>
	);
};
