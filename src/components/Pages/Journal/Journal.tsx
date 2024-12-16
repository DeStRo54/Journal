import React from 'react';

import 'swiper/swiper-bundle.css';
import { createDate } from './helpers/createDate';
import { findIndexByDate } from './helpers/getIndexOfDay';
import styles from './Journal.module.css';
import { Header } from './modules/shared/Header/Header.tsx';
import { SwiperRef } from 'swiper/react';
import { CarouselDay } from './modules/CarouselDay/CarouselDay.tsx';
import { calculateWeek } from './helpers/calculateWeek.ts';
import { CarouselWeek } from './modules/CarouselWeek/CarouselWeek.tsx';
import { CarouselMonth } from './modules/CarouselMonth/CarouselMonth.tsx';

export const Journal = () => {
  const dateCarouselRef = React.useRef<SwiperRef | null>(null);
  const dayCarouselRef = React.useRef<SwiperRef | null>(null);

  const today = new Date();

  const values = React.useMemo(
    () => createDate({ currentYear: today.getFullYear(), currentMonthIndex: 9, currentDayIndex: 2 }),
    []
  );

  const apiData = {
    type: 'Лекция',
    subject: 'Матан',
    para: 1,
    time: '09:00 - 10:30',
    cabinet: '263 (C-20)',
    homework: 'Задание',
    teacher: 'THE PASCALINE'
  };

  const apiDates = [] as (typeof apiData)[];

  const getDatesResponse = [] as (typeof apiDates)[];

  for (let i = 0; i < 6; i++) {
    apiDates.push(apiData);
  }

  for (let i = 0; i < 126; i++) {
    getDatesResponse.push(apiDates);
  }

  const monthData = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];

  const currentDateIndex = React.useMemo(
    () =>
      findIndexByDate(values, {
        year: today.getFullYear(),
        month: monthData[today.getMonth()],
        day: today.getDate()
      }),
    []
  );

  const [currentDate, setCurrentDate] = React.useState(() => {
    return {
      year: values[currentDateIndex].year,
      month: values[currentDateIndex].month,
      week: Math.ceil((currentDateIndex + 1) / 7)
    };
  });

  const [activeDateNode, setActiveDayNode] = React.useState(() => currentDateIndex);

  const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  const onDateNodeScroll = () => {
    const dateNodeIndex = (dateCarouselRef.current as SwiperRef).swiper.realIndex;

    setCurrentDate({
      year: values[dateNodeIndex + 6].year,
      month: values[dateNodeIndex].month,
      week: calculateWeek(dateNodeIndex)
    });
  };

  const onDayNodeScroll = () => {
    const dayNodeIndex = (dayCarouselRef.current as SwiperRef).swiper.realIndex;
    const dateNode = (dateCarouselRef.current as SwiperRef).swiper;

    setActiveDayNode(dayNodeIndex);

    setCurrentDate({
      year: values[dayNodeIndex].year,
      month: values[dayNodeIndex].month,
      week: calculateWeek(dayNodeIndex)
    });

    dateNode.slideTo(dayNodeIndex, 300);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles['journal-body']}>
        <CarouselMonth
          values={values}
          currentDate={currentDate}
          activeDateNode={activeDateNode}
          currentDateIndex={currentDateIndex}
        />
        <CarouselWeek
          currentDateIndex={currentDateIndex}
          currentDate={currentDate}
          activeDateNode={activeDateNode}
          weekDays={weekDays}
          values={values}
          onWeekNodeScroll={onDateNodeScroll}
          weekCarouselRef={dateCarouselRef}
          dayCarouselRef={dayCarouselRef}
        />
        <CarouselDay
          currentDateIndex={activeDateNode}
          apiDates={getDatesResponse}
          onDayNodeScroll={onDayNodeScroll}
          dayCarouselRef={dayCarouselRef}
        />
      </div>
    </div>
  );
};
