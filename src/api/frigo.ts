import {getInstance} from "./client.ts";

const client = getInstance();

export type Frigo = {
  id: string;
  week: string;
  timing: "afterschool" | "dinner" | "after_1st_study" | "after_2nd_study";
  reason: string;
  audit_reason: string;
  approved: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const getFrigo = async (): Promise<Frigo> => {
  return (await client.get("/frigo")).data;
}

export const applyFrigo = async (timing: string, reason: string): Promise<Frigo> => {
  return (await client.post("/frigo", { timing: timing, reason: reason, grade: localStorage.getItem("grade") })).data;
}

export const deleteFrigo = async (): Promise<Frigo> => {
  return (await client.delete("/frigo")).data;
}