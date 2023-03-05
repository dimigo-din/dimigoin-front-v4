import React, { useEffect, useState } from 'react';
import { Container, Button } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';
import { ReactComponent as Alarm } from '@/asset/icons/alarm.svg';
import { ReactComponent as Person } from '@/asset/icons/person.svg';
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
  applingPeo?: string;
}> = ({ padding, css, active, btnVal, applingPeo }) => {
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
          {applingPeo && <Infos detailTime={applingPeo} SVG={Person} />}
          <Infos detailTime={detailTime} SVG={Alarm} />
        </InfoBox>
        <BtnBox>
          <Button css={BtnCss} value={btnVal} active={active} />
        </BtnBox>
      </Body>
    </Container>
  );
};

const Infos: React.FC<{
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

const Header = styled(Vexile);
const Body = styled(Hexile, {
  justifyContent: 'space-between',
});

const InfoBox = styled(Vexile, {
  justifyContent: 'flex-end',
});

const Info = styled(Hexile, {
  alignItems: 'center',
  marginTop: '.8rem',
});

const BtnBox = styled('div', {
  marginTop: 'auto',
});

const InfoText = styled('div', {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '1.7rem',
  color: '$grade6',
  marginLeft: '.8rem',
});

const Location = styled(Hexile, {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '1.7rem',
  color: '$grade6',
  marginBottom: '.7rem',
});

const Time = styled(Hexile, {
  fontSize: '1.8rem',
  lineHeight: '2.1rem',
});
