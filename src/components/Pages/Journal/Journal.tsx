/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import 'swiper/swiper-bundle.css';
import { createDate } from './helpers/createDate';
import { findIndexByDate } from './helpers/findIndexByDate.ts';
import styles from './Journal.module.css';
import { CarouselDay } from './modules/CarouselDay/CarouselDay.tsx';
import { CarouselMonth } from './modules/CarouselMonth/CarouselMonth.tsx';
import { CarouselWeek } from './modules/CarouselWeek/CarouselWeek.tsx';
import { Header } from './modules/Header/Header.tsx';
import { AllScheduleResponse } from '@/utils/api/requests/schedule/get/response.js';
import { useGetAllScheduleQuery } from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi.ts';
import { SwiperRef } from 'swiper/react';

export const Journal = () => {
  const monthCarouselRef = React.useRef<SwiperRef | null>(null);
  const weekCarouselRef = React.useRef<SwiperRef | null>(null);
  const dayCarouselRef = React.useRef<SwiperRef | null>(null);

  const today = new Date();

  const getSchedule = useGetAllScheduleQuery(
    {
      params: {
        from_time: '02.09.2024',
        days_count: 154
      }
    },
    {
      selectFromResult: (data) => {
        return data;
      }
    }
  );

  const getScheduleResponse = getSchedule?.data;
  const success = getSchedule?.isSuccess;

  const data = success ? Object.values(getScheduleResponse as AllScheduleResponse) : [];

  const values = React.useMemo(
    () => createDate({ currentYear: today.getFullYear(), currentMonthIndex: 9, currentDayIndex: 2, daysCount: 154 }),
    []
  ); //массив дней семестра

  const monthsNumbers = [9, 10, 11, 12]; //месяца обучения
  const firstSessionDay = 24; //первый день сессии

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
      day: currentDateIndex
    };
  });

  const [activeWeekNode, setActiveWeekNode] = React.useState(() => currentDateIndex);

  const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  const onWeekNodeScroll = () => {
    const weekNodeIndex = (weekCarouselRef.current as SwiperRef).swiper.realIndex;
    setCurrentDate({
      year: values[weekNodeIndex].year,
      month: values[weekNodeIndex].month,
      day: weekNodeIndex
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
      day: dayNodeIndex
    });

    weekNode.slideTo(dayNodeIndex, 300);
    monthNode.slideTo(Math.ceil((dayNodeIndex + 1) / 35) - 1, 0);
  };

  return (
    <div className={styles.container}>
      <Header />
      {success && (
        <div className={styles['journal-body']}>
          <CarouselMonth
            weekDays={weekDays}
            values={values}
            firstSessionDay={firstSessionDay}
            monthsNumbers={monthsNumbers}
            currentDate={currentDate}
            activeDateNode={activeWeekNode}
            monthCarouselRef={monthCarouselRef}
            dayCarouselRef={dayCarouselRef}
          />
          <CarouselWeek
            currentDateIndex={currentDateIndex}
            currentDate={currentDate}
            activeWeekNode={activeWeekNode}
            weekDays={weekDays}
            firstSessionDay={firstSessionDay}
            monthsNumbers={monthsNumbers}
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
      )}
    </div>
  );
};
