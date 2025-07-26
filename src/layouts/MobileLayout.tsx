import Header from "../components/Header";
import Footer from "../components/Footer";
import {Wrapper, Content} from "./MobileLayout.styles";
import {MobileNotificationProvider} from "../providers/MobileNotifiCationProvider.tsx";
import { useEffect, useState } from "react";

const MobileLayout = ({children}: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return (
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <p>pc버전은 현재 지원되지 않습니다.</p>
      </div>
    );
  }

  return (
    <Wrapper>
      <MobileNotificationProvider>
        <Header/>
        <Content noPadding={location.pathname.startsWith("/login")}>{children}</Content>
        <Footer/>
      </MobileNotificationProvider>
    </Wrapper>
  );
};

export default MobileLayout;
