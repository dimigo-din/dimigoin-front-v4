import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import {
  ApplyStatusComponent,
  TimeTableComponent,
  MealComponent,
  NoticeComponent,
  MyLocationComponent,
} from '@/pages/Main/s_component/main';

const containerCss = {
  display: 'flex',
  flexDirection: 'column',
};
const TextCss = {
  fontWeight: 700,
  lineHeight: '1.9rem',
  '&::before': {
    content: '',
    width: '.4rem',
    height: '.4rem',
    backgroundColor: '$accent',
    borderRadius: '50%',
    position: 'absolute',
    bottom: '-0.9rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};

const containerPadding = '4rem';

const MainPage: React.FC = () => {
  return (
    <Wrapper>
      <LeftBox>
        <NoticeComponent
          padding={containerPadding}
          css={containerCss}
          textCss={TextCss}
          title="공지사항"
        />
        <MyLocationComponent
          padding={containerPadding}
          css={containerCss}
          textCss={TextCss}
          title="내 위치"
        />
        <MealComponent
          padding={containerPadding}
          css={containerCss}
          textCss={TextCss}
          title="급식"
        />
      </LeftBox>
      <RightBox>
        <ApplyStatusComponent
          padding={containerPadding}
          css={containerCss}
          textCss={TextCss}
          title="신청현황"
        />
        <TimeTableComponent
          padding={containerPadding}
          css={containerCss}
          title="시간표"
        />
      </RightBox>
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  position: 'relative',
  color: '$gray6',
  display: 'grid',
  gridGap: '2rem',
  gridTemplateColumns: '5fr 4fr',
});

const LeftBox = styled('div', {
  display: 'grid',
  height: '100%',
  gridGap: '2rem',
  // gridTemplateRows: '4fr 4fr 2fr',
});

const RightBox = styled('div', {
  display: 'grid',
  height: '100%',
  minWidth: '50rem',
  gridGap: '2rem',
  // gridTemplateRows: '5fr 5fr',
});
