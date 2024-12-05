import React from 'react';

import 'swiper/swiper-bundle.css';
import styles from './Journal.module.css';
import { Header } from './modules/Header/Header';
import { LessonCard } from './modules/LessonCard/LessonCard';
import { Button } from '@/components/ui/Button';
import { Slide } from '@/components/ui/Icons/Slide';
import { Typhography } from '@/components/ui/Typhography';
import clsx from 'clsx';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { getDays } from './helpers/getDays';
import { findIndexByDate } from './helpers/getIndexOfDay';

export const Journal = () => {
	const dateCarouselRef = React.useRef<SwiperRef | null>(null);
	const dayCarouselRef = React.useRef<SwiperRef | null>(null);
	const values = getDays();
	const currentDate = new Date();
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

	const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
	const currentDateIndex = findIndexByDate(values, {
		month: monthData[currentDate.getMonth()],
		day: currentDate.getDay()
	});
	const [activeDateNode, setActiveDayNode] = React.useState(currentDateIndex);
	const [currentMonth, setCurrentMonth] = React.useState(monthData[currentDate.getMonth()]);
	const [currentWeek, setCurrentWeek] = React.useState(Math.ceil((currentDateIndex + 1) / 7));

	const apiData = {
		type: 'Лекция',
		subject: 'Матан',
		para: 1,
		time: '09:00 - 10:30',
		cabinet: '263 (C-20)',
		groups: ['XXXX-XX-23', 'XXXX-XX-23', 'XXXX-XX-23'],
		teacher: 'THE PASCALINE'
	};

	const apiDates = [] as (typeof apiData)[];

	for (let i = 0; i < 3; i++) {
		apiDates.push(apiData);
	}

	console.log('1');

	const onDateNodeClick = (index: number) => {
		(dayCarouselRef.current as SwiperRef).swiper.slideTo(index, 0);
	};

	const onDayNodeScroll = () => {
		const dayNodeIndex = (dayCarouselRef.current as SwiperRef).swiper.realIndex;
		const dateNode = (dateCarouselRef.current as SwiperRef).swiper;

		setActiveDayNode(dayNodeIndex);
		setCurrentMonth(values[dayNodeIndex].month);
		setCurrentWeek(Math.ceil((dayNodeIndex + 1) / 7));
		dateNode.slideTo(dayNodeIndex, 300);
	};

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles['journal-body']}>
				<div className={styles['carousel-date']}>
					<div className={styles['navigation-body']}>
						<Button className="custom-prev" variant="slide" rotate={true}>
							<Slide />
						</Button>

						<Typhography
							tag="h2"
							variant="secondary"
							children={`${currentMonth} ${currentDate.getFullYear()} - ${currentWeek} неделя`}
						/>
						<Button className="custom-next" variant="slide">
							<Slide />
						</Button>
					</div>
					<Swiper
						ref={dateCarouselRef}
						lazyPreloadPrevNext={20}
						slidesPerView={7}
						initialSlide={currentDateIndex}
						freeMode={true}
						slidesPerGroup={7}
						modules={[Navigation]}
						speed={500}
						navigation={{
							nextEl: '.custom-next',
							prevEl: '.custom-prev'
						}}
					>
						{values.map((value, index) => (
							<SwiperSlide key={index} className={styles['carousel-date-item']}>
								<p className={styles['day']}>{weekDays[index % 7]}</p>
								<div
									className={clsx(styles['date-card'], activeDateNode === index && styles.clicked)}
									onClick={() => onDateNodeClick(index)}
								>
									<p>{value.day}</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div>
					<Swiper
						ref={dayCarouselRef}
						lazyPreloadPrevNext={20}
						freeMode={true}
						initialSlide={currentDateIndex}
						onSlideChange={onDayNodeScroll}
					>
						{values.map((_, index) => (
							<SwiperSlide key={index} className={clsx(styles['day-card'])}>
								{apiDates.map((apiData, index) => (
									<LessonCard key={index} apiData={apiData} />
								))}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	);
};
