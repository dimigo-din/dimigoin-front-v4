import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import styled from '@emotion/styled';
import {
  Main,
  Login,
  AfterSchool
} from '../pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        {/* <Container>
          <Route path='/afterschool' element={} />
        </Container> */}
      </Routes>
    </BrowserRouter>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding-bottom: 20px;
  box-sizing: border-box;
`;

export default Router;
