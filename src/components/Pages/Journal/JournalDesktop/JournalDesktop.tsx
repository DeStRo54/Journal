import React from 'react';

import { Header } from '../../../modules/Header/Header';
import { useRestructSheduleData } from '../hooks/useRestructSheduleData';
import { CarouselDay } from '../modules/CarouselDay/CarouselDay';
import { CarouselMonth } from '../modules/CarouselMonth/CarouselMonth';

import styles from './JournalDesktop.module.css';
import { Loader } from '@/components/ui/Loader';
import { SwiperRef } from 'swiper/react';

export const JournalDesktop = () => {
  const { getScheduleStatus, data, values, currentDateIndex } = useRestructSheduleData();

  const [activeWeekNode, setActiveWeekNode] = React.useState(currentDateIndex);

  const [currentDate, setCurrentDate] = React.useState(() => ({
    year: values[currentDateIndex].year,
    month: values[currentDateIndex].month,
    day: currentDateIndex
  }));

  const dayCarouselRef = React.useRef<SwiperRef>(null);
  const monthCarouselRef = React.useRef<SwiperRef>(null);

  const onDayNodeScroll = () => {
    const dayNodeIndex = (dayCarouselRef.current as SwiperRef).swiper.realIndex;
    const monthNode = (monthCarouselRef.current as SwiperRef).swiper;

    setActiveWeekNode(dayNodeIndex);

    setCurrentDate({
      year: values[dayNodeIndex].year,
      month: values[dayNodeIndex].month,
      day: dayNodeIndex
    });

    monthNode.slideTo(Math.ceil((dayNodeIndex + 1) / 35) - 1, 0);
  };

  return (
    <article className={styles.container}>
      {getScheduleStatus.loading && <Loader />}
      {getScheduleStatus.success && (
        <React.Fragment>
          <Header />
          <div className={styles['journal-body']} id="journal">
            <CarouselMonth
              values={values}
              currentDate={currentDate}
              activeDateNode={activeWeekNode}
              monthCarouselRef={monthCarouselRef}
              dayCarouselRef={dayCarouselRef}
            />
            <CarouselDay
              className={styles['desktop']}
              values={values}
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
