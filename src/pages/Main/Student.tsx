import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { styled } from '#/stitches.config';
import { Hexile } from '@haechi/flexile';
import MainPage from './route/MainPage';
import AfterSchool from './route/AfterSchool';
import Club from './route/Club';
import Laundry from './route/Laundry';
import Dets from './route/Dets';

const Main: React.FC = () => {
  return (
    <Wrapper>
      {/* <MainPage></MainPage> */}
      {/* <AfterSchool></AfterSchool> */}
      {/* <Club></Club> */}
      {/* <Laundry></Laundry> */}
      {/* <Dets></Dets> */}
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
