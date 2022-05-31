import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearTokens, loginWithInfo } from '@/api';
import { Hexile } from '@haechi/flexile';
import {
  Container,
  Button,
  Text
} from '@/components';
import { MealType } from '@/types';
import { styled } from '#/stitches.config';
import moment, { Moment } from 'moment-timezone';
import { useMeal } from '@/hooks/api';
import { momentDayEndKorMapper } from '@/constants';
import { MomentEngDay } from '@/constants/types';
import { getTimePeriod, DAILY_TIME_PERIOD } from '@/utils/getTimePeriod';

import dimigoBack from '@/asset/dimigo-background.svg';
import { ReactComponent as NextBtn } from '@/asset/icons/nextBtn.svg';
import { ReactComponent as PrevBtn } from '@/asset/icons/prevBtn.svg';

const TextCss = {
  '&::before': {
    content: '',
    width: '4rem',
    border: '1px solid #E83C77',
    borderRadius: '.5rem',
    position: 'absolute',
    bottom: '-0.4rem',
    left: '50%',
    transform: 'translateX(-50%)'
  }
};
const BtnCss = {
  cursor: 'pointer',
  stroke: '$gray2',
  '&:hover': {
    stroke: '#222222'
  }
};

const NO_MEAL_DATA = '급식 정보가 없습니다.';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [time, setTime] = useState<MealType>('breakfast');
  const [date, setDate] = useState<Moment>(moment());
  const meal = useMeal(date.valueOf());
  const [addDate, setAddDate] = useState<number>(0);

  const goto = useNavigate();

  useEffect(() => clearTokens(), []);
  useEffect(() => {
    const period = getTimePeriod();

    if(period === DAILY_TIME_PERIOD.MORNING) setTime('breakfast');
    if(period === DAILY_TIME_PERIOD.BEFORE_NOON) setTime('lunch');
    if(period === DAILY_TIME_PERIOD.EVENING) setTime('dinner');
    if(period === DAILY_TIME_PERIOD.NEXT_MORNING) {
      setAddDate(1);
      setTime('breakfast');
    }
  }, []);
  
  useEffect(() => {
    setDate(moment().add(addDate, 'd'));
  }, [addDate]);

  const login = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return toast.warn('필드를 확인해주세요.');
  
    if (
      await loginWithInfo({
        username,
        password,
      })
    ) {
      goto('/');
    } else toast.error('사용자 이름 또는 비밀번호를 확인해주세요.');
    
  }, [
    username,
    password,
    history,
  ]);
  
  return (
    <Wrapper x='center'  y='center'>
      <BottomImage src={dimigoBack} />
      <Container
      padding='12rem 10rem'
      css={{
        width: '67rem',
        height: 'calc(100% - 10rem)',
        borderRadius: '2rem',
      }}
      title='로그인'
      column={true}>
        <LoginForm onSubmit={login}>
          <Placeholder>아이디</Placeholder>
          <Input
          value={username}
          onChange={({target: {value}}) => setUsername(value)}
          type='text'
          placeholder='아이디를 입력해주세요'
          margin={5}
          />
          <Placeholder>비밀번호</Placeholder>
          <Input
          value={password}
          onChange={({target: {value}}) => setPassword(value)}
          type='password'
          placeholder='비밀번호를 입력해주세요'
          margin={6}
          />
          <Button value='로그인' large active />
        </LoginForm>
        <MealContainer>
          <MealNavigationBox x='space'>
            <MealTimeBox x='space'>
              <Text
              active={time === 'breakfast'}
              css={time === 'breakfast' ? TextCss : undefined}
              button
              onClick={() => setTime('breakfast')}>아침</Text>
              <Text
              active={time === 'lunch'}
              css={time === 'lunch' ? TextCss : undefined}
              button
              onClick={() => setTime('lunch')}>점심</Text>
              <Text
              active={time === 'dinner'}
              css={time === 'dinner' ? TextCss : undefined}
              button
              onClick={() => setTime('dinner')}>저녁</Text>
            </MealTimeBox>
            <MealDateBox x='space'>
              <Prev onClick={() => setAddDate(prev => prev - 1)} />
              <MealDate>{date.format('M월 D일')} {momentDayEndKorMapper[(date.format('ddd')) as MomentEngDay]}</MealDate>
              <Next onClick={() => setAddDate(prev => prev + 1)} />
            </MealDateBox>
          </MealNavigationBox>
          <Meal>
            {time === 'breakfast' && (meal?.breakfast.join(' | ') || NO_MEAL_DATA)}
            {time === 'lunch' && (meal?.lunch.join(' | ') || NO_MEAL_DATA)}
            {time === 'dinner' && (meal?.dinner.join(' | ') || NO_MEAL_DATA)}
          </Meal>
        </MealContainer>
      </Container>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled(Hexile, {
  width: '100vw',
  height: '100vh',
  background: '#F8F8F9',
  position: 'relative',
  color: '$gray6',
});

const BottomImage = styled('img', {
  width: '100%',
  position: 'absolute',
  bottom: 0,
});

const LoginForm = styled('form', {
  width: '100%',
  margin: '5rem 0',
});
const Input = styled('input', {
  width: '100%',
  padding: '.5rem 0',
  fontSize: '1.6rem',
  background: 'none',
  border: 'none',
  outline: 'none',
  borderBottom: '2px solid #E8E8E8',
  transition: '.2s ease',
  marginBottom: '5rem',
  fontWeight: 500,
  '&:focus': {
    borderBottom: '2.5px solid $accent',
  },
  '&::placeholder': {
    color: '#c5c5d0',
    fontWeight: 500
  },
  variants: {
    margin: {
      '5': {
        marginBottom: '5rem',
      },
      '6': {
        marginBottom: '6rem'
      },
    }
  }
});

const Placeholder = styled('p', {
  color: '#5E5E67',
  fontSize: '1.2rem',
  lineHeight: '1.5rem',
  fontWeight: 500,
  transition: '.2s ease',
  opacity: 0.5,
});

const MealContainer = styled('div', {
  width: '100%',
  margin: '1.4rem 0'
});
const MealNavigationBox = styled(Hexile, {
  width: '100%',
  marginBottom: '2.6rem'
});
const MealTimeBox = styled(Hexile, {
  width: '35%',
});
const MealDateBox = styled(Hexile, {
  width: '35%',
  userSelect: 'none',
});

const Next = styled(NextBtn, BtnCss);
const Prev = styled(PrevBtn, BtnCss);

const MealDate = styled('span', {
  color: '#5E5E67',
  fontWeight: 600,
  fontSize: '1.6rem',
  lineHeight: 1,
});

const Meal = styled('div', {
  color: '#5E5E67',
  fontWeight: 500,
  fontSize: '1.4rem',
});