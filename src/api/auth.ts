import {getInstance} from "./client.ts";

const client = getInstance();

export async function ping() {
  const res = await client.get("/auth/ping");
}

export async function getRedirectUri(redirect_uri?: string) {
  return (await client.get(redirect_uri ? "/auth/login/google?redirect_uri="+redirect_uri : "/auth/login/google")).data;
}