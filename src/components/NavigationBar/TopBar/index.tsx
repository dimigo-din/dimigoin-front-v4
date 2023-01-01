import React, { useEffect, useState } from 'react';
import { Container } from '@/components/Container';
import { UserType } from '@/constants/types';
import { useMyData } from '@/hooks/api/useMyData';
import { studentNavigations } from './navigations';
import { useLocation } from 'react-router-dom';
import { TopBarItem } from './NavigationItem';
import { TopBarMainItem } from './MainItem';
import { TopBarCustom } from './style';

export const TopBar: React.FC = () => {
  const [path, setPath] = useState<string>('/');
  const { pathname } = useLocation();
  const myData = useMyData();

  useEffect(() => {
    const p = `${pathname}/`;
    setPath(p.substring(0, p.indexOf('/', 1)));
  }, [pathname]);

  return (
    <TopBarCustom fillx>
      {myData?.userType === UserType.S &&
        studentNavigations[path] &&
        studentNavigations[path].map(({ title, SVG, stroke, black, route }) => {
          return path === '/' ? (
            <TopBarMainItem
              title={`나의 현재 위치는 ? 이에요.`}
              innerTitle={title}
              SVG={SVG}
              key={`${path}${route}`}
            ></TopBarMainItem>
          ) : (
            <TopBarItem
              title={title}
              SVG={SVG}
              stroke={stroke}
              black={black}
              route={`${path}${route}`}
              selected={pathname === `${path}${route}`}
              key={`${path}${route}`}
            />
          );
        })}
    </TopBarCustom>
  );
};
