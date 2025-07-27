import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig as fbc } from "@/constast";

const { vapidKey, ...firebaseConfig } = fbc;

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
const messaging = getMessaging(app);

export { messaging, getToken, onMessage, analytics };
