import React, { useEffect, useState } from 'react';
import { Container, Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';
import { KorDay } from '@/constants/types';
import { ReactComponent as Calendar } from '@/asset/icons/calendar.svg';
import { ReactComponent as Alarm } from '@/asset/icons/alarm.svg';
import { ReactComponent as Groups } from '@/asset/icons/Groups.svg';

const BtnCss = {
  fontSize: '1.4rem',
  borderRadius: '.8rem',
  fontWeight: 500,
};

export const AfterschoolComponent: React.FC<{
  padding: string;
  css?: CSS;
  title: string;
  teacher: string;
  time: string;
  remaining: number;
  active?: boolean;
  btnVal: string;
}> = ({ padding, css, title, teacher, time, remaining, active, btnVal }) => {
  return (
    <Container padding={padding} css={css}>
      <Header>
        <Title>{title}</Title>
        <Teacher>{teacher} 선생님</Teacher>
      </Header>
      <Body>
        <InfoBox>
          <Infos week="월" SVG={Calendar} />
          <Infos time={time} SVG={Alarm} />
          <Infos remaining={remaining} SVG={Groups} />
        </InfoBox>
        <BtnBox>
          <Button css={BtnCss} value={btnVal} active={active} />
        </BtnBox>
      </Body>
    </Container>
  );
};

const Infos: React.FC<{
  week?: KorDay;
  time?: string;
  remaining?: number;
  SVG?: any;
}> = ({ week, time, remaining, SVG }) => (
  <Info>
    <SVG />
    {week && <InfoText>{week}요일</InfoText>}
    {time && <InfoText>{time}</InfoText>}
    {remaining && <InfoText>{remaining}/20</InfoText>}
  </Info>
);

const Header = styled(Vexile);
const Body = styled(Hexile, {
  justifyContent: 'space-between',
});
const InfoBox = styled(Vexile);
const BtnBox = styled('div', {
  marginTop: 'auto',
});

const Info = styled(Hexile, {
  alignItems: 'center',
  marginTop: '.8rem',
});

const InfoText = styled('div', {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '1.7rem',
  color: '$gray3',
  marginLeft: '.8rem',
});

const Title = styled(Hexile, {
  fontSize: '1.8rem',
  lineHeight: '2.1rem',
});

const Teacher = styled(Hexile, {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '1.7rem',
  color: '$gray3',
  marginTop: '.6rem',
});
