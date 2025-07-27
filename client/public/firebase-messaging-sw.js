importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyCF4xyeTZk0DuhbR8flQUNE6A0Iu3MfLt0",
  authDomain: "tubespace-cf5cf.firebaseapp.com",
  projectId: "tubespace-cf5cf",
  storageBucket: "tubespace-cf5cf.firebasestorage.app",
  messagingSenderId: "1093410084948",
  appId: "1:1093410084948:web:12338aa1edfa16bc93f5c1",
  measurementId: "G-JDFVZ54N75"
};
firebase.initializeApp(firebaseConfig);
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

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data?.url;
  if (url) {
    event.waitUntil(clients.openWindow(url));
  }
});