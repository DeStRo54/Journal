import styles from './CarouselDay.module.css';
import { FreeDay } from './components/FreeDay/FreeDay';
import { LessonCard } from './components/LessonCard/LessonCard';
import { DaySchedule } from '@/utils/api/requests/schedule/get/response';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface carouselDayProps {
  currentDateIndex: number;
  apiDates: DaySchedule[];
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
        autoHeight={true}
      >
        {apiDates.map((apiData, index) => (
          <SwiperSlide key={index} className={styles['swiper-layout']}>
            <div className={styles['day-card']}>
              {apiData.outputClasses.map((value, index) => (
                <LessonCard key={index} apiData={value} />
              ))}
              {!apiData.outputClasses.length && <FreeDay />}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
