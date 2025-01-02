export const getDaysForOtherCarousels = (values: CustomDates, slideSize: number) => {
  const new_values = [] as CustomDatesByWeeks;

  for (let i = 0; i < values.length; i += slideSize) {
    new_values.push(values.slice(i, i + slideSize));
  }
  return new_values;
};
