import SchoolScenery from "../../assets/img/schoolscenery.svg?react";
import Logo from "../../assets/icons/dimigoin.svg?react";
import styled from "styled-components";
import GoogleLogo from "../../assets/icons/google.svg?react";
import {getRedirectUri, googleLogin} from "../../api/auth.ts";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {useNotification} from "../../providers/MobileNotifiCationProvider.tsx";

const Wrapper = styled.div`
  height: 100svh;
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

  font-size: ${({theme}) => theme.Font.Title.size};
  font-weight: ${({theme}) => theme.Font.Title.weight.strong};
`;

const LoginButton = styled.button`
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-content: center;

  gap: 10px;

  width: 80%;
  margin: auto;

  background-color: ${({theme}) => theme.Colors.Components.Translucent.Secondary};
  padding: 16px 12px;
  border-radius: 16px;

  p {
    margin: auto 0;
  }

  &:active {
    background-color: ${({theme}) => theme.Colors.Components.Translucent.Tertiary};
  }

  &:disabled {
    background-color: ${({theme}) => theme.Colors.Components.Translucent.Tertiary};
    cursor: not-allowed;
  }
`;

function LoginPage() {
  const {showToast} = useNotification();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code") as string;
    if (code) {
      googleLogin(code).then(({ accessToken }) => {
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        localStorage.setItem("id", payload.id);
        localStorage.setItem("grade", payload.grade);
        localStorage.setItem("class", payload.class);
        localStorage.setItem("number", payload.number);
        localStorage.setItem("gender", payload.gender);
        showToast("로그인에 성공하였습니다.", "info");

        setTimeout(() => {
          location.href = "/"
        }, 1000);
      }).catch((e) => {
        console.error(e);
        showToast("로그인에 실패하였습니다.", "danger");
      });
    }
  }, []);

  return (
    <Wrapper>
      <div></div>
      <Brand>
        <Title>
          <Logo/>
          <p>디미고인</p>
        </Title>
        <br/>
        <LoginButton onClick={() => getRedirectUri().then(url => location.href = url).catch(() => showToast("서버에 연결할 수 없습니다", "danger"))}>
          <GoogleLogo/>
          <p>디미고 구글 계정으로 로그인</p>
        </LoginButton>
      </Brand>
      <SchoolScenery className={"scenery"}/>
    </Wrapper>
  );
}

export default LoginPage;