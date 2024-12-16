import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from './CarouselMonth.module.css';
import React from 'react';
import { getDaysForCarouselMonth } from '../../helpers/getDaysByMonth';
import clsx from 'clsx';

interface carouselWeekProps {
  currentDateIndex: number;
  currentDate: { year: number; month: string; week: number };
  activeDateNode: number;
  // weekDays: string[];
  values: { year: number; month: string; day: number }[];
  // onWeekNodeScroll: () => void;
  // weekCarouselRef: React.RefObject<SwiperRef>;
}

export const CarouselMonth = ({ currentDateIndex, values }: carouselWeekProps) => {
  const daysByMonth = React.useMemo(() => getDaysForCarouselMonth(values), []);
  const [selectedDay, setSelectedDay] = React.useState(values[currentDateIndex]);

  const onDayNodeClick = (value: { year: number; month: string; day: number }) => {
    setSelectedDay(value);
    console.log(value);
  };

  return (
    <div className={styles['carousel-month']}>
      <Swiper className={styles.swiper} onSlideChange={() => console.log('slide change')}>
        {daysByMonth.map((value, index) => (
          <SwiperSlide key={index} className={styles['month-card']}>
            {value.map((value, index) => (
              <div key={index} className={styles['month-container']} onClick={() => onDayNodeClick(value)}>
                <div
                  className={clsx(
                    styles['day-card'],
                    (selectedDay.day === value.day && selectedDay.month === value.month) && styles.active
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
