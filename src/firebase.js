import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Console থেকে পাওয়া আপনার কি-গুলো এখানে পেস্ট করুন
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "swe-43-c.firebaseapp.com",
  projectId: "swe-43-c",
  storageBucket: "swe-43-c.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);