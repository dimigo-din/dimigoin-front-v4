self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 푸시 수신
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '알림';
  const options = {
    body: data.body || '',
    icon: './dimigoin.png',
    badge: './dimigoin.png',
    data: { url: data.url || '/', ...data.data },
    actions: data.actions || [] // [{action:'open', title:'열기'}]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// 클릭 시 포커스/열기
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || '/';
  event.waitUntil((async () => {
    const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const same = allClients.find(c => c.url.includes(new URL(url, self.location.origin).pathname));
    if (same) {
      await same.focus();
      await same.navigate(url);
    } else {
      await clients.openWindow(url);
    }
  })());
});
