import styled from "styled-components";

const HeaderWrapper = styled.header`
  height: 56px;

  padding: 0 24px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
`;

import LogoIcon from "../assets/icons/dimigoin.svg?react";
import PWAHeader from "./PWAHeader";

const Header = () => {
  return location.pathname.startsWith("/login") ? null : (
    <HeaderWrapper>
      <PWAHeader />
      <LogoIcon
        style={{
          height: "32px",
          marginRight: "8px",
        }}
      />
    </HeaderWrapper>
  );
};
export default Header;
