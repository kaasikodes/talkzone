import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_WSDPvn8CSKmSbGCGdSMnFPsZlPHsu1U",
  authDomain: "talk2much-30481.firebaseapp.com",
  projectId: "talk2much-30481",
  storageBucket: "talk2much-30481.appspot.com",
  messagingSenderId: "613054975604",
  appId: "1:613054975604:web:a10f24853209ef84b40b21",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
