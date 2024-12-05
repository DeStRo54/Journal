type elem = {
  month: string;
  day: number;
};

export const findIndexByDate = (arr: elem[], target: elem) => {
  return arr.findIndex((item) => item.month === target.month && item.day === target.day + 1);
};
