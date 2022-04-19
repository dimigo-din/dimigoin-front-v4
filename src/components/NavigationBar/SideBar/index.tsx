import { useMyData } from "@/hooks/api/useMyData";
import React from "react";
import { useLocation } from 'react-router-dom';
import { default as LogoIcon } from '@/asset/dimigoin.svg';
import {
  Logo,
  SideBarCustom,
  ItemContainer,
  Division
} from "./style";
import { studentNavitions } from "./navigations";
import Item from './NavigationItem';
import { UserType } from "@/constants/types";

export const SideBar: React.FC = () => {
  const { pathname } = useLocation();
  const myData = useMyData();

  return (
    <SideBarCustom>
      <Logo to='/'>
        <img src={LogoIcon} />
      </Logo>
      <ItemContainer>
        {myData?.userType === UserType.S && (
          studentNavitions.map(({title, route, Accent, Disable, division = false}) => {
            return (
              division ? (
                <Division key={title} />
              ) : (
                <Item
                  title={title}
                  route={route}
                  Accent={Accent}
                  Disable={Disable}
                  selected={pathname.startsWith(route)}
                  key={`${title}${route}`}
                />
              )
            );
          })
        )}
      </ItemContainer>
    </SideBarCustom>
  );
};