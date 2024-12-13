import React from 'react';

import { calculateWeek } from '../../../helpers/calculateWeek';
import { CarouselDay } from '../../shared/carouselDay/CarouselDay';

import styles from './MobileView.module.css';
import { Button } from '@/components/ui/Button';
import { Slide } from '@/components/ui/Icons/Slide';
import { Typhography } from '@/components/ui/Typhography';
import clsx from 'clsx';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface MobileViewProps {
	currentDateIndex: number;
	values: { year: number; month: string; day: number }[];
	apiDates: {
		type: string;
		subject: string;
		para: number;
		time: string;
		cabinet: string;
		teacher: string;
		homework: string;
	}[][];
}

export const MobileView = ({ currentDateIndex, values, apiDates }: MobileViewProps) => {
	const [currentDate, setCurrentDate] = React.useState(() => {
		return {
			year: values[currentDateIndex].year,
			month: values[currentDateIndex].month,
			week: Math.ceil((currentDateIndex + 1) / 7)
		};
	});

	const [activeDateNode, setActiveDayNode] = React.useState(() => currentDateIndex);

	const dateCarouselRef = React.useRef<SwiperRef | null>(null);
	const dayCarouselRef = React.useRef<SwiperRef | null>(null);

	const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

	const onDateNodeClick = (index: number) => {
		(dayCarouselRef.current as SwiperRef).swiper.slideTo(index, 0);
	};

	const onDateNodeScroll = () => {
		const dateNodeIndex = (dateCarouselRef.current as SwiperRef).swiper.realIndex;

		setCurrentDate({
			year: values[dateNodeIndex + 6].year,
			month: values[dateNodeIndex].month,
			week: calculateWeek(dateNodeIndex)
		});
	};

	const onDayNodeScroll = () => {
		const dayNodeIndex = (dayCarouselRef.current as SwiperRef).swiper.realIndex;
		const dateNode = (dateCarouselRef.current as SwiperRef).swiper;

		setActiveDayNode(dayNodeIndex);

		setCurrentDate({
			year: values[dayNodeIndex].year,
			month: values[dayNodeIndex].month,
			week: calculateWeek(dayNodeIndex)
		});

		dateNode.slideTo(dayNodeIndex, 300);
	};

	return (
		<div className={styles.mobile}>
			<div className={styles['carousel-week']}>
				<div className={styles['navigation']}>
					<Button className="custom-prev" variant="slide" rotate={true}>
						<Slide />
					</Button>

					<Typhography
						tag="h2"
						variant="secondary"
						className={styles['current-date']}
						children={`${currentDate.month} ${currentDate.year} — ${currentDate.week} неделя`} //сгладить текст
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
					onSlideChange={onDateNodeScroll}
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
			<CarouselDay
				currentDateIndex={activeDateNode}
				apiDates={apiDates}
				onDayNodeScroll={onDayNodeScroll}
				dayCarouselRef={dayCarouselRef}
			/>
		</div>
	);
};
