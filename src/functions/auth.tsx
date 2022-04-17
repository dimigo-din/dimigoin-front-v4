import React from "react";
import { Navigate } from "react-router-dom";
import {
  getAccessToken,
  refetchToken
} from '@/api';
import { LoadableComponent } from "@loadable/component";
import { User, UserType } from "@/constants/types";
import { getMyData } from "@/api/user";

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

export const needAuthAndBranch = ({
  Teacher,
  Student,
  Dormitory
}: {
  Student: LoadableComponent<{}>;
  Teacher: LoadableComponent<{}>;
  Dormitory: LoadableComponent<{}>;
}): JSX.Element => {
  const [myData, setMyData] = React.useState<User | null>();

  React.useEffect(() => {
    getMyData()
      .then(setMyData)
      .catch(() => setMyData(null));
  }, []);

  if (myData === null) return <Navigate to="/login" />;
  if (myData?.userType === UserType.S) return <Student />;
  if (myData?.userType === UserType.T) return <Teacher />;
  if (myData?.userType === UserType.D) return <Dormitory />;
  return <></>;
};