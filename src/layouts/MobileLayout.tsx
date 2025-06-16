import Header from "../components/Header";
import Footer from "../components/Footer";
import { Wrapper, Content } from "./MobileLayout.styles";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Wrapper>
            <Header />
            <Content>{children}</Content>
            <Footer />
        </Wrapper>
    );
};

export default MobileLayout;
