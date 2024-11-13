'use client';

import * as React from 'react';

import { Button } from '../Button';

import styles from './Carousel.module.css';
import { CarouselContext, useCarousel } from './hooks/useCarousel';
import { useNodeAction } from './hooks/useNodeClick';
import clsx from 'clsx';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];

type CarouselProps = {
	opts?: CarouselOptions;
	setApi?: (api: CarouselApi) => void;
};

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
	({ opts, setApi, children, ...props }, ref) => {
		const [carouselRef, api] = useEmblaCarousel({
			...opts,
			axis: 'x',
		});
		const [canScrollPrev, setCanScrollPrev] = React.useState(false);
		const [canScrollNext, setCanScrollNext] = React.useState(false);

		const onSelect = React.useCallback((api: CarouselApi) => {
			if (!api) {
				return;
			}

			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
		}, []);

		const scrollPrev = React.useCallback(() => {
			if (api?.canScrollPrev()) {
				api.scrollPrev();
			}
		}, [api,]);

		const scrollNext = React.useCallback(() => {
			if (api?.canScrollNext()) {
				api.scrollNext();
			}
		}, [api]);

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (event.key === 'ArrowLeft') {
					event.preventDefault();
					scrollPrev();
				}
				if (event.key === 'ArrowRight') {
					event.preventDefault();
					scrollNext();
				}
			},
			[scrollPrev, scrollNext]
		);

		React.useEffect(() => {
			if (!api || !setApi) {
				return;
			}

			setApi(api);
		}, [api, setApi]);

		React.useEffect(() => {
			if (!api) {
				return;
			}

			onSelect(api);
			api.on('reInit', onSelect);
			api.on('select', onSelect);

			return () => {
				api?.off('select', onSelect);
			};
		}, [api, onSelect]);

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api,
					opts,
					orientation: 'horizontal',
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext
				}}
			>
				<div
					ref={ref}
					onKeyDownCapture={handleKeyDown}
					className={styles.CardContent}
					role="region"
					aria-roledescription="carousel"
					{...props}
				>
					{children}
				</div>
			</CarouselContext.Provider>
		);
	}
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { carouselRef, orientation } = useCarousel();

		return (
			<div ref={carouselRef} className={className}>
				<div
					ref={ref}
					className={clsx(styles.CarouselContent, orientation === 'vertical' && styles.CarouselContentVertical)}
					{...props}
				/>
			</div>
		);
	}
);
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ ...props }, ref) => {
	const { orientation } = useCarousel();

	return (
		<div
			ref={ref}
			role="group"
			aria-roledescription="slide"
			className={clsx(styles.CarouselItem, orientation === 'vertical' && styles.CarouselItemVertical)}
			{...props}
		/>
	);
});
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(({ ...props }, ref) => {
	const { orientation, scrollPrev } = useCarousel();

	return (
		<Button
			variant={'menu-item'}
			ref={ref}
			className={clsx(
				styles.CarouselButton,
				orientation === 'horizontal' ? styles.CarouselButtonPreviousHorizontal : styles.CarouselButtonPreviousVertical
			)}
			onClick={scrollPrev}
			{...props}
		>
			<ArrowLeft className="h-4 w-4" />
		</Button>
	);
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(({ ...props }, ref) => {
	const { orientation, scrollNext } = useCarousel();

	return (
		<Button
			variant={'menu-item'}
			ref={ref}
			className={clsx(
				styles.CarouselButton,
				orientation === 'horizontal' ? styles.CarouselButtonNextHorizontal : styles.CarouselButtonNextVertical
			)}
			onClick={scrollNext}
			{...props}
		>
			<ArrowRight className="h-4 w-4" />
		</Button>
	);
});
CarouselNext.displayName = 'CarouselNext';

type customHTMLDivElementAttributes = React.HTMLAttributes<HTMLDivElement> & {
	index: number;
	dependScroll?: boolean;
};

const Card = React.forwardRef<HTMLDivElement, customHTMLDivElementAttributes>(
	({ className, index, dependScroll, ...props }, ref) => {
		const { api } = useCarousel();
		const { selectedIndex } = useNodeAction(api);

		React.useEffect(() => {
			if (dependScroll && index !== selectedIndex) {
				api?.scrollTo(index);
			}
			console.log('1');
		}, [index]);

		return (
			<div
				ref={ref}
				className={clsx(styles.Card, className, index === selectedIndex && styles.selected)}
				{...props}
			/>
		);
	}
);
Card.displayName = 'Card';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={clsx(styles.CardContent, className)} {...props} />
);
CardContent.displayName = 'CardContent';

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, Card, CardContent };