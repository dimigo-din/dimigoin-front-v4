import React from 'react';
import { Navigate } from "react-router-dom";
import {
  getAccessToken,
  refetchToken
} from '@/api';
import { LoadableComponent } from '@loadable/component';
import { User, UserType } from '@/constants/types';
import { getMyData } from '@/api/user';
import { SideBar } from '@/components/NavigationBar';
import { styled } from '#/stitches.config';

const Container = styled('div', {
  display: 'flex',
  width: '100vw',
  height: '100vh',
});
const Main = styled('div', {
  width: 'calc(100% - 20rem)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem'
});

const Box: React.FC<{
  Children: LoadableComponent<{}>
}> = ({ Children }) => {
  return (
    <Container>
      <SideBar />
      <Main>
        <Children />
      </Main>
    </Container>
  );
};

export const needAuth = (Component: LoadableComponent<{}>) => {
  try {
    const accessToken = getAccessToken();
    if(!accessToken) throw new Error('Cannot find access token');

    if(!refetchToken()) throw new Error('Cannot login with refresh token');
    return Component;
  } catch {
    return <Navigate to='/login' />;
  }
};

export const BranchRouting = ({screens: {
  Teacher,
  Student,
  Dormitory
}}: {screens: {
  Student: LoadableComponent<{}>;
  Teacher: LoadableComponent<{}>;
  Dormitory: LoadableComponent<{}>;
}}): JSX.Element => {
  const [myData, setMyData] = React.useState<User | null>();

  React.useEffect(() => {
    getMyData()
      .then(setMyData)
      .catch(() => setMyData(null));
  }, []);


  if (myData === null) return <Navigate to='/login' />;
  if (myData?.userType === UserType.S) return <Box Children={Student} />;
  if (myData?.userType === UserType.T) return <Box Children={Teacher} />;
  if (myData?.userType === UserType.D) return <Box Children={Dormitory} />;
  return <></>;
};