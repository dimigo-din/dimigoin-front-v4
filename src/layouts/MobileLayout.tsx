import Header from "../components/Header";
import Footer from "../components/Footer";
import { Wrapper, Content } from "./MobileLayout.styles";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Wrapper>
            <Header />
            <Content noPadding={location.pathname.startsWith("/login")}>{children}</Content>
            <Footer />
        </Wrapper>
    );
};

export default MobileLayout;
