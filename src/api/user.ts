import {getInstance} from "./client.ts";
import type {StayApply} from "./stay.ts";
import type {LaundryApply} from "./laundry.ts";

const client = getInstance();

export type Applies = {
  stayApply: StayApply;
  laundryApply: LaundryApply;
}

export const getApplies = async (): Promise<Applies> => {
  return (await client.get("/user/apply")).data
}