import {getInstance} from "./client.ts";

const client = getInstance();

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
  return (await client.post("/auth/login/google/callback", {code})).data;
}

export async function logout(): Promise<void> {
  await client.get("/logout");
}