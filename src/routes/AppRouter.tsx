import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import StayPage from "../pages/stay/StayPage";

const AppRouter = () => {


  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stay" element={<StayPage />} />
    </Routes>
  );
};

export default AppRouter;
