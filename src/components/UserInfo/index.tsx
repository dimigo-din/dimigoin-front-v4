import React from 'react';
import { ClassNum, InfoItem, Name, UserInfoBox } from './style';
import { ReactComponent as LogOut } from '@/asset/icons/logOut.svg';
import { Class, Grade } from '@/constants/types';

export const UserInfo: React.FC<{
  name?: string;
  grade?: Grade;
  classNum?: Class;
  number?: number;
}> = ({ name, grade, classNum, number }) => {
  return (
    <UserInfoBox>
      <InfoItem>
        <ClassNum>
          {grade &&
            classNum &&
            `${grade}${classNum}${number?.toString(10).padStart(2, '0')}`}
        </ClassNum>
        <Name>{name}</Name>
      </InfoItem>
      <LogOut />
    </UserInfoBox>
  );
};
