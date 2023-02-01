import React, { useEffect, useState } from 'react';
import { Container, Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';
import { ReactComponent as Heart } from '@/asset/icons/heart.svg';

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
  SVG?: any;
  musicTitle: string;
  singer: string;
  like: boolean;
  idx: number;
}> = ({ SVG, musicTitle, singer, like, idx }) => {
  return (
    <InfoContainer>
      <Thumbnail />
      <Num>{idx}</Num>
      <Title>{musicTitle}</Title>
      <Singer>{singer}</Singer>
      <Like>
        <Heart fill={like ? '#E83C77' : '#8D90A0'} />
      </Like>
    </InfoContainer>
  );
};

export const LikedMusic: React.FC<{
  SVG?: any;
  musicTitle: string;
  singer: string;
}> = ({ SVG, musicTitle, singer }) => {
  return (
    <LikedContainer>
      <Thumbnail />
    </LikedContainer>
  );
};

const LikedContainer = styled(Hexile, {
  width: '100%',
  height: '5.4rem',
});

const Num = styled('div', {
  textAlign: 'center',
  fontWeight: 400,
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
});

const Title = styled('div', {
  fontWeight: 500,
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
});

const Singer = styled('div', {
  fontWeight: 500,
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
  color: '$gray3',
});

const Like = styled(Hexile, {
  cursor: 'pointer',
});

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

const InfoContainer = styled('div', {
  position: 'relative',
  display: 'grid',
  width: '100%',
  height: '4rem',
  alignItems: 'center',
  gridTemplateColumns: '4rem 5rem 1fr 1fr 4rem',
});

const Thumbnail = styled(Hexile, {
  width: '4rem',
  height: '4rem',
  borderRadius: '.6rem',
  backgroundColor: 'Gray',
});
