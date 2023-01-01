import { useEffect, useState } from 'react';
import { Place } from '@/constants/types';
import { getAllPlaceList } from '@/api';

export const useAllPlace = () => {
  const [place, setplace] = useState<Place[] | undefined | null>(undefined);

  useEffect(() => {
    getAllPlaceList()
      .then(setplace)
      .catch(() => setplace(null));
  }, []);

  return place;
};

export const usePrimaryPlaceList = () => {
  const [place, setplace] = useState<Place[] | undefined | null>(undefined);

  useEffect(() => {
    getAllPlaceList()
      .then(setplace)
      .catch(() => setplace(null));
  }, []);

  return place;
};
