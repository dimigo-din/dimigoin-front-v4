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

      </Menu>
      <ItsUS>
        <p>Copyright 2025. DIN Org. All rights reserved.</p>
        <p><DimigoinLogo /> 디미고인 By <DINLogo /> DIN Org.</p>
      </ItsUS>
    </Wrapper>
  );
}

export default MorePage;