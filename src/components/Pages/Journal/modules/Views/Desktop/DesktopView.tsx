import { useRef } from 'react';

import { CarouselDay } from '../../shared/carouselDay/CarouselDay';

import styles from './DesktopView.module.css';
import { SwiperRef } from 'swiper/react';

interface DesktopViewProps {
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
	}[];
}

export const DesktopView = ({ apiDates, values, currentDateIndex }: DesktopViewProps) => {
	const dayCarouselRef = useRef<SwiperRef | null>(null);

	const onDayNodeScroll = () => {
		console.log('scroll');
	};

	return <div className={styles.desktop}>
		<div className={styles['carousel-month']}>
			<p>Test</p>
		</div>
		<div className={styles['carousel-day']}>
			<CarouselDay currentDateIndex={currentDateIndex} values={values} apiDates={apiDates} onDayNodeScroll={onDayNodeScroll} dayCarouselRef={dayCarouselRef} />
		</div>
	</div>;
};
