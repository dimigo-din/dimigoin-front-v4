import { useEffect, useState } from 'react';
import { getDailyMeal } from '@/api';
import { DailyMeal } from '@/constants/types';
import moment from 'moment-timezone';

export const useMeal = (dateStamp?: number) => {
  const [meal, setMeal] = useState<DailyMeal | undefined | null>(undefined);

  useEffect(() => {
    getDailyMeal(moment(dateStamp || undefined).format('YYYY-MM-DD'))
      .then(setMeal)
      .catch(() => setMeal(() => null));
  }, [dateStamp]);
  return meal;
};
