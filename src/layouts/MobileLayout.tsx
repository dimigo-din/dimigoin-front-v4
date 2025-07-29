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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <p>pc버전은 현재 지원되지 않습니다.</p>
        <p>사실 창 크기 줄이면 됨.</p>
        <p>앱으로 낼려고 했는데 인력이 안따라줌</p>
        <p>1학년들 들어오면 갈아내서 만들예정 훗.</p>
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
