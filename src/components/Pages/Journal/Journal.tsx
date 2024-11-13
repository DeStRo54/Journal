import { Carousel, CarouselContent, CarouselItem, Card, CardContent, CarouselPrevious, CarouselNext } from '@/components/ui/Carousel';
import clsx from 'clsx';
import styles from './Journal.module.css';
import { Header } from './modules/Header/Header';
export const Journal = () => {

	let values = [];
	for (let i = 1; i < 14 * 10; i++) {
		values.push(i);
	}

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles['journal-body']}>
				<Carousel opts={{ align: 'start' }}>
					<CarouselContent>
						{values.map((value, index) => (
							<CarouselItem key={index} className={clsx(styles['carousel-item'])}>
								<Card index={index}>
									<CardContent className={clsx(styles['card-content'])}>
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
		</div>
	);
};
