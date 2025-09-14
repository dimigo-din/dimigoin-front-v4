'use client';

import { useEffect, useState } from 'react';
import { urlBase64ToUint8ArrayBrowser } from '../utils/push';
import { addSubscribePush, deleteSubscribePush } from '../api/push';

const PUBLIC_VAPID_KEY = import.meta.env.VITE_PUBLIC_VAPID_KEY as string;

async function ensurePermission() {
  if (!('Notification' in window)) throw new Error('Notification 미지원');
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') throw new Error('알림 권한 거부됨');
  const res = await Notification.requestPermission();
  if (res !== 'granted') throw new Error('알림 권한 거부됨');
  return true;
}

async function registerSW() {
  if (!('serviceWorker' in navigator)) throw new Error('SW 미지원');
  const reg = await navigator.serviceWorker.register('/sw.js');
  return reg;
}

async function subscribePush(reg: ServiceWorkerRegistration) {
  const existing = await reg.pushManager.getSubscription();
  if (existing) return existing;

  return reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8ArrayBrowser(PUBLIC_VAPID_KEY),
  });
}

export default function PushToggle() {
  const [status, setStatus] = useState<'idle'|'on'|'off'|'error'>('idle');
  const [msg, setMsg] = useState<string>('');

  const enable = async () => {
    try {
      await ensurePermission();
      const reg = await registerSW();
      const sub = await subscribePush(reg);

      // 서버에 구독 전달
      addSubscribePush(sub.toJSON()).then(() => {
        setStatus('on');
        setMsg('푸시 구독 완료');
      }).catch((e) => {
        throw new Error(e.response?.data?.error?.message || e.response?.data?.error || '구독 서버 등록 실패');
      });
    } catch (e: any) {
      setStatus('error');
      setMsg(e.message || String(e));
    }
  };

  const disable = async () => {
    try {
      const reg = await navigator.serviceWorker.getRegistration();
      const sub = await reg?.pushManager.getSubscription();
      if (sub) {
        await deleteSubscribePush(sub.endpoint);
        await sub.unsubscribe();
      }
      setStatus('off');
      setMsg('구독 해제');
    } catch (e: any) {
      setStatus('error');
      setMsg(e.message || String(e));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        const sub = await reg?.pushManager.getSubscription();
        setStatus(sub ? 'on' : 'off');
      } catch { setStatus('off'); }
    })();
  }, []);

  return (
    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
      <button onClick={enable}>알림 켜기</button>
      <button onClick={disable}>알림 끄기</button>
      <span>{status} {msg && `- ${msg}`}</span>
    </div>
  );
}
