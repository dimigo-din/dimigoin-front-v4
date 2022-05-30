export enum DAILY_TIME_PERIOD {
  MORNING,
  BEFORE_NOON,
  EVENING,
  NEXT_MORNING,
}

export const getTimePeriod = () => {
  const current = new Date().getHours();
  if (current < 8) return DAILY_TIME_PERIOD.MORNING;
  if (current < 14) return DAILY_TIME_PERIOD.BEFORE_NOON;
  if (current < 20) return DAILY_TIME_PERIOD.EVENING;
  return DAILY_TIME_PERIOD.NEXT_MORNING;
};