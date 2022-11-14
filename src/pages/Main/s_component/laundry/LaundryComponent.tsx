import React, { useEffect, useState } from 'react';
import { Container, Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';
import { KorDay } from '@/constants/types';
import { ReactComponent as Calendar } from '@/asset/icons/calendar.svg';
import { ReactComponent as Alarm } from '@/asset/icons/alarm.svg';
import { ReactComponent as Groups } from '@/asset/icons/groups.svg';
import { useAfterschool } from '@/hooks/api';

const BtnCss = {
  fontSize: '1.4rem',
  borderRadius: '.8rem',
  fontWeight: 500,
};

export const LaundryComponent: React.FC<{
  padding: string;
  css?: CSS;
  active?: boolean;
  btnVal: string;
}> = ({ padding, css, active, btnVal }) => {
  const afterSchool = useAfterschool();
  // console.log(afterSchool);
  //방과후 return 값 없음

  //밑 변수들은 임시 변수 입니다.
  const location = '학봉관 2층';
  const time = '1타임';
  const detailTime = '오후 6시 35분';

  return (
    <Container padding={padding} css={css}>
      <Header>
        <Location>{location}</Location>
        <Time>{time}</Time>
      </Header>
      <Body>
        <InfoBox>
          <Alarm />
          {detailTime && <InfoText>{detailTime}</InfoText>}
        </InfoBox>
        <BtnBox>
          <Button css={BtnCss} value={btnVal} active={active} />
        </BtnBox>
      </Body>
    </Container>
  );
};

const Header = styled(Vexile);
const Body = styled(Hexile, {
  justifyContent: 'space-between',
});

const InfoBox = styled(Hexile, {
  alignItems: 'flex-end',
});

const BtnBox = styled('div', {
  marginTop: 'auto',
});

const InfoText = styled('div', {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '1.7rem',
  color: '$gray3',
  marginLeft: '.8rem',
});

const Location = styled(Hexile, {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '1.7rem',
  color: '$gray3',
  marginBottom: '.7rem',
});

const Time = styled(Hexile, {
  fontSize: '1.8rem',
  lineHeight: '2.1rem',
});
