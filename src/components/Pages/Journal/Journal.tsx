import React from 'react';

import 'swiper/swiper-bundle.css';
import { createDate } from './helpers/createDate';
import { findIndexByDate } from './helpers/getIndexOfDay';
import styles from './Journal.module.css';
import { Header } from './modules/Header/Header';
import { DesktopView } from './modules/Views/Desktop/DesktopView.tsx';
import { MobileView } from './modules/Views/Mobile/MobileView';

export const Journal = () => {
	const today = new Date();

	const values = React.useMemo(
		() => createDate({ currentYear: today.getFullYear(), currentMonthIndex: 9, currentDayIndex: 2 }),
		[]
	);

	const apiData = {
		type: 'Лекция',
		subject: 'Матан',
		para: 1,
		time: '09:00 - 10:30',
		cabinet: '263 (C-20)',
		homework: 'Задание',
		teacher: 'THE PASCALINE'
	};

	const apiDates = [] as (typeof apiData)[];

	for (let i = 0; i < 3; i++) {
		apiDates.push(apiData);
	}

	const monthData = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь'
	];

	const currentDateIndex = React.useMemo(
		() =>
			findIndexByDate(values, {
				year: today.getFullYear(),
				month: monthData[today.getMonth()],
				day: today.getDate()
			}),
		[]
	);

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles['journal-body']}>
				<DesktopView currentDateIndex={currentDateIndex} values={values} apiDates={apiDates} />
				<MobileView currentDateIndex={currentDateIndex} values={values} apiDates={apiDates} />
			</div>
		</div>
	);
};
