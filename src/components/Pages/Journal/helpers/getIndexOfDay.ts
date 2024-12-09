type elem = {
	year: number;
	month: string;
	day: number;
};

export const findIndexByDate = (arr: elem[], target: elem) =>
	arr.findIndex((item) => item.month === target.month && item.day === target.day && item.year === target.year);
