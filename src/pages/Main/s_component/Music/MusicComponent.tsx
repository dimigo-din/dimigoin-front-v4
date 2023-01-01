import React, { useEffect, useState } from 'react';
import { Container, Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';

export const LikeTicket: React.FC<{
  count: number;
}> = ({ count }) => {
  return (
    <LikeCountContainer>
      <LikeCount>{count}</LikeCount>
      <Unit>개</Unit>
    </LikeCountContainer>
  );
};

export const MusicInfo: React.FC<{
  thumbnail: any;
  musicTitle: string;
  singer: string;
}> = ({ thumbnail, musicTitle, singer }) => {
  return (
    <InfoContainer>
      <Thumbnail />
    </InfoContainer>
  );
};

const LikeCountContainer = styled('div', {
  margin: '2.4rem 0',
});

const Unit = styled('div', {
  display: 'inline-block',
  color: '$gray3',
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
});

const LikeCount = styled('div', {
  display: 'inline-block',
  color: '$accent',
  fontSize: '4rem',
  fontWeight: 700,
  lineHeight: '4.8rem',
});

const InfoContainer = styled(Hexile, {
  width: '100%',
  height: '4rem',
});

const Thumbnail = styled(Hexile, {
  width: '4rem',
  height: '4rem',
  borderRadius: '.6rem',
  backgroundColor: 'Gray',
});
