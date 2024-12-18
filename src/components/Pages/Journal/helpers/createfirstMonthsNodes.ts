type test_m = [string, number][];

export const createfirstMonthsNodes = (values: { year: number; month: string; day: number }[]) => {
  const new_values = [] as test_m;
  const uniqueMonths = new Set();

  for (let i = 0; i < values.length; i++) {
    if (!uniqueMonths.has(values[i].month)) {
      uniqueMonths.add(values[i].month);
      new_values.push([values[i].month, i]);
    }
  }
  return new_values;
};
