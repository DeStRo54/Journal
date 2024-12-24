type monthsIndexes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type daysIndexes =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

interface createDateProps {
  currentYear: number;
  currentMonthIndex: monthsIndexes;
  currentDayIndex: daysIndexes;
  daysCount: number;
}

export const createDate = ({ currentYear, currentMonthIndex, currentDayIndex, daysCount }: createDateProps) => {
  const monthData = [
    { month: 'Январь', days: 31 },
    { month: 'Февраль', days: 28 },
    { month: 'Март', days: 31 },
    { month: 'Апрель', days: 30 },
    { month: 'Май', days: 31 },
    { month: 'Июнь', days: 30 },
    { month: 'Июль', days: 31 },
    { month: 'Август', days: 31 },
    { month: 'Сентябрь', days: 30 },
    { month: 'Октябрь', days: 31 },
    { month: 'Ноябрь', days: 30 },
    { month: 'Декабрь', days: 31 }
  ];

  const generateValues = (
    year: number,
    monthIndex: number,
    dayIndex: number,
    remaining: number
  ): { year: number; month: string; day: number }[] => {
    if (remaining === 0) return [];

    const currentMonth = monthData[monthIndex];
    const daysInCurrentMonth = currentMonth.days;

    if (dayIndex > daysInCurrentMonth) {
      return generateValues(monthIndex === 11 ? year + 1 : year, (monthIndex + 1) % 12, 1, remaining);
    }

    return [
      { year, month: currentMonth.month, day: dayIndex },
      ...generateValues(year, monthIndex, dayIndex + 1, remaining - 1)
    ];
  };

  return generateValues(currentYear, currentMonthIndex - 1, currentDayIndex, daysCount);
};
