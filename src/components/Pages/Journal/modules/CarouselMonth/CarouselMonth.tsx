/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { createfirstMonthsNodes } from '../../helpers/createfirstMonthsNodes';
import { findDayIndex } from '../../helpers/findDayIndex';
import { findIndexByDate } from '../../helpers/findIndexByDate';
import { getDaysForOtherCarousels } from '../../helpers/getDaysForOtherCarousels';
import { WeekHeader } from '../shared/WeekHeader/WeekHeader';

import styles from './CarouselMonth.module.css';
import { Button } from '@/components/ui/Button';
import { Typhography } from '@/components/ui/Typhography';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface carouselWeekProps {
  currentDate: { year: number; month: string; day: number };
  activeDateNode: number;
  weekDays: string[];
  firstSessionDay: number;
  monthsNumbers: number[];
  values: { year: number; month: string; day: number }[];
  monthCarouselRef: React.RefObject<SwiperRef>;
  dayCarouselRef: React.RefObject<SwiperRef>;
}

export const CarouselMonth = ({
  weekDays,
  activeDateNode,
  values,
  firstSessionDay,
  monthsNumbers,
  monthCarouselRef,
  currentDate,
  dayCarouselRef
}: carouselWeekProps) => {
  const daysByMonth = React.useMemo(() => getDaysForOtherCarousels(values, 35), []);
  const [dropdownActive, setDropdownActive] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<number | null>(null);

  const [prevTest, setPrevTest] = React.useState(false);

  const [currentSlide, dayIndexInSlide] = React.useMemo(
    () => findDayIndex(values[activeDateNode], daysByMonth),
    [activeDateNode, daysByMonth]
  );
  const firstMonthsNodes = React.useMemo(() => createfirstMonthsNodes(values), []);

  const onDropDownClick = () => {
    setDropdownActive((prev) => !prev);
  };

  const clearExistingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  React.useEffect(() => {
    return () => {
      clearExistingTimeout();
    };
  }, []);

  const onScrollClick = (dayIndex: number) => {
    clearExistingTimeout();
    dayCarouselRef.current?.swiper.slideTo(dayIndex, 0);
    timeoutRef.current = window.setTimeout(() => {
      setDropdownActive(false);
      setPrevTest(false); // Сброс состояния
    }, 250);
  };

  const handleClickOutside = () => {
    clearExistingTimeout();
    if (prevTest) return;
    timeoutRef.current = window.setTimeout(() => {
      setDropdownActive(false);
    }, 100);
  };


  return (
    <div className={styles['carousel-month']}>
      <div className={styles['header']}>
        <div className={styles['date-container']}>
          <WeekHeader
            currentDate={values[currentDate.day]}
            firstSessionDay={firstSessionDay}
            monthsNumbers={monthsNumbers}
            index={currentDate.day}
            variant="desktop"
          />
          <div className={styles['dropdown']} ref={dropdownRef} onBlur={handleClickOutside}>
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
