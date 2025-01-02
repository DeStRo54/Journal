import React from 'react';

import { findDayIndex } from '../../helpers/findDayIndex';
import { getDaysForOtherCarousels } from '../../helpers/getDaysForOtherCarousels';
import { WeekHeader } from '../shared/WeekHeader/WeekHeader';

import styles from './CarouselWeek.module.css';
import { Button } from '@/components/ui/Button';
import { Slide } from '@/components/ui/Icons/Slide';
import clsx from 'clsx';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { findIndexByDate } from '../../helpers/findIndexByDate';

interface carouselWeekProps {
  currentDateIndex: number;
  currentDate: CustomDate;
  activeWeekNode: number;
  weekDays: string[];
  firstSessionDay: CustomDate;
  monthsNumbers: number[];
  values: CustomDates;
  onWeekNodeScroll: () => void;
  weekCarouselRef: React.RefObject<SwiperRef>;
  dayCarouselRef: React.RefObject<SwiperRef>;
}

export const CarouselWeek = ({
  currentDate,
  activeWeekNode,
  weekDays,
  values,
  firstSessionDay,
  monthsNumbers,
  onWeekNodeScroll,
  weekCarouselRef,
  dayCarouselRef
}: carouselWeekProps) => {
  const onDateNodeClick = (index: number) => {
    (dayCarouselRef.current as SwiperRef).swiper.slideTo(index, 0);
  };

  const daysByWeeks = React.useMemo(() => getDaysForOtherCarousels(values, 7), []);

  const [currentSlide, dayIndexInSlide] = React.useMemo(
    () => findDayIndex(values[activeWeekNode], daysByWeeks),
    [activeWeekNode, daysByWeeks]
  );

  return (
    <div className={styles['carousel-week']}>
      <div className={styles['navigation']}>
        <Button className="custom-prev" variant="slide" rotate={true}>
          <Slide />
        </Button>
        <WeekHeader
          currentDate={values[currentDate.day]}
          firstSessionDay={firstSessionDay}
          monthsNumbers={monthsNumbers}
          index={currentDate.day}
          variant="mobile"
        />
        <Button className="custom-next" variant="slide">
          <Slide />
        </Button>
      </div>
      <Swiper
        ref={weekCarouselRef}
        lazyPreloadPrevNext={20}
        initialSlide={currentSlide}
        freeMode={true}
        modules={[Navigation]}
        onSlideChange={onWeekNodeScroll}
        speed={500}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev'
        }}
      >
        {daysByWeeks.map((value, slideIndex) => (
          <SwiperSlide key={slideIndex} className={styles['carousel-week-slide']}>
            {value.map((value, dayIndex) => (
              <div
                key={dayIndex}
                className={styles['carousel-date-item']}
                onClick={() => onDateNodeClick(findIndexByDate(values, value))}
              >
                <p className={styles['day']}>{weekDays[dayIndex]}</p>
                <div
                  className={clsx(
                    styles['date-card'],
                    currentSlide === slideIndex && dayIndexInSlide === dayIndex && styles.clicked
                  )}
                >
                  <p>{value.day}</p>
                </div>
              </div>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
