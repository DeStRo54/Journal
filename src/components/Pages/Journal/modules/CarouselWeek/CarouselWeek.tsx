/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { findDayIndex } from '../../helpers/findDayIndex';
import { findIndexByDate } from '../../helpers/findIndexByDate';
import { getDaysForOtherCarousels } from '../../helpers/getDaysForOtherCarousels';
import { LessonsList } from '../shared/LessonsList/LessonsList';
import { WeekHeader } from '../shared/WeekHeader/WeekHeader';

import 'swiper/swiper-bundle.css';
import styles from './CarouselWeek.module.css';
import { Button } from '@/components/ui/Button';
import { Slide } from '@/components/ui/Icons/Slide';
import clsx from 'clsx';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface carouselWeekProps {
  currentDate: CustomDate;
  activeWeekNode: number;
  weekDays: string[];
  firstSessionDay: CustomDate;
  monthsNumbers: number[];
  values: ValuesDates;
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
    <section className={styles['carousel-week']}>
      <header className={styles['navigation']}>
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
      </header>
      <Swiper
        tag='ul'
        ref={weekCarouselRef}
        onSlideChange={onWeekNodeScroll}
        lazyPreloadPrevNext={20}
        initialSlide={currentSlide}
        freeMode={true}
        modules={[Navigation]}
        speed={500}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev'
        }}
      >
        {daysByWeeks.map((week, slideIndex) => (
          <SwiperSlide key={slideIndex} tag='li'>
            <ul className={styles['carousel-week-slide']}>
              {week.map((value, dayIndex) => (
                <li
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
                    <p className={styles['date']}>{value.day}</p>
                  </div>
                  {value.lessons.length > 0 && <LessonsList lessons={value.lessons} />}
                </li>
              ))}
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
