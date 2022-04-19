import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { globalCss, styled } from '#/stitches.config';
import {
  Login,
  Main
} from '@/pages';
import {
  needAuth,
  BranchRouting
} from '@/functions/auth';
import moment from 'moment-timezone';

import 'react-toastify/dist/ReactToastify.min.css';
import '@/asset/Pretendard/index.css';
import '@/asset/toastStyle.css';

moment.tz.setDefault('Asia/Seoul');

globalCss({
  ':root': {
    fontSize: '10px'
  },
  '*': {
    fontFamily: 'Pretendard',
    fontSize: '1.6rem',
    boxSizing: 'border-box',
    fontWeight: 700,
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  body: {
    backgroundColor: '$background',
    margin: 0,
  }
})();

const Router = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/ingangsil' element={<BranchRouting screens={Main} />}>
        <Route path=':day' element={<BranchRouting screens={Main} />} />
      </Route>
      <Route path='/' element={<BranchRouting screens={Main} />} />
      {/* <Route path='*' element={<Navigate to='/' />} /> */}
      <Route path='*' element={<BranchRouting screens={Main} />} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);