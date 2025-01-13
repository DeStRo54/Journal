import React from 'react';

import { firstSessionDay, monthsNumbers, weekDays } from '../constants';
import { useRestructSheduleData } from '../hooks/useRestructSheduleData';
import { CarouselDay } from '../modules/CarouselDay/CarouselDay';
import { CarouselWeek } from '../modules/CarouselWeek/CarouselWeek';
import { Header } from '../modules/Header/Header';

import styles from './JournalMobile.module.css';
import { Skeleton } from '@/components/ui/Skeleton';
import { SwiperRef } from 'swiper/react';

export const JournalMobile = () => {
  const { getScheduleStatus, data, values, currentDateIndex } = useRestructSheduleData();

  const [activeWeekNode, setActiveWeekNode] = React.useState(currentDateIndex);

  const [currentDate, setCurrentDate] = React.useState(() => ({
    year: values[currentDateIndex].year,
    month: values[currentDateIndex].month,
    day: currentDateIndex
  }));

  const dayCarouselRef = React.useRef<SwiperRef>(null);
  const weekCarouselRef = React.useRef<SwiperRef>(null);

  const onWeekNodeScroll = () => {
    const weekNodeIndex = (weekCarouselRef.current as SwiperRef).swiper.realIndex;

    setCurrentDate({
      year: values[weekNodeIndex * 7 + 6].year,
      month: values[weekNodeIndex * 7 + 6].month,
      day: weekNodeIndex * 7 + 6
    });
  };

  const onDayNodeScroll = () => {
    const dayNodeIndex = (dayCarouselRef.current as SwiperRef).swiper.realIndex;
    const weekNode = (weekCarouselRef.current as SwiperRef).swiper;

    setActiveWeekNode(dayNodeIndex);

    setCurrentDate({
      year: values[dayNodeIndex].year,
      month: values[dayNodeIndex].month,
      day: dayNodeIndex
    });

    weekNode.slideTo(Math.ceil((dayNodeIndex + 1) / 7) - 1, 400);
  };

  return (
    <article className={styles.container}>
      {getScheduleStatus.loading && <Skeleton />}
      {getScheduleStatus.success && (
        <React.Fragment>
          <Header />
          <div className={styles['journal-body']} id="journal">
            <CarouselWeek
              monthsNumbers={monthsNumbers}
              currentDate={currentDate}
              activeWeekNode={activeWeekNode}
              weekDays={weekDays}
              firstSessionDay={firstSessionDay}
              values={values}
              onWeekNodeScroll={onWeekNodeScroll}
              weekCarouselRef={weekCarouselRef}
              dayCarouselRef={dayCarouselRef}
            />
            <CarouselDay
              currentDateIndex={activeWeekNode}
              apiDates={data}
              onDayNodeScroll={onDayNodeScroll}
              dayCarouselRef={dayCarouselRef}
            />
          </div>
        </React.Fragment>
      )}
    </article>
  );
};
