import Header from "../components/Header";
import Footer from "../components/Footer";
import {Wrapper, Content} from "./MobileLayout.styles";
import {MobileNotificationProvider} from "../providers/MobileNotifiCationProvider.tsx";

const MobileLayout = ({children}: { children: React.ReactNode }) => {
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
