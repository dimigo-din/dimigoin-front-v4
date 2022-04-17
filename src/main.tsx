import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { globalCss, styled } from '#/stitches.config';
import {
  Login,
  Main
} from '@/pages';
import {
  needAuth,
  needAuthAndBranch
} from '@/functions/auth';
import moment from 'moment-timezone';

import 'react-toastify/dist/ReactToastify.min.css';
import '@/asset/Pretendard/index.css';
import '@/asset/toastStyle.css';

moment.tz.setDefault('Asia/Seoul');

globalCss({
  '*': {
    fontFamily: 'Pretendard',
  },
  body: {
    backgroundColor: '$background',
  }
})();

const Router = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={needAuthAndBranch(Main)} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);

const Container = styled('div', {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  paddingBottom: '20px',
  boxSizing: 'border-box',
});