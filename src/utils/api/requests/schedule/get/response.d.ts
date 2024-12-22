type Homework = {
  homeworkID: number;
  classSemNumber: number | null;
  subjectId: number;
  homeworkText: string;
  dueDate: string; // ISO 8601 format
};

export type ClassDetails = {
  subjectId: number;
  description: string;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  summary: string;
  semClassNumber: number;
  location: string;
};

export type OutputClass = {
  class: ClassDetails;
  homework: Homework[];
};

export type DaySchedule = {
  outputClasses: OutputClass[];
  independentHomeworks: Homework[];
};

export type AllScheduleResponse = {
  [date: string]: DaySchedule;
};
