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
}> = ({ SVG, musicTitle, singer, like }) => {
  return (
    <InfoContainer>
      <Thumbnail />
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
  like: boolean;
}> = ({ SVG, musicTitle, singer, like }) => {
  return (
    <LikedContainer>
      <Thumbnail2 />
      <LikedInfo>
        <LikedTitle>{musicTitle}</LikedTitle>
        <LikedSinger>{singer}</LikedSinger>
      </LikedInfo>
      <Like>
        <Heart fill={like ? '#E83C77' : '#8D90A0'} />
      </Like>
    </LikedContainer>
  );
};

const LikedContainer = styled('div', {
  display: 'grid',
  width: '100%',
  height: '5.4rem',
  alignItems: 'center',
  gridTemplateColumns: '5.4rem 1fr 2.4rem',
});

const Title = styled('div', {
  fontWeight: 500,
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
  marginLeft: '2.4rem',
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
  gridTemplateColumns: '4rem 1.1fr 0.9fr 4rem',
});

const LikedInfo = styled(Vexile, {
  marginLeft: '1.6rem',
});

const LikedTitle = styled('div', {
  fontWeight: 500,
  fontSize: '1.8rem',
  lineHeight: '2.1rem',
});

const LikedSinger = styled('div', {
  fontWeight: 500,
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
  marginTop: '.7rem',
  color: '$gray3',
});

const Thumbnail = styled(Hexile, {
  width: '4rem',
  height: '4rem',
  borderRadius: '.6rem',
  backgroundColor: 'Gray',
});

const Thumbnail2 = styled(Hexile, {
  width: '5.4rem',
  height: '5.4rem',
  borderRadius: '.6rem',
  backgroundColor: 'Gray',
});
