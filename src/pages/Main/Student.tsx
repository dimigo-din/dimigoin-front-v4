import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useMyData } from '@/hooks/api/useMyData';
import { styled } from '#/stitches.config';
import { Hexile } from '@haechi/flexile';
import { UserType } from '@/constants/types';
import { studentComponents } from './Navigator/StudentNavigation';

const Main: React.FC = () => {
  const [path, setPath] = useState<string>('/');
  const { pathname } = useLocation();
  const myData = useMyData();

  useEffect(() => {
    const p = `${pathname}/`;
    setPath(p.substring(0, p.indexOf('/', 1)));
  }, [pathname]);

  return (
    <Wrapper>
      {myData?.userType === UserType.S &&
        studentComponents[path] &&
        studentComponents[path].map(({ Component }) => {
          return <Component key={`${path}`} />;
        })}
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled(Hexile, {
  width: '100%',
  height: '100%',
  padding: '2rem',
  backgroundColor: '$background',
  borderTopLeftRadius: '1rem',
  position: 'relative',
});
