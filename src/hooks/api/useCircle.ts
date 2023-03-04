import { useEffect, useState } from 'react';
import { getAllCircle, getCircleById, getMyCircle } from '@/api';
import { Circle } from '@/constants/types';

export const useAllCircle = () => {
  const [circle, setCircle] = useState<Circle[] | undefined | null>(undefined);

  useEffect(() => {
    getAllCircle()
      .then(setCircle)
      .catch(() => setCircle(null));
  }, []);

  return circle;
};
