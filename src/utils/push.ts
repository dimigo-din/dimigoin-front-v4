import { addSubscribePush, deleteSubscribePush } from "../api/push";

export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = Buffer.from(base64, "base64");
  return new Uint8Array(rawData);
}

export function urlBase64ToUint8ArrayBrowser(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) output[i] = rawData.charCodeAt(i);
  return output;
}

const PUBLIC_VAPID_KEY = import.meta.env.VITE_PUBLIC_VAPID_KEY as string;

export type PushStatus = "idle" | "on" | "off" | "error";

/** 기존 로직 그대로: 권한 확인 */
export async function ensurePermission() {
  if (!("Notification" in window)) throw new Error("Notification 미지원");
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") throw new Error("알림 권한 거부됨");
  const res = await Notification.requestPermission();
  if (res !== "granted") throw new Error("알림 권한 거부됨");
  return true;
}

/** 기존 로직 그대로: SW 등록 */
export async function registerSW() {
  if (!("serviceWorker" in navigator)) throw new Error("SW 미지원");
  const reg = await navigator.serviceWorker.register("/sw.js");
  return reg;
}

/** 기존 로직 그대로: 구독 생성(기존 있으면 재사용) */
export async function subscribePush(reg: ServiceWorkerRegistration) {
  const existing = await reg.pushManager.getSubscription();
  if (existing) return existing;

  return reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8ArrayBrowser(PUBLIC_VAPID_KEY),
  });
}

/** 기존 enable 로직 그대로: 권한→SW→구독→서버등록 */
export async function enablePush(): Promise<{ status: PushStatus; msg: string }> {
  try {
    await ensurePermission();
    const reg = await registerSW();
    const sub = await subscribePush(reg);

    await addSubscribePush(sub.toJSON())
      .then(() => {
        /* 그대로 유지: 성공 시 상태/메시지 */
      })
      .catch((e) => {
        // 기존 에러 가공 그대로
        throw new Error(
          e.response?.data?.error?.message ||
            e.response?.data?.error ||
            "구독 서버 등록 실패",
        );
      });

    return { status: "on", msg: "푸시 구독 완료" };
  } catch (e: any) {
    return { status: "error", msg: e?.message || String(e) };
  }
}

/** 기존 disable 로직 그대로: 서버 삭제→unsubscribe */
export async function disablePush(): Promise<{ status: PushStatus; msg: string }> {
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    const sub = await reg?.pushManager.getSubscription();
    if (sub) {
      await deleteSubscribePush(sub.endpoint);
      await sub.unsubscribe();
    }
    return { status: "off", msg: "구독 해제" };
  } catch (e: any) {
    return { status: "error", msg: e?.message || String(e) };
  }
}

/** 기존 useEffect 초기 상태 확인 로직 그대로 */
export async function getCurrentPushStatus(): Promise<PushStatus> {
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    const sub = await reg?.pushManager.getSubscription();
    return sub ? "on" : "off";
  } catch {
    return "off";
  }
}