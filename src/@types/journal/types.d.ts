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

type Lesson = OutputClass;
type Lessons = Lesson[];
type AllLessons = Lessons[];

type ValuesDate = CustomDate & { lessons: Lessons };
type ValuesDates = ValuesDate[];

type CustomDates = CustomDate[];
type CustomDatesByWeeks = CustomDate[][];

type HomeworkElement = { homeworkText: string; homeworkID: number };
type HomeworkArray = HomeworkElement[];
