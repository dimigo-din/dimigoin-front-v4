import {getInstance} from "./client.ts";

const client = getInstance();

type Stay = {
  id: string,
  name: string,
  stay_from: string,
  stay_to: string,
  outing_day: string[];
  stay_apply_period: {
    id: string,
    grade: 1 | 2 | 3
    apply_start: string,
    apply_end: string,
  }[],
  stay_seat_preset: {
    id: string,
    name: string,
    only_readingRoom: boolean,
    stay_seat: {
      id: string,
      target: string,
      range: string,
    }[];
  }
}

type StayApply = {
  id: string,
  stay_seat: string,
  stay: Stay,
  outing: {
    id: string,
    reason: string,
    breakfast_cancel: boolean,
    lunch_cancel: boolean,
    dinner_cancel: boolean,
    from: string,
    to: string,
    approved: boolean,
    audit_reason: string,
  }[],
  user: {
    id: string,
    email: string,
    name: string,
    permission: string,
  }
}

export async function getStayList(): Promise<Stay[]> {
  return (await client.get("/stay")).data;
}

export async function stayApplies(): Promise<StayApply[]> {
  return (await client.get("/stay/apply")).data;
}

/** Time foramt: YYYY-MM-DDTHH:mm */
export async function applyStay(target: string, seat: string, ...outing: { reason: string, breakfast_cancel: boolean, lunch_cancel: boolean, dinner_cancel: boolean, from: string, to: string }[]): Promise<StayApply> {
  return (await client.post("/stay/apply", { stay: target, stay_seat: seat, outing })).data;
}

/** Time foramt: YYYY-MM-DDTHH:mm */
export async function editStayApply(target: string, seat: string, ...outing: { reason: string, breakfast_cancel: boolean, lunch_cancel: boolean, dinner_cancel: boolean, from: string, to: string }[]): Promise<StayApply> {
  return (await client.patch("/stay/apply", { stay: target, stay_seat: seat, outing })).data;
}

export async function deleteStayApply(target: string): Promise<StayApply> {
  return (await client.delete("/stay/apply?id="+target)).data;
}