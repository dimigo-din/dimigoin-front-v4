import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassNum, InfoItem, LogoutBtn, Name, UserInfoBox } from './style';
import { ReactComponent as LogOut } from '@/asset/icons/logOut.svg';
import { clearTokens } from '@/api';
import { Class, Grade } from '@/constants/types';

export const UserInfo: React.FC<{
  name?: string;
  grade?: Grade;
  classNum?: Class;
}> = ({ name, grade, classNum }) => {
  const goto = useNavigate();

  const logout = () => {
    clearTokens();
    goto('/login');
  };

  return (
    <UserInfoBox>
      <InfoItem>
        <ClassNum>{grade && classNum && `${grade}학년 ${classNum}반`}</ClassNum>
        <Name>{name}</Name>
      </InfoItem>
      <LogoutBtn onClick={logout}>
        <LogOut />
      </LogoutBtn>
    </UserInfoBox>
  );
};
