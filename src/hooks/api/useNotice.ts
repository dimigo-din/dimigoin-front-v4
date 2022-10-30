import { useEffect, useState } from 'react';
import { APIDocNotice, getAllNotice } from '@/api';
import { Notice } from '@/constants/types';

export const useNotice = () => {
  const [notice, setNotice] = useState<APIDocNotice[] | undefined | null>(
    undefined,
  );
  useEffect(() => {
    getAllNotice()
      .then(setNotice)
      .catch(() => setNotice(null));
  }, []);
  return notice;
};
