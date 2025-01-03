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

type Homework = {
  homeworkID: number;
  classSemNumber: number | null;
  subjectId: number;
  homeworkText: string;
  dueDate: string; // ISO 8601 format
};

type ClassDetails = {
  subjectId: number;
  category: string;
  description: string;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  summary: string;
  semClassNumber: number;
  location: string;
};

type OutputClass = {
  class: ClassDetails;
  homework: Homework[];
};

type Lesson = OutputClass;
type Lessons = Lesson[];
type AllLessons = Lessons[];

type ValuesDate = CustomDate & { lessons: Lessons };
type ValuesDates = ValuesDate[];

type CustomDates = CustomDate[];
type CustomDatesByWeeks = CustomDate[][];
