import React from 'react';

import 'swiper/swiper-bundle.css';
import { createDate } from './helpers/createDate';
import styles from './Journal.module.css';
import { Header } from './modules/shared/Header/Header.tsx';
import { SwiperRef } from 'swiper/react';
import { CarouselDay } from './modules/CarouselDay/CarouselDay.tsx';
import { calculateWeek } from './helpers/calculateWeek.ts';
import { CarouselWeek } from './modules/CarouselWeek/CarouselWeek.tsx';
import { CarouselMonth } from './modules/CarouselMonth/CarouselMonth.tsx';
import { findIndexByDate } from './helpers/findIndexByDate.ts';

export const Journal = () => {
  const monthCarouselRef = React.useRef<SwiperRef | null>(null);
  const weekCarouselRef = React.useRef<SwiperRef | null>(null);
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

  //типо данные с сервера

  const apiDates = [] as (typeof apiData)[];

  const getDatesResponse = [] as (typeof apiDates)[];

  for (let i = 0; i < 6; i++) {
    apiDates.push(apiData);
  }

  for (let i = 0; i < 126; i++) {
    getDatesResponse.push(apiDates);
  }

  //

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

  const [activeWeekNode, setActiveWeekNode] = React.useState(() => currentDateIndex);

  const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  const onWeekNodeScroll = () => {
    const weekNodeIndex = (weekCarouselRef.current as SwiperRef).swiper.realIndex;
    setCurrentDate({
      // year: values[dateNodeIndex + 6].year, //зачем я это сделал?
      year: values[weekNodeIndex].year,
      month: values[weekNodeIndex].month,
      week: calculateWeek(weekNodeIndex)
    });
  };

  const onDayNodeScroll = () => {
    const dayNodeIndex = (dayCarouselRef.current as SwiperRef).swiper.realIndex;
    const weekNode = (weekCarouselRef.current as SwiperRef).swiper;
    const monthNode = (monthCarouselRef.current as SwiperRef).swiper;

    setActiveWeekNode(dayNodeIndex);

    setCurrentDate({
      year: values[dayNodeIndex].year,
      month: values[dayNodeIndex].month,
      week: calculateWeek(dayNodeIndex)
    });

    weekNode.slideTo(dayNodeIndex, 300);
    monthNode.slideTo(Math.ceil((dayNodeIndex + 1) / 35) - 1, 0);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles['journal-body']}>
        <CarouselMonth
          weekDays={weekDays}
          values={values}
          currentDate={currentDate}
          activeDateNode={activeWeekNode}
          currentDateIndex={currentDateIndex}
          monthCarouselRef={monthCarouselRef}
          dayCarouselRef={dayCarouselRef}
        />
        <CarouselWeek
          currentDateIndex={currentDateIndex}
          currentDate={currentDate}
          activeWeekNode={activeWeekNode}
          weekDays={weekDays}
          values={values}
          onWeekNodeScroll={onWeekNodeScroll}
          weekCarouselRef={weekCarouselRef}
          dayCarouselRef={dayCarouselRef}
        />
        <CarouselDay
          currentDateIndex={activeWeekNode}
          apiDates={getDatesResponse}
          onDayNodeScroll={onDayNodeScroll}
          dayCarouselRef={dayCarouselRef}
        />
      </div>
    </div>
  );
};
