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

const MusicInfo: React.FC<{
  detailTime?: string;
  applingPeo?: string;
  SVG?: any;
}> = ({ detailTime, applingPeo, SVG }) => (
  <Info>
    <SVG />
    {detailTime && <InfoText>{detailTime}</InfoText>}
    {applingPeo && <InfoText>{applingPeo}</InfoText>}
  </Info>
);

const Info = styled(Hexile, {
  alignItems: 'center',
  marginTop: '.8rem',
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

const InfoText = styled('div', {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '1.7rem',
  color: '$gray3',
  marginLeft: '.8rem',
});
