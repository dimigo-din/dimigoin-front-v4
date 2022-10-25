import { Grade, Class, TimeTable } from '@/constants/types';
import { api } from './api';

export const getTimetable = (
  grade: Grade | undefined | null,
  classNumber: Class | undefined | null,
): Promise<TimeTable[]> =>
  api<'timetable'>(
    'GET',
    `/timetable/weekly/grade/${grade}/class/${classNumber}`,
  ).then((e) => e.timetable);
