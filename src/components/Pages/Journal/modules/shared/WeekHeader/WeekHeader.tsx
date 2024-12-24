import React from 'react';

import { calculateWeek } from '../../../helpers/calculateWeek';

import { Typhography } from '@/components/ui/Typhography';

type WeekHeaderVariant = 'mobile' | 'desktop';

interface WeekHeaderProps {
  currentDate: { year: number; month: string; day: number };
  firstSessionDay: number;
  monthsNumbers: number[];
  index: number;
  variant: WeekHeaderVariant;
}

const Months = {
  Январь: 1,
  Февраль: 2,
  Март: 3,
  Апрель: 4,
  Май: 5,
  Июнь: 6,
  Июль: 7,
  Август: 8,
  Сентябрь: 9,
  Октябрь: 10,
  Ноябрь: 11,
  Декабрь: 12
};

export const WeekHeader = ({ currentDate, index, variant, firstSessionDay, monthsNumbers }: WeekHeaderProps) => {
  const isMonthInList = monthsNumbers.includes(Months[currentDate.month as keyof typeof Months]);
  const weekData = isMonthInList && currentDate.day < firstSessionDay ? `${calculateWeek(index)} неделя` : 'сессия';

  return (
    <React.Fragment>
      <Typhography
        tag="h2"
        variant={variant === 'mobile' ? 'thirdy' : 'primary'}
        children={`${currentDate.month} ${currentDate.year} — ${weekData}`}
      />
    </React.Fragment>
  );
};
