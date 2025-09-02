import axios from "axios";
import {getInstance} from "./client.ts";

const client = getInstance();

export type PersonalInformation = {
  gender: "male" | "female";
  mail: string;
  name: string;
  grade: number;
  class: number;
  number: number;
};

export async function ping(): Promise<"퐁"> {
  return (await client.get("/auth/ping")).data;
}

export async function getRedirectUri(): Promise<string> {
  return (await client.get("/auth/login/google?redirect_uri=" + location.protocol + "//" + location.host + "/login")).data;
}

export async function passwordLogin(email: string, password: string): Promise<{
  accessToken: string,
  refreshToken: string
}> {
  return (await client.post("/auth/login/password", {email, password})).data;
}

export async function googleLogin(code: string): Promise<{ accessToken: string, refreshToken: string }> {
  return (await client.post("/auth/login/google/callback", {code, redirect_uri: location.protocol + "//" + location.host + "/login"})).data;
}

export async function logout(): Promise<void> {
  await client.get("/auth/logout");
}

export async function getPersonalInformationVerifyToken() {
  return (await client.get("/auth/personalInformationVerifyToken")).data;
}

export async function getPersonalInformation(passcode: string): Promise<PersonalInformation> {
  const token = await getPersonalInformationVerifyToken();
  let personalInformation;
  if (location.host === "dimigo.site")
    personalInformation = (await axios.get("https://dimiauth.dimigoin.io/personalInformation/my", { headers: { "Authorization": `Bearer ${btoa(`${token}$${passcode}`)}` } }));
  else
    personalInformation = (await axios.get("https://dimiauth.findflag.kr/personalInformation/my", { headers: { "Authorization": `Bearer ${btoa(`${token}$${passcode}`)}` } }));

  const parsedNumber = {
    grade: parseInt(personalInformation.data.number.substring(0, 1)),
    class: parseInt(personalInformation.data.number.substring(1, 2)),
    number: parseInt(personalInformation.data.number.substring(2, 4)),
  }
  return {
    ...personalInformation.data,
    ...parsedNumber,
  };
}