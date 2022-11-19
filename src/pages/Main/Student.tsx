import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Container } from '@/components';
import { Hexile } from '@haechi/flexile';
import { useAfterschool } from '@/hooks/api';
import MainPage from './route/MainPage';
import AfterSchool from './route/AfterSchool';
import Club from './route/Club';
import Laundry from './route/Laundry';

const Main: React.FC = () => {
  return (
    <Wrapper>
      {/* <MainPage></MainPage> */}
      <AfterSchool></AfterSchool>
      {/* <Club></Club> */}
      {/* <Laundry></Laundry> */}
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
