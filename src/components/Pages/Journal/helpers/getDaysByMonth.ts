export const getDaysForCarouselMonth = (values: { year: number; month: string; day: number }[]) => {
  const new_values = [] as { year: number; month: string; day: number }[][];

  const slideSize = 35;
  for (let i = 0; i < values.length; i += slideSize) {
    new_values.push(values.slice(i, i + slideSize));
  }
  return new_values;
};
