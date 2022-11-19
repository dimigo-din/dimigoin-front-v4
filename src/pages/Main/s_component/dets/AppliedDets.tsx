import React, { useEffect, useState } from 'react';
import { Container, Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';
import { ReactComponent as PinDrop } from '@/asset/icons/pinDrop_s.svg';
import { ReactComponent as Alarm } from '@/asset/icons/alarm.svg';
import { ReactComponent as Groups } from '@/asset/icons/groups.svg';
import { Infos } from './Infos';

const BtnCss = {
  fontSize: '1.4rem',
  borderRadius: '.8rem',
  fontWeight: 500,
};

export const AppliedDets: React.FC<{
  padding: string;
  css?: CSS;
  active?: boolean;
  btnVal: string;
}> = ({ padding, css, active, btnVal }) => {
  //방과후 return 값 없음

  //밑 변수들은 임시 변수 입니다.
  const title = '상업경제 개념잡기';
  const teacher = '1505 김도현';
  const week = '월';
  const time = '방과후 1,2타임';
  const remaining = 11;

  return (
    <Container padding={padding} css={css}>
      <Header>
        <Title>{title}</Title>
        <Teacher>{teacher}</Teacher>
      </Header>
      <Body>
        <InfoBox>
          <Infos week={week} SVG={PinDrop} />
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

const Banner = styled('div', {
  width: '100%',
  height: '17rem',
  backgroundColor: '#000',
});
const Header = styled(Vexile);
const Body = styled(Hexile, {
  justifyContent: 'space-between',
});
const InfoBox = styled(Vexile);
const BtnBox = styled('div', {
  marginTop: 'auto',
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
