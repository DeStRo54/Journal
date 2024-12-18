import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from './CarouselMonth.module.css';
import React from 'react';
import { getDaysForCarouselMonth } from '../../helpers/getDaysByMonth';
import clsx from 'clsx';
import { findDayIndexInMonth } from '../../helpers/findDayIndexInMonth';
import { Typhography } from '@/components/ui/Typhography';
import { Button } from '@/components/ui/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { createfirstMonthsNodes } from '../../helpers/createfirstMonthsNodes';
import { findIndexByDate } from '../../helpers/findIndexByDate';

interface carouselWeekProps {
  currentDateIndex: number;
  currentDate: { year: number; month: string; week: number };
  activeDateNode: number;
  weekDays: string[];
  values: { year: number; month: string; day: number }[];
  monthCarouselRef: React.RefObject<SwiperRef>;
  dayCarouselRef: React.RefObject<SwiperRef>;
}

export const CarouselMonth = ({
  weekDays,
  activeDateNode,
  values,
  monthCarouselRef,
  currentDate,
  dayCarouselRef
}: carouselWeekProps) => {
  const daysByMonth = React.useMemo(() => getDaysForCarouselMonth(values), []);
  const [dropdownActive, setDropdownActive] = React.useState(false);

  const [currentSlide, dayIndexInSlide] = React.useMemo(
    () => findDayIndexInMonth(values[activeDateNode], daysByMonth),
    [activeDateNode, daysByMonth]
  );
  const firstMonthsNodes = React.useMemo(() => createfirstMonthsNodes(values), []);

  const onDropDownClick = () => {
    setDropdownActive(!dropdownActive);
  };

  const onScrollClick = (dayIndex: number) => {
    dayCarouselRef.current?.swiper.slideTo(dayIndex, 0);
  };

  return (
    <div className={styles['carousel-month']}>
      <div className={styles['header']}>
        <div className={styles['date-container']}>
          <Typhography
            tag="h2"
            variant="primary"
            className={styles['current-date']}
            children={`${currentDate.month} ${currentDate.year} — ${currentDate.week} неделя`}
          />
          <div className={styles['dropdown']}>
            <Button
              children={`${daysByMonth[currentSlide][dayIndexInSlide].month}`}
              className={clsx(styles['dropdown-btn'], dropdownActive && styles['dropdown-active'])}
              onClick={onDropDownClick}
            />
            <AnimatePresence>
              {dropdownActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className={styles['dropdown-content']}
                >
                  {firstMonthsNodes.map((value) => (
                    <Typhography
                      key={value[0]}
                      tag="p"
                      variant="secondary"
                      className={styles['dropdown-item']}
                      onClick={() => onScrollClick(value[1])}
                    >
                      {value[0]}
                    </Typhography>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className={styles['week-container']}>
          {weekDays.map((value, index) => (
            <div key={index} className={styles['week-day']}>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <Swiper ref={monthCarouselRef} initialSlide={currentSlide} speed={500}>
        {daysByMonth.map((value, slideIndex) => (
          <SwiperSlide key={slideIndex} className={styles['month-card']}>
            {value.map((value, dayIndex) => (
              <div
                key={dayIndex}
                className={styles['month-container']}
                onClick={() => onScrollClick(findIndexByDate(values, value))}
              >
                <div
                  className={clsx(
                    styles['day-card'],
                    currentSlide === slideIndex && dayIndexInSlide === dayIndex && styles.active
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
