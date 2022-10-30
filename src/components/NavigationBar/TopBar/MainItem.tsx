import { UserInfo } from '@/components/UserInfo';
import { Hexile } from '@haechi/flexile';
import { styled } from '@stitches/react';
import React from 'react';
import { MainItemBox } from './style';

export const TopBarMainItem: React.FC<{
  title: string;
  innerTitle?: string;
  SVG?: any;
}> = ({ title, innerTitle, SVG }) => (
  <MainItemBox>
    <UserLocation>
      {SVG && <SVG fill={'#000'} />}
      <Title>
        {title.split('?')[0]} <InnerTitle>{innerTitle}</InnerTitle>{' '}
        {title.split('?')[1]}
      </Title>
    </UserLocation>
  </MainItemBox>
);

const UserLocation = styled(Hexile, {
  color: '$subBlack',
  alignItems: 'center',
  gap: '1rem',
});

const Title = styled('div', {
  fontSize: '1.8rem',
});

const InnerTitle = styled('span', {
  color: '$accent',
});
