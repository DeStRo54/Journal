import styles from './CarouselDay.module.css';
import { LessonCard } from './components/LessonCard/LessonCard';
import { DaySchedule } from '@/utils/api/requests/schedule/get/response';
import clsx from 'clsx';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface carouselDayProps {
  currentDateIndex: number;
  apiDates: DaySchedule[];
  onDayNodeScroll: () => void;
  dayCarouselRef: React.RefObject<SwiperRef>;
}

export const CarouselDay = ({ currentDateIndex, apiDates, onDayNodeScroll, dayCarouselRef }: carouselDayProps) => {
  console.log(apiDates);

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
            {apiData.outputClasses.map((value, index) => (
              <LessonCard key={index} apiData={value} />
            ))}
            {apiData.outputClasses.length === 0 && <div> Скипки скипки</div>}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
