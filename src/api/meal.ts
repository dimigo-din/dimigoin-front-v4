import { DailyMeal } from '@/constants/types';
import { api } from './api';

export const getWeeklyMeals = async (date: string): Promise<DailyMeal[]> =>
  (await api<'weeklyMeals'>('GET', '/meal/weekly')).meals;

export const getDailyMeal = (date: string) =>
  api<'dailyMeal'>('GET', `/meal/date/${date}`).then(
    (e) => e.meal,
  );

export const requestMentoringApplyInfoSheet = () =>
  api<'requestMentoringApplyInfoSheet'>(
    'POST',
    '/mentoring-application/export',
  ).then((e) => e.exportedFile);

export const registerWeeklyMeal = (meals: DailyMeal[]) => api<'registerWeeklyMeal'>('POST', '/meal/weekly', {
  weeklyMeals: meals.map(meal => ({
    date: meal.date,
    meals: {
      breakfast: meal.breakfast,
      dinner: meal.dinner,
      lunch: meal.lunch
    }
  }))
}).then(e => e.meals)
