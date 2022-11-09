import React from 'react';
import { ClassNum, InfoItem, Name, UserInfoBox } from './style';
import { ReactComponent as LogOut } from '@/asset/icons/logOut.svg';
import { Class, Grade } from '@/constants/types';

export const UserInfo: React.FC<{
  name?: string;
  grade?: Grade;
  classNum?: Class;
}> = ({ name, grade, classNum }) => {
  return (
    <UserInfoBox>
      <InfoItem>
        <ClassNum>{grade && classNum && `${grade}학년 ${classNum}반`}</ClassNum>
        <Name>{name}</Name>
      </InfoItem>
      <LogOut />
    </UserInfoBox>
  );
};
