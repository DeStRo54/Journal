export const getDaysForOtherCarousels = (values: { year: number; month: string; day: number }[], slideSize: number) => {
  const new_values = [] as { year: number; month: string; day: number }[][];

  for (let i = 0; i < values.length; i += slideSize) {
    new_values.push(values.slice(i, i + slideSize));
  }
  return new_values;
};
