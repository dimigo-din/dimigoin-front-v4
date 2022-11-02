import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Container } from '@/components';
import { Hexile } from '@haechi/flexile';
import { useAfterschool } from '@/hooks/api';
import MainPage from './temp_S/MainPage';
import AfterSchool from './temp_S/AfterSchool';

const Main: React.FC = () => {
  return (
    <Wrapper>
      {/* <MainPage></MainPage> */}
      <AfterSchool></AfterSchool>
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
