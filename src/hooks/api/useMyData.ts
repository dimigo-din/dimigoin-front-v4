import { useEffect, useState } from 'react';
import { refetchToken as refetchUserData } from '@/api';
import { getMyData } from '@/api/user';
import { Student, User } from '@/constants/types';

export const useMyData = ({ noLocalData }: { noLocalData?: boolean } = {}) => {
  // const [myData, setMyData] = useState<User | null>();
  const [myData, setMyData] = useState<Student | null>();
  useEffect(() => {
    (async () => {
      if (noLocalData) {
        await refetchUserData();
      }
      getMyData()
        .then((d) => {
          setMyData(d as Student);
        })
        .catch(() => setMyData(null));
    })();
  }, [setMyData, noLocalData]);
  return myData;
};
