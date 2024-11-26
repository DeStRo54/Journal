import React from 'react';

import 'swiper/swiper-bundle.css';
import styles from './Journal.module.css';
import { Header } from './modules/Header/Header';
import { LessonCard } from './modules/LessonCard/LessonCard';
import { Button } from '@/components/ui/Button';
import { Slide } from '@/components/ui/Icons/Slide';
import { Typhography } from '@/components/ui/Typhography';
import clsx from 'clsx';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

export const Journal = () => {
  const currentDate = new Date();

  const dateCarouselRef = React.useRef<SwiperRef | null>(null);
  const dayCarouselRef = React.useRef<SwiperRef | null>(null);
  const [activeDateNode, setActiveDayNode] = React.useState(currentDate.getDate() - 1);

  const values = [];
  for (let i = 1; i < 28 + 1; i++) {
    values.push(i);
  }

  const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  const apiData = {
    type: 'Лекция',
    subject: 'Матан',
    para: 1,
    time: '09:00 - 10:30',
    cabinet: '263 (C-20)',
    groups: ['XXXX-XX-23', 'XXXX-XX-23', 'XXXX-XX-23'],
    teacher: 'THE PASCALINE'
  };

  const monthData = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];

  const apiDates = [] as (typeof apiData)[];

  for (let i = 0; i < 3; i++) {
    apiDates.push(apiData);
  }
  const onDateNodeClick = (index: number) => {
    setActiveDayNode(index);
    (dayCarouselRef.current as SwiperRef).swiper.slideTo(index, 0);
  };

  const onDayNodeScroll = () => {
    const dayNodeIndex = (dayCarouselRef.current as SwiperRef).swiper.realIndex;
    const dateNode = (dateCarouselRef.current as SwiperRef).swiper;
    setActiveDayNode(dayNodeIndex);
    dateNode.slideTo(dayNodeIndex, 300);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles['journal-body']}>
        <div className={styles['carousel-date']}>
          <div className={styles['navigation-body']}>
            <Button className="custom-prev" variant="slide" rotate={true}>
              <Slide />
            </Button>
            <Typhography
              tag="h2"
              variant="secondary"
              children={`${monthData[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
            />
            <Button className="custom-next" variant="slide">
              <Slide />
            </Button>
          </div>
          <Swiper
            ref={dateCarouselRef}
            initialSlide={currentDate.getDate() - 1}
            slidesPerView={7}
            freeMode={true}
            slidesPerGroup={7}
            modules={[Navigation]}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev'
            }}
            speed={500}
          >
            {values.map((value, index) => (
              <SwiperSlide key={index} className={styles['carousel-date-item']}>
                <p className={styles['day']}>{weekDays[index % 7]}</p>
                <div
                  className={clsx(styles['date-card'], activeDateNode === index && styles.clicked)}
                  onClick={() => onDateNodeClick(index)}
                >
                  <p>{value}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <Swiper ref={dayCarouselRef} onSlideChange={onDayNodeScroll} freeMode={true}>
            {values.map((index) => (
              <SwiperSlide key={index} className={clsx(styles['day-card'])}>
                {apiDates.map((apiData, index) => (
                  <LessonCard key={index} apiData={apiData} />
                ))}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
