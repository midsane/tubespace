importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js");


let firebaseInitialized = false;

self.addEventListener('message', (event) => {
  if (event.data?.type === 'INIT_FIREBASE' && !firebaseInitialized) {
    importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js");
    importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js");

    firebase.initializeApp(event.data.config);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: '/smallFavIcon.png',
        data: { url: payload.data?.url }
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });

    firebaseInitialized = true;
  }
});


self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data?.url;
  if (url) {
    event.waitUntil(clients.openWindow(url));
  }
});
