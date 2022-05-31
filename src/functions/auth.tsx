import React from 'react';
import { Navigate } from 'react-router-dom';
import { Hexile, Vexile } from '@haechi/flexile';
import {
  getAccessToken,
  refetchToken
} from '@/api';
import { LoadableComponent } from '@loadable/component';
import { User, UserType } from '@/constants/types';
import { getMyData } from '@/api/user';
import { SideBar, TopBar } from '@/components/NavigationBar';
import { styled } from '#/stitches.config';

const Container = styled(Hexile, {
  width: '100vw',
  height: '100vh',
});
const Main = styled(Vexile, {
  width: 'calc(100% - 20rem)',
  padding: '2rem'
});

const Box: React.FC<{
  Children: LoadableComponent<{}>
}> = ({ Children }) => {
  return (
    <Container>
      <SideBar />
      <Main filly>
        <TopBar />
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