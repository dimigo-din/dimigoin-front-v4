import styled from "styled-components";
import DimigoinLogo from "../../assets/icons/dimigoin.svg?react";
import DINLogo from "../../assets/icons/din_logo.svg?react";
import LogoutLogo from "../../assets/icons/logout.svg?react";
import {logout} from "../../api/auth.ts";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  
  display: flex;
  flex-direction: column;

  gap: 3dvh;

  justify-content: space-between;
`;

const Profile = styled.div`
  height: 10dvh;
  width: 100%;
  
  border-radius: 16px;
  
  background-color: ${({theme}) => theme.Colors.Background.Primary};
  
  padding: 0 2dvh;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1dvh;
  
  img {
    height: 7dvh;
    
    border-radius: 100%;
  }
  
  div > p.info {
    font-size: ${({theme}) => theme.Font.Body.size};
    color: ${({theme}) => theme.Colors.Content.Secondary}; 
  }
  div > p.name {
    font-size: ${({theme}) => theme.Font.Headline.size};
    font-weight: ${({theme}) => theme.Font.Headline.weight.strong};
    color: ${({theme}) => theme.Colors.Content.Primary}; 
  }
`;

const Menu = styled.div`
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;

  gap: 1dvh;
`;

const MenuItem = styled.div`
  padding: 14px 12px;
  width: 100%;
  
  border-radius: 12px;

  cursor: pointer;

  background-color: ${({theme}) => theme.Colors.Background.Primary};
  
  border: 1px solid ${({theme}) => theme.Colors.Line.Outline};
`;

const ItsUS = styled.div`
  font-size: ${({theme}) => theme.Font.Footnote.size};
  color: ${({theme}) => theme.Colors.Content.Secondary};
  
  text-align: center;
  
  svg {
    display: inline-block;
    height: ${({theme}) => theme.Font.Footnote.size};
    width: ${({theme}) => theme.Font.Footnote.size};
    
    transform: translateY(1px);
  }
  
  p {
    line-height: 140%;
    align-content: center;
  }
`;

const Logout = styled.div`
  flex: 1;
  
  display: flex;
  justify-content: right;
  
  svg {
    height: 3dvh;
    width: 3dvh;
    * { fill: ${({theme}) => theme.Colors.Content.Primary} };
    cursor: pointer;
  }
`;

function MorePage() {
  return (
    <Wrapper>
      <Profile>
        <img src={localStorage.getItem("picture")!} alt="profile"/>
        <div>
          <p className={"info"}>{localStorage.getItem("grade")}학년 {localStorage.getItem("class")}반 {localStorage.getItem("number")}번</p>
          <p className={"name"}>{localStorage.getItem("name")}</p>
        </div>
        <Logout>
          <LogoutLogo onClick={() => { logout().finally(() => location.href = "/login"); }} />
        </Logout>
      </Profile>
      <Menu>
        <a href="https://pf.kakao.com/_fxhZen/chat" target="_blank"><MenuItem>DIN에 문의하기</MenuItem></a>
        <a href="https://www.notion.so/dimigo-din/DIN-25f98f8027c680a79e3ecf1e0cb6c6ff" target="_blank"><MenuItem>개인정보 처리방침</MenuItem></a>
      </Menu>
      <ItsUS>
        <p>Copyright 2025. DIN Org. All rights reserved.</p>
        <p><DimigoinLogo /> 디미고인 By <DINLogo /> DIN Org.</p>
      </ItsUS>
    </Wrapper>
  );
}

export default MorePage;