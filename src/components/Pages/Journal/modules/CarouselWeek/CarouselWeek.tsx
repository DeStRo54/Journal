import { WeekHeader } from '../shared/WeekHeader/WeekHeader';

import styles from './CarouselWeek.module.css';
import { Button } from '@/components/ui/Button';
import { Slide } from '@/components/ui/Icons/Slide';
import clsx from 'clsx';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface carouselWeekProps {
  currentDateIndex: number;
  currentDate: { year: number; month: string; day: number };
  activeWeekNode: number;
  weekDays: string[];
  firstSessionDay: number;
  monthsNumbers: number[];
  values: { year: number; month: string; day: number }[];
  onWeekNodeScroll: () => void;
  weekCarouselRef: React.RefObject<SwiperRef>;
  dayCarouselRef: React.RefObject<SwiperRef>;
}

export const CarouselWeek = ({
  currentDateIndex,
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

  return (
    <div className={styles['carousel-week']}>
      <div className={styles['navigation']}>
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
      </div>
      <Swiper
        ref={weekCarouselRef}
        lazyPreloadPrevNext={20}
        slidesPerView={7}
        initialSlide={currentDateIndex}
        freeMode={true}
        slidesPerGroup={7}
        modules={[Navigation]}
        onSlideChange={onWeekNodeScroll}
        speed={500}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev'
        }}
      >
        {values.map((value, index) => (
          <SwiperSlide key={index} className={styles['carousel-date-item']}>
            <p className={styles['day']}>{weekDays[index % 7]}</p>
            <div
              className={clsx(styles['date-card'], activeWeekNode === index && styles.clicked)}
              onClick={() => onDateNodeClick(index)}
            >
              <p>{value.day}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
