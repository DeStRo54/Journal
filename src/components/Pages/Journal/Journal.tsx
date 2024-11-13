import React from 'react';
import styles from './Journal.module.css';
import { Header } from './modules/Header/Header';
import { Card, CardContent, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/Carousel';
import clsx from 'clsx';
export const Journal = () => {
	const [dayIndex, setDayIndex] = React.useState(0);

	const values = [];
	for (let i = 1; i < 14 * 10; i++) {
		values.push(i);
	}

	const onNodeClick = (index: number) => {
		setDayIndex(index);
	};

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles['journal-body']}>
				<div className={styles['carousel-date']}>
					<Carousel opts={{ align: 'start', slidesToScroll: 7, duration: 20, skipSnaps: false }}>
						<CarouselContent>
							{values.map((value, index) => (
								<CarouselItem key={index} className={clsx(styles['carousel-date-item'])}>
									<Card index={index}>
										<CardContent className={clsx(styles['date-card'])} onClick={() => onNodeClick(index)}>
											{value}
										</CardContent>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
				<div>
					<Carousel opts={{ align: 'start', duration: 0, skipSnaps: false }}>
						<CarouselContent>
							{values.map((value, index) => (
								<CarouselItem key={index} className={clsx(styles['carousel-day-item'])}>
									<Card index={dayIndex} dependScroll={true}>
										<CardContent className={clsx(styles['day-card'])}>
											{value}
										</CardContent>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>
		</div>
	);
};
