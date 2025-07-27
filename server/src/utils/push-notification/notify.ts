import admin, { database } from "firebase-admin";
const serviceAccountRaw = process.env.FIREBASE_ADMIN_KEY_JSON
if (!serviceAccountRaw) {
  console.log("Firebase Admin key not loaded from env");
  throw new Error("Firebase Admin key not loaded from env")
}

const serviceAccount = JSON.parse(serviceAccountRaw)
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export function notify(fcmToken: string, title: string, body: string, url?: string): Promise<string> {
  const message = !url ? {
    token: fcmToken,
    notification: {
      title,
      body,
    },
  } : {
    token: fcmToken,
    notification: {
      title,
      body,
    },
    data: {
      url
    }
  }

  console.log("Sending message using token:", fcmToken);

  return new Promise((resolve, reject) => {
    admin.messaging().send(message)
      .then((response) => {
        console.log("✅ Successfully sent:", response);
        resolve("sent push notification")
      })
      .catch((error) => {
        console.error("❌ Error sending message:", error);
        reject("error send push notification")
      });
  })
}

