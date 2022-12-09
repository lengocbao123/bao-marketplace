import { endOfToday, getUnixTime, startOfToday, subDays } from 'date-fns';

export const convertPeriod = (period: string) => {
  const currentTime = Date.now();
  let startTime;
  const endTime = endOfToday();
  if (period === '24_hours') {
    startTime = startOfToday();
  } else if (period === '7_days') {
    startTime = subDays(currentTime, 7);
  } else if (period === '30_days') {
    startTime = subDays(currentTime, 30);
  } else {
    startTime = currentTime;
  }

  return {
    startTime: getUnixTime(startTime) * 1000,
    endTime: getUnixTime(endTime) * 1000,
  };
};
