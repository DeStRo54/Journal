import React from 'react';

import 'swiper/swiper-bundle.css';
import styles from './CarouselDay.module.css';
import { FreeDay } from './components/FreeDay/FreeDay';
import { Lesson } from './components/Lesson/Lesson';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface CarouselDayProps extends React.ComponentProps<'div'> {
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
}: CarouselDayProps) => {
  const updateHeight = () => {
    if (dayCarouselRef.current) {
      dayCarouselRef.current.swiper.wrapperEl.style.height = 'auto';
    }
  };

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
              {apiData.independentHomeworks.map((value) => (
                <p key={value.homeworkID}>{value.homeworkText}</p>
              ))}
              {apiData.outputClasses.map((value) => (
                <Lesson key={value.class.startTime} apiData={value} updateHeight={updateHeight} />
              ))}
              {apiData.outputClasses.length === 0 && <FreeDay />}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
