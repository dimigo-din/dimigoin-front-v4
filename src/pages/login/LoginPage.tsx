import SchoolScenery from "../../assets/img/schoolscenery.svg?react";
import Logo from "../../assets/icons/dimigoin.svg?react";
import styled from "styled-components";
import GoogleLogo from "../../assets/icons/google.svg?react";
import {getPersonalInformation, getRedirectUri, googleLogin, logout, ping} from "../../api/auth.ts";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {useNotification} from "../../providers/MobileNotifiCationProvider.tsx";
import {decodeJwt} from "jose";

const Wrapper = styled.div`
  height: 100dvh;
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
    color: ${({theme}) => theme.Colors.Content.Primary};
  }

  &:active {
    background-color: ${({theme}) => theme.Colors.Components.Translucent.Tertiary};
  }

  &:disabled {
    background-color: ${({theme}) => theme.Colors.Components.Translucent.Tertiary};
    cursor: not-allowed;
  }
`;

const Forgot = styled.div`
  display: flex;
  flex-direction: row;

  width: 80%;
  margin: auto;
  margin-top: 8px;

  justify-content: right;

  a {
    margin: 0;
    color: ${({theme}) => theme.Colors.Content.Tertiary};
    text-decoration: underline;
  }
`;

function LoginPage() {
  const {showToast} = useNotification();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    ping().then((res) => {if (res === "퐁" && localStorage.getItem("grade"))  location.href = "/"});
    const code = searchParams.get("code") as string;
    if (code) {
      showToast("로그인중입니다...", "info");
      googleLogin(code).then(({accessToken}) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payload = decodeJwt(accessToken) as unknown as any;
        localStorage.setItem("id", payload.id);
        localStorage.setItem("picture", payload.picture);
        getPersonalInformation(prompt("개인정보를 등록할때 입력한 인증번호를 입력해주세요.")!).then((data) => {
          localStorage.setItem("grade", data.grade.toString());
          localStorage.setItem("class", data.class.toString());
          localStorage.setItem("number", data.number.toString());
          localStorage.setItem("gender", data.gender);
          localStorage.setItem("name", data.name);

          showToast("로그인에 성공하였습니다.", "info");

          setTimeout(() => {
            location.href = "/"
          }, 1000);
        }).catch((e) => {
          console.error(e);
          showToast("로그인에 실패했습니다.", "danger");
          showToast(e.response.data.error, "danger");
        });
      }).catch((e) => {
        console.error(e);
        showToast("로그인에 실패했습니다.", "danger");
        showToast(e.response.data.error, "danger");

        if (e.response.data.code === "PersonalInformation_NotRegistered") {
          showToast("개인정보 등록 페이지로 이동합니다.", "info");
          location.href = "https://dimiauth.findflag.kr"
        }else {
          setTimeout(() => {
            logout().then(() => {
              location.href = "/login";
            })
          }, 1000);
        }
      });
    }
  }, []);

  return (
    <Wrapper>
      <div></div>
      <Brand>
        <Title>
          <Logo style={{ height: "32px" }}/>
          <p>디미고인</p>
        </Title>
        <br/>
        <LoginButton onClick={() => getRedirectUri().then(url => location.href = url).catch(() => showToast("서버에 연결할 수 없습니다", "danger"))}>
          <GoogleLogo/>
          <p>디미고 구글 계정으로 로그인</p>
        </LoginButton>
        <Forgot>
          <a href="http://pf.kakao.com/_fxhZen/chat" target="_blank">인증번호를 잊으셨나요?</a>
        </Forgot>
      </Brand>
      <SchoolScenery className={"scenery"}/>
    </Wrapper>
  );
}

export default LoginPage;