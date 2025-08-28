import {getInstance} from "./client.ts";
import type {StayApply} from "./stay.ts";
import type {LaundryApply} from "./laundry.ts";

const client = getInstance();

export type Applies = {
  stayApply: StayApply;
  laundryApply: LaundryApply;
}

export const getApplies = async (): Promise<Applies> => {
  return (await client.get("/student/user/apply")).data
}

export const getTimetables = async (grade: string, class_num: string): Promise<{content: string, temp: boolean}[][]> => {
  return (await client.get("/student/user/timeline?grade="+grade+"&class="+class_num)).data;
}