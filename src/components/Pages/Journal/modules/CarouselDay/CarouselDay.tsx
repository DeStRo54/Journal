import React from 'react';

import styles from './CarouselDay.module.css';
import { FreeDay } from './components/FreeDay/FreeDay';
import { Lesson } from './components/Lesson/Lesson';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface carouselDayProps extends React.ComponentProps<'div'> {
  currentDateIndex: number;
  apiDates: DaySchedule[];
  onDayNodeScroll: () => void;
  dayCarouselRef: React.RefObject<SwiperRef>;
}

export const CarouselDay = ({
  currentDateIndex,
  apiDates,
  onDayNodeScroll,
  dayCarouselRef,
  ...props
}: carouselDayProps) => {
  return (
    <div {...props}>
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
                <Lesson key={index} apiData={value} />
              ))}
              {apiData.outputClasses.length === 0 && <FreeDay />}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
