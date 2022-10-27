import React, { useEffect, useState } from 'react';
import { Container, Button, Text } from '@/components';
import { Hexile } from '@haechi/flexile';
import { styled } from '#/stitches.config';
import { ApplyType, MealType } from '@/types';
import moment, { Moment } from 'moment-timezone';
import { useMeal, useTimetable, useMyData } from '@/hooks/api';
import { momentDayEndKorMapper } from '@/constants';
import { MomentEngDay } from '@/constants/types';
import { getTimePeriod, DAILY_TIME_PERIOD } from '@/utils/getTimePeriod';
import { CSS } from '@stitches/react';

import { ReactComponent as NextBtn } from '@/asset/icons/nextBtn.svg';
import { ReactComponent as PrevBtn } from '@/asset/icons/prevBtn.svg';
import { ReactComponent as Clock } from '@/asset/icons/clock.svg';

const NO_MEAL_DATA = '급식 정보가 없습니다.';

const BtnCss = {
  cursor: 'pointer',
  stroke: '$gray2',
  '&:hover': {
    stroke: '#222222',
  },
};

export const MealComponent: React.FC<{
  padding: string;
  css: CSS;
  title: string;
  textCss?: CSS;
}> = ({ padding, css, title, textCss }) => {
  const [time, setTime] = useState<MealType>('breakfast');
  const [date, setDate] = useState<Moment>(moment());
  const meal = useMeal(date.valueOf());
  const [addDate, setAddDate] = useState<number>(0);

  useEffect(() => {
    const period = getTimePeriod();

    if (period === DAILY_TIME_PERIOD.MORNING) setTime('breakfast');
    if (period === DAILY_TIME_PERIOD.BEFORE_NOON) setTime('lunch');
    if (period === DAILY_TIME_PERIOD.EVENING) setTime('dinner');
    if (period === DAILY_TIME_PERIOD.NEXT_MORNING) {
      setAddDate(1);
      setTime('breakfast');
    }
  }, []);

  useEffect(() => {
    setDate(moment().add(addDate, 'd'));
  }, [addDate]);

  return (
    <Container
      padding={padding}
      css={css}
      title={title}
      innerTitle={
        <MealDateBox x="space">
          <Prev onClick={() => setAddDate((prev) => prev - 1)} />
          <MealDate>
            {date.format('M월 D일')}{' '}
            {momentDayEndKorMapper[date.format('ddd') as MomentEngDay]}
          </MealDate>
          <Next onClick={() => setAddDate((prev) => prev + 1)} />
        </MealDateBox>
      }
    >
      <MealContainer>
        <MealNavigationBox x="space">
          <MealTimeBox x="space">
            <Text
              active={time === 'breakfast'}
              css={time === 'breakfast' ? textCss : undefined}
              button
              onClick={() => setTime('breakfast')}
            >
              아침
            </Text>
            <Text
              active={time === 'lunch'}
              css={time === 'lunch' ? textCss : undefined}
              button
              onClick={() => setTime('lunch')}
              // onClick={() => useAllNotice()}
              // onClick={() => useTimetable(1, 5)}
            >
              점심
            </Text>
            <Text
              active={time === 'dinner'}
              css={time === 'dinner' ? textCss : undefined}
              button
              onClick={() => setTime('dinner')}
            >
              저녁
            </Text>
          </MealTimeBox>
        </MealNavigationBox>
        <Meal>
          {time === 'breakfast' &&
            (meal?.breakfast.join(' | ') || NO_MEAL_DATA)}
          {time === 'lunch' && (meal?.lunch.join(' | ') || NO_MEAL_DATA)}
          {time === 'dinner' && (meal?.dinner.join(' | ') || NO_MEAL_DATA)}
        </Meal>
      </MealContainer>
      <MealTimeDetail>
        <Clock fill="#000" />
        <TimeDetailBox>
          우리 반의 저녁 급식 시간은 <TimeDetail>{`NO_TIME_DATA`}</TimeDetail>{' '}
          이에요
        </TimeDetailBox>
      </MealTimeDetail>
    </Container>
  );
};

const MealContainer = styled('div', {
  width: '100%',
  margin: '1.4rem 0',
});
const MealNavigationBox = styled(Hexile, {
  width: '100%',
  marginBottom: '2.6rem',
});
const MealTimeBox = styled(Hexile, {
  width: '16.2rem',
});
const MealDateBox = styled(Hexile, {
  width: '17.2rem',
  alignItems: 'center',
  userSelect: 'none',
});

const Next = styled(NextBtn, BtnCss);
const Prev = styled(PrevBtn, BtnCss);

const MealDate = styled('span', {
  color: '$black2',
  fontWeight: 600,
  fontSize: '1.6rem',
  lineHeight: 1,
});

const Meal = styled('div', {
  color: '$black2',
  fontWeight: 500,
  fontSize: '1.6rem',
  overflow: 'auto',
  height: '5.2rem',
  lineHeight: '25px',
});

const MealTimeDetail = styled(Hexile, {
  width: '100%',
  gap: '1.2rem',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
});

const TimeDetailBox = styled('div', {
  fontSize: '1.8rem',
  lineHeight: '2.1rem',
});
const TimeDetail = styled('span', {
  color: '$accent',
});
