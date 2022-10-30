import React, { useEffect, useState } from 'react';
import { Container, Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';

export const AfterschoolComponent: React.FC<{
  padding: string;
  css?: CSS;
  title: string;
  teacher: string;
  time: string;
  remaining: number;
}> = ({ padding, css, title, teacher, time, remaining }) => {
  return (
    <Container padding={padding} css={css}>
      <Title>{title}</Title>
      <Teacher>{teacher}</Teacher>
      <Button value="신청"></Button>
    </Container>
  );
};

const NoticeContainer = styled('div', {
  width: '100%',
  marginTop: '2rem',
  lineHeight: '2.4rem',
  color: '$black2',
  fontWeight: 400,
});

const Title = styled('div');
const Teacher = styled('div');
