import {getInstance} from "./client.ts";

const client = getInstance();

export type LaundryTimeline = {
  id: string;
  name: string;
  triggeredOn: "primary" | "stay";
  enabled: boolean;
  times: LaundryTime[];
}

export type LaundryTime = {
  id: string;
  time: string;
  grade: 1 | 2 | 3;
  assigns: LaundryMachine[];
}

export type LaundryMachine = {
  id: string;
  type: "washer" | "dryer";
  name: string;
  gender: "male" | "female";
  enabled: boolean;
}

export type LaundryApply = {
  id: string;
  date: string;
  created_at: string;
  laundryTime: LaundryTime;
  laundryMachine: LaundryMachine;
  user: {
    id: string;
    email: string;
    name: string;
    permisson: number;
  };
}

export const getLaundryTimeline = async (): Promise<LaundryTimeline> => {
  return (await client.get("/laundry/timeline")).data;
}

export const getLaundryApplies = async (): Promise<LaundryApply[]> => {
  return (await client.get("/laundry")).data;
}

export const addLaundryApply = async (time: string, machine: string): Promise<LaundryApply> => {
  return (await client.post("/laundry", { time: time, machine: machine })).data;
}

export const deleteLaundryApply = async (): Promise<LaundryApply[]> => {
  return (await client.delete("/laundry")).data;
}