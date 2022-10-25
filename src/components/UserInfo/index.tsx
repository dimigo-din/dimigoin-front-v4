import React from 'react';
import { ClassNum, InfoItem, Name, UserInfoBox } from './style';
import { ReactComponent as LogOut } from '@/asset/icons/logOut.svg';
import { Class, Grade } from '@/constants/types';

export const UserInfo: React.FC<{
  name: string | undefined | null;
  grade: Grade | undefined | null;
  classNum: Class | undefined | null;
  number: number | undefined | null;
}> = ({ name, grade, classNum, number }) => {
  return (
    <UserInfoBox>
      <InfoItem>
        <ClassNum>
          {grade && classNum && number !== undefined
            ? `${grade}${classNum}${number?.toString(10).padStart(2, '0')}`
            : 'undefined'}
        </ClassNum>
        <Name>{name}</Name>
      </InfoItem>
      <LogOut />
    </UserInfoBox>
  );
};
