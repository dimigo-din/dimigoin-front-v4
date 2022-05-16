import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearTokens, loginWithInfo } from '@/api';
import {
  Container,
  Button
} from '@/components';
import { styled } from '#/stitches.config';

import dimigoBack from '@/asset/dimigo-background.svg';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const goto = useNavigate();
  useEffect(() => clearTokens(), []);

  const login = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return toast.warn('필드를 확인해주세요.');
  
    if (
      await loginWithInfo({
        username: username,
        password: password,
      })
    ) {
      goto('/');
    } else {
      toast.error('사용자 이름 또는 비밀번호를 확인해주세요.');
    }
    
  }, [
    username,
    password,
    history,
  ]);
  
  return (
    <Wrapper>
      <BottomImage src={dimigoBack} />
      <Container
      padding='10rem'
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
          />
          <Placeholder>비밀번호</Placeholder>
          <Input
          value={password}
          onChange={({target: {value}}) => setPassword(value)}
          type='password'
          />
          <Button value='로그인' large active />
        </LoginForm>
      </Container>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled('div', {
  width: '100vw',
  height: '100vh',
  background: '#F8F8F9',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  padding: '.5rem',
  background: 'none',
  border: 'none',
  outline: 'none',
  borderBottom: '2px solid #E8E8E8',
  transition: '.2s ease',
  marginBottom: '5rem',
  '&:focus': {
    borderBottom: '2.5px solid $accent',
  },
});

const Placeholder = styled('p', {
  color: '#5E5E67',
  fontSize: '1.2rem',
  lineHeight: '1.5rem',
  fontWeight: 500,
  transition: '.2s ease',
  opacity: 0.5,
});