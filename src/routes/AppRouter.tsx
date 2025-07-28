import {Routes, Route} from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import StayPage from "../pages/stay/StayPage";
import LoginPage from "../pages/login/LoginPage.tsx";
import WakeupPage from "../pages/wakeup/WakeupPage.tsx";

const AppRouter = () => {


  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/stay" element={<StayPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/wake-up" element={<WakeupPage/>}/>
    </Routes>
  );
};

export default AppRouter;
