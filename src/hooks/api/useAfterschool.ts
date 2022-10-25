import { useEffect, useState } from 'react';
import { getAfterschoolClassList } from '@/api';
import { AfterschoolClass } from '@/constants/types';

export const useAfterschool = async () => {
  const [afterSchool, setAfterSchool] = useState<
    AfterschoolClass[] | undefined | null
  >(undefined);

  useEffect(() => {
    getAfterschoolClassList()
      .then(setAfterSchool)
      .catch(() => setAfterSchool(() => null));
  }, []);
  // const result = await getAfterschoolClassList();
  // console.log(result);
  return afterSchool;
};
// afterschool, circle등은 빈배열로 올수있음 ( DB 아직 완성 안됨 )
