import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clearTokens, loginWithInfo } from '@/api';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  useEffect(() => clearTokens(), []);

  const login = useCallback(async () => {
    if (!username || !password) return;
    setUsername('');
    setPassword('');

    if (
      await loginWithInfo({
        username: username,
        password: password,
      })
    ) {
      window.location.replace('/');
    } else {
      toast.error('사용자 이름 또는 비밀번호를 확인해주세요.');
    }
  }, [
    username,
    password,
    history,
  ]);
  const enterToSubmit = useCallback(
    ({ key }: React.KeyboardEvent) => {
      if (key === 'Enter') login();
    },
    [login],
  );
  return (
    <div>
      <input
        defaultValue={username}
        onChange={({target: {value} }) => setUsername(value)}
        onKeyPress={enterToSubmit}
        placeholder="아이디"
        type="text"
      />
      <input
        defaultValue={password}
        onChange={({target: {value} }) => setPassword(value)}
        onKeyPress={enterToSubmit}
        placeholder="비밀번호"
        type="password"
      />
      <input type="submit" value="로그인" onClick={login} />
    </div>
  );
};

export default Login;