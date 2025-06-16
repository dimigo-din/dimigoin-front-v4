import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import House from "../assets/icons/house.svg?react";
import Music from "../assets/icons/music.svg?react";

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
    }
`;

const MenuItem = styled.li<{ active?: boolean }>`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: ${({ active, theme }) =>
        active ? theme.colors.brand.primary : theme.colors.font.secondary};
    font-weight: ${({ active }) => (active ? "bold" : "normal")};

    svg {
        color: inherit;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <FooterWrapper>
            <ul>
                <MenuItem
                    active={location.pathname === "/"}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <House
                        style={{
                            height: "32px",
                        }}
                    />
                    <p>홈</p>
                </MenuItem>
                <MenuItem
                    active={location.pathname === "/stay"}
                    onClick={() => {
                        navigate("/stay");
                    }}
                >
                    <House
                        style={{
                            height: "32px",
                        }}
                    />
                    <p>잔류</p>
                </MenuItem>
                <MenuItem
                    active={location.pathname === "/wake-up"}
                    onClick={() => {
                        navigate("/wake-up");
                    }}
                >
                    <Music
                        style={{
                            height: "32px",
                        }}
                    />
                    <p>기상곡</p>
                </MenuItem>
                <MenuItem
                    active={location.pathname === "/laundry"}
                    onClick={() => {
                        navigate("/laundry");
                    }}
                >
                    <House
                        style={{
                            height: "32px",
                        }}
                    />
                    <p>세탁</p>
                </MenuItem>
                <MenuItem
                    active={location.pathname === "/more"}
                    onClick={() => {
                        navigate("/more");
                    }}
                >
                    <House
                        style={{
                            height: "32px",
                        }}
                    />
                    <p>더보기</p>
                </MenuItem>
            </ul>
        </FooterWrapper>
    );
};

export default Footer;
