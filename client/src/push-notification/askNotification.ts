import { showCustomNotification } from "@/components/customToast/pushNotificationToast";
import { messaging, getToken, onMessage } from "./firebase";
import { notifyViaPushNotification } from "@/httpfnc/notify";
import { toast } from "sonner";
import { firebaseConfig } from "@/constast";

const vapidKey = firebaseConfig.vapidKey
if (!vapidKey) {
  console.error("VAPID key is not defined in firebaseConfig");
  throw new Error("VAPID key is not defined in firebaseConfig");
}


export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("Permission not granted for notifications");
      throw new Error("Permission not granted for notifications")
    }
  } catch (err) {
    console.error("An error occurred while retrieving token. ", err);
    throw new Error("An error occurred while retrieving token.")
  }
};

export const listenToMessages = () => {

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    showCustomNotification({
      title: payload.notification?.title || "Notification",
      body: payload.notification?.body || "",
      url: payload.data?.url,
    });
  });

}

listenToMessages()

export const sendMessage = async (title: string, body: string) => {
  try {
    const fcmToken = await requestPermission();
    await notifyViaPushNotification(fcmToken, title, body)
  } catch (error) {
    console.error("Error requesting permission or getting FCM token:", error);
    toast.error("Failed to get FCM token. Please try again.");
  }
}