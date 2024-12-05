export const getDays = () => {
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

  const values = [];
  let currentMonthIndex = 8; // Начинаем с февраля (индекс 1)
  let currentDay = 2; // Начинаем с 11 февраля
  let currentMonthDays = monthData[currentMonthIndex].days;

  // Создаем 126 объектов
  for (let i = 0; i < 126; i++) {
    values.push({
      month: monthData[currentMonthIndex].month,
      day: currentDay
    });

    // Переход к следующему дню
    currentDay++;

    // Если текущий день больше, чем количество дней в месяце, переходим к следующему месяцу
    if (currentDay > currentMonthDays) {
      currentMonthIndex++;

      if (currentMonthIndex === 12) currentMonthIndex = 0;

      if (currentMonthIndex >= monthData.length) break;
      currentDay = 1;
      currentMonthDays = monthData[currentMonthIndex].days; // Обновляем количество дней в новом месяце
    }
  }

  return values;
};
