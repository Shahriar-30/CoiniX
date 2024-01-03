import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXX"
};
const app = initializeApp(firebaseConfig);



export { app };
export const db = getFirestore(app);
export const storage = getStorage(app);