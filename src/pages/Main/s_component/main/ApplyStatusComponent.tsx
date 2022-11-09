import React, { useState } from 'react';
import { Container, Button, Text } from '@/components';
import { CSS } from '@stitches/react';
import { Hexile, Vexile } from '@haechi/flexile';
import { styled } from '#/stitches.config';
import { ApplyType } from '@/types';

const cancelBtn = {
  fontSize: '1.6rem',
  fontWeight: '500',
};

export const ApplyStatusComponent: React.FC<{
  padding: string;
  css: CSS;
  title: string;
  textCss?: CSS;
}> = ({ padding, css, title, textCss }) => {
  const [apply, setApply] = useState<ApplyType>('laundry');

  return (
    <Container padding={padding} css={css} title={title}>
      <ApplyContainer>
        <ApplyNavigationBox x="space">
          <ApplyBox x="space">
            <Text
              active={apply === 'stayInSchool'}
              css={apply === 'stayInSchool' ? textCss : undefined}
              button
              onClick={() => setApply('stayInSchool')}
            >
              잔류
            </Text>
            <Text
              active={apply === 'laundry'}
              css={apply === 'laundry' ? textCss : undefined}
              button
              onClick={() => setApply('laundry')}
            >
              세탁
            </Text>
            <Text
              active={apply === 'fridayGoHome'}
              css={apply === 'fridayGoHome' ? textCss : undefined}
              button
              onClick={() => setApply('fridayGoHome')}
            >
              금요귀가
            </Text>
          </ApplyBox>
        </ApplyNavigationBox>
        <TimeCheckBox>
          <TimeDetail>
            <WhatTime>n타임</WhatTime>
            <LocationNTime>2층 왼쪽 세탁기 | 12:00</LocationNTime>
          </TimeDetail>
          <Button css={cancelBtn} value="취소"></Button>
        </TimeCheckBox>
      </ApplyContainer>
    </Container>
  );
};

const ApplyContainer = styled('div', {
  width: '100%',
  marginTop: '1.4rem',
});
const ApplyNavigationBox = styled(Hexile, {
  position: 'relative',
  width: '18.3rem',
  marginBottom: '2.6rem',
});
const ApplyBox = styled(Hexile, {
  width: '100%',
  alignItems: 'center',
  userSelect: 'none',
});

const TimeCheckBox = styled(Hexile, {
  width: '100%',
  height: '9rem',
  backgroundColor: '$subWhite1',
  borderRadius: '1.5rem',
  padding: '1.5rem 2rem',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const TimeDetail = styled(Vexile);

const WhatTime = styled(Hexile, {
  fontSize: '2rem',
  fontWeight: 700,
  lineHeight: '2.4rem',
  marginBottom: '.4rem',
});

const LocationNTime = styled(Hexile, {
  fontSize: '1.6rem',
  fontWeight: 500,
  lineHeight: '1.9rem',
});
