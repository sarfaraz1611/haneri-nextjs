import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVHIc-5r5o5Dq0UdWdFcMrqOAtpFoaGiY",
  authDomain: "haneri001.firebaseapp.com",
  projectId: "haneri001",
  storageBucket: "haneri001.firebasestorage.app",
  messagingSenderId: "827157409994",
  appId: "1:827157409994:web:09c18d1a807f00d93f0433",
  measurementId: "G-V4NGM72JB8",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
