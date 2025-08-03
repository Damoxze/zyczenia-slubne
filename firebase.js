// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvHdMWg7-exNIiHUBrfLvBnVplUc1PpTQ",
  authDomain: "zyczenia-slubne.firebaseapp.com",
  projectId: "zyczenia-slubne",
  storageBucket: "zyczenia-slubne.firebasestorage.app",
  messagingSenderId: "804897657811",
  appId: "1:804897657811:web:ec9026bd49ef590ca69526",
  measurementId: "G-BLNX8NSH9H"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
