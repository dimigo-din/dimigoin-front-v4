import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";

import Home from "../assets/icons/menu/home.svg?react";
import Office from "../assets/icons/menu/office.svg?react";
import Music from "../assets/icons/menu/music.svg?react";
import Washer from "../assets/icons/menu/washer.svg?react";
import Others from "../assets/icons/menu/others.svg?react";

const FooterWrapper = styled.footer`
  height: 84px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 16px 16px 0 0;
  background-color: ${({theme}) => theme.Colors.Background.Primary};
  border: 1px solid ${({theme}) => theme.Colors.Line.Outline};

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
  color: ${({active, theme}) =>
  active ? theme.Colors.Core.Brand.Primary : theme.Colors.Core.Brand.Secondary};
  font-weight: ${({active}) => (active ? "bold" : "normal")};

  svg {
    color: inherit;
    fill: ${({active, theme}) =>
      active ? theme.Colors.Core.Brand.Primary : theme.Colors.Core.Brand.Secondary};
    
    transition: fill 200ms ease;
    
    margin: auto;
  }

  a {
    color: inherit;
    text-decoration: none;
    margin: auto;
  }
`;

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return location.pathname.startsWith("/login") ? null : (
    <FooterWrapper>
      <ul>
        <MenuItem
          active={location.pathname === "/"}
          onClick={() => {
            navigate("/");
          }}
        >
          <Home
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
          <Office
            style={{
              height: "32px",
            }}
          />
          <p>잔류·금귀</p>
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
          <Washer
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
          <Others
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
