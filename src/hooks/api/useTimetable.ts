import { useEffect, useState } from 'react';
import { getTimetable } from '@/api';
import { Grade, Class, TimeTable } from '@/constants/types';

export const useTimetable = (
  grade: Grade | undefined | null,
  classNumber: Class | undefined | null,
) => {
  const [table, setTable] = useState<TimeTable[] | undefined | null>(undefined);

  useEffect(() => {
    getTimetable(grade, classNumber)
      .then(setTable)
      .catch(() => setTable(() => null));
  }, [grade, classNumber]);
  return table;
};
