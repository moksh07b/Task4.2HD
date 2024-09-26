import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTCay-m3qsx28sYzNAR_Wl-bW1Btw096c",
  authDomain: "embedded-system-6f5ea.firebaseapp.com",
  databaseURL: "https://embedded-system-6f5ea-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "embedded-system-6f5ea",
  storageBucket: "embedded-system-6f5ea.appspot.com",
  messagingSenderId: "898376689538",
  appId: "1:898376689538:web:d4f2cee27f44e69550119b",
  measurementId: "G-EKGEK3FDGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app); 
