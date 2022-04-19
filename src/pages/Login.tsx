import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearTokens, loginWithInfo } from '@/api';
import {
  Button
} from '@/components';

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
      console.log('test');
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
    <form onSubmit={login}>
      <input
        defaultValue={username}
        onChange={({target: {value} }) => setUsername(value)}
        placeholder="아이디"
        type="text"
      />
      <input
        defaultValue={password}
        onChange={({target: {value} }) => setPassword(value)}
        placeholder="비밀번호"
        type="password"
      />
      <Button active value="로그인" type="submit" />
    </form>
  );
};

export default Login;