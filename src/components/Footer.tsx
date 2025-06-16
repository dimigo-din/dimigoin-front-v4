import styled from "styled-components";
import { Link } from "react-router-dom";
const FooterWrapper = styled.footer`
    height: 84px;

    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 16px 16px 0 0;
    background-color: ${({ theme }) => theme.colors.solid.white};
    border: 1px solid ${({ theme }) => theme.colors.border.primary};

    ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
        li {
            font-size: ${({ theme }) => theme.font.base.size};
        }
    }
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <ul>
                <li>
                    <Link to="/">홈</Link>
                </li>
                <li>
                    <Link to="/stay">잔류</Link>
                </li>
                <li>
                    <Link to="/wake-up">기상곡</Link>
                </li>
                <li>
                    <Link to="/laundry">세탁</Link>
                </li>
                <li>
                    <Link to="/more">더보기</Link>
                </li>
            </ul>
        </FooterWrapper>
    );
};

export default Footer;
