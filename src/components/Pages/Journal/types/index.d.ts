type Months =
  | 'Январь'
  | 'Февраль'
  | 'Март'
  | 'Апрель'
  | 'Май'
  | 'Июнь'
  | 'Июль'
  | 'Август'
  | 'Сентябрь'
  | 'Октябрь'
  | 'Ноябрь'
  | 'Декабрь';

interface CustomDate {
  year: number;
  month: Months;
  day: number;
}

type CustomDates = CustomDate[];
type CustomDatesByWeeks = CustomDate[][];
