import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "স্ক্রিনে_পাওয়া_apiKey",
  authDomain: "swe-43-c.firebaseapp.com",
  projectId: "swe-43-c",
  storageBucket: "swe-43-c.firebasestorage.app",
  messagingSenderId: "স্ক্রিনে_পাওয়া_messagingSenderId",
  appId: "স্ক্রিনে_পাওয়া_appId"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);