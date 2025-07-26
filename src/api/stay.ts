import {getInstance} from "./client.ts";

const client = getInstance();

export type Stay = {
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
  stay_apply: {
    id?: string,
    stay_seat: string,
    user: {
      id: string,
      name: string,
    }
  }[]
}

export type StayApply = {
  id: string,
  stay_seat: string,
  stay: Stay,
  outing: Outing[],
  user: {
    id: string,
    email: string,
    name: string,
    permission: string,
  }
}

export type Outing = {
  id: string,
  reason: string,
  breakfast_cancel: boolean,
  lunch_cancel: boolean,
  dinner_cancel: boolean,
  from: string,
  to: string,
  approved: boolean,
  audit_reason: string,
}

export async function getStays(): Promise<Stay[]> {
  return (await client.get("/stay")).data;
}

export async function stayApplies(): Promise<StayApply[]> {
  return (await client.get("/stay/apply")).data;
}

/** Time foramt: YYYY-MM-DDTHH:mm */
export async function applyStay(target: string, seat: string, ...outing: {
  reason: string,
  breakfast_cancel: boolean,
  lunch_cancel: boolean,
  dinner_cancel: boolean,
  from: string,
  to: string
}[]): Promise<StayApply> {
  return (await client.post("/stay/apply", {stay: target, stay_seat: seat, outing})).data;
}

/** Time foramt: YYYY-MM-DDTHH:mm */
export async function editStayApply(target: string, seat: string, ...outing: {
  reason: string,
  breakfast_cancel: boolean,
  lunch_cancel: boolean,
  dinner_cancel: boolean,
  from: string,
  to: string
}[]): Promise<StayApply> {
  return (await client.patch("/stay/apply", {stay: target, stay_seat: seat, outing})).data;
}

export async function deleteStayApply(target: string): Promise<StayApply> {
  return (await client.delete("/stay/apply?id=" + target)).data;
}

export async function getStayOuting(stay_id: string): Promise<Outing[]> {
  return (await client.get("/stay/outing?id=" + stay_id)).data;
}

export async function addStayOuting(apply_id: string, reason: string, from: string, to: string, breakfast_cancel: boolean, lunch_cancel: boolean, dinner_cancel: boolean): Promise<Outing> {
  return (await client.post("/stay/outing", {apply_id: apply_id, outing: { reason: reason, from: from, to: to, breakfast_cancel: breakfast_cancel, lunch_cancel: lunch_cancel, dinner_cancel: dinner_cancel }})).data;
}
export async function editStayOuting(outing_id: string, reason: string, from: string, to: string, breakfast_cancel: boolean, lunch_cancel: boolean, dinner_cancel: boolean): Promise<Outing> {
  return (await client.patch("/stay/outing", {outing_id: outing_id, outing: { reason: reason, from: from, to: to, breakfast_cancel: breakfast_cancel, lunch_cancel: lunch_cancel, dinner_cancel: dinner_cancel }})).data;
}

export async function deleteStayOuting(outing_id: string) {
  return (await client.delete("/stay/outing?id=" + outing_id)).data;
}