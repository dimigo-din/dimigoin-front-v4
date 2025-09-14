import {getInstance} from "./client.ts";

const client = getInstance();

export const addSubscribePush = async (body: PushSubscriptionJSON): Promise<any> => {
  return (await client.post("/student/push/subscribe", body)).data;
}

export const deleteSubscribePush = async (endpoint: string): Promise<any> => {
  return (await client.delete("/student/push/subscribe?endpoint=" + encodeURIComponent(endpoint))).data;
}

export const deleteAllSubscribePush = async (): Promise<any> => {
  return (await client.delete("/student/push/unsubscribe/all")).data;
}