import { LessonCard } from '../LessonCard/LessonCard';

import styles from './CarouselDay.module.css';
import clsx from 'clsx';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface carouselDayProps {
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
  onDayNodeScroll: () => void;
  dayCarouselRef: React.RefObject<SwiperRef>;
}

export const CarouselDay = ({
  currentDateIndex,
  values,
  apiDates,
  onDayNodeScroll,
  dayCarouselRef
}: carouselDayProps) => {
  return (
    <div className={styles['carousel-day']}>
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
  );
};
