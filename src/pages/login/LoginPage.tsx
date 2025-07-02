import SchoolScenery from "../../assets/img/schoolscenery.svg?react";
import Logo from "../../assets/icons/dimigoin.svg?react";
import styled from "styled-components";
import GoogleLogo from "../../assets/icons/google.svg?react";
import {getRedirectUri, googleLogin} from "../../api/auth.ts";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .scenery {
    height: fit-content;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  
  justify-content: center;
  
  gap: 8px;
  
  font-size: ${(props) => props.theme.Font.Title.size};
  font-weight: ${(props) => props.theme.Font.Title.weight.strong};
`;

const LoginButton = styled.button`
  display: flex;
  flex-direction: row;
  
  justify-content: center;
  align-content: center;
  
  gap: 10px;
  
  width: 80%;
  margin: auto;
  
  background-color: ${(props) => props.theme.Colors.Components.Translucent.Secondary};
  padding: 16px 12px;
  border-radius: 16px;
  
  p {
    margin: auto 0;
  }

  &:active {
    background-color: ${(props) => props.theme.Colors.Components.Translucent.Tertiary};
  }

  &:disabled {
    background-color: ${(props) => props.theme.Colors.Components.Translucent.Tertiary};
    cursor: not-allowed;
  }
`;

function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code") as string;
    console.log(code);

    googleLogin(code).then((res) => {
      console.log(res.data);
      location.href = "/"
    })
  }, []);

  return (
    <Wrapper>
      <div></div>
      <Brand>
        <Title>
          <Logo />
          <p>디미고인</p>
        </Title>
        <br/>
        <LoginButton onClick={() => getRedirectUri().then(url => location.href = url)}>
          <GoogleLogo/>
          <p>디미고 구글 계정으로 로그인</p>
        </LoginButton>
      </Brand>
      <SchoolScenery className={"scenery"} />
    </Wrapper>
  );
}

export default LoginPage;