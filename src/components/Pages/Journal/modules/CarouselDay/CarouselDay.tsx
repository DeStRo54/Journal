import styles from './CarouselDay.module.css';
import { LessonCard } from './LessonCard/LessonCard';
import clsx from 'clsx';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface carouselDayProps {
  currentDateIndex: number;
  apiDates: {
    type: string;
    subject: string;
    para: number;
    time: string;
    cabinet: string;
    teacher: string;
    homework: string;
  }[][];
  onDayNodeScroll: () => void;
  dayCarouselRef: React.RefObject<SwiperRef>;
}

export const CarouselDay = ({ currentDateIndex, apiDates, onDayNodeScroll, dayCarouselRef }: carouselDayProps) => {
  return (
    <div className={styles['carousel-day']}>
      <Swiper
        ref={dayCarouselRef}
        lazyPreloadPrevNext={14}
        freeMode={true}
        initialSlide={currentDateIndex}
        onSlideChange={onDayNodeScroll}
      >
        {apiDates.map((apiData, index) => (
          <SwiperSlide key={index} className={clsx(styles['day-card'])}>
            {apiData.map((value, index) => (
              <LessonCard key={index} apiData={value} />
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
