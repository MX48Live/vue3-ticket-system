import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APIKEY,
//   authDomain: import.meta.env.VITE_AUTHDOMAIN,
//   projectId: import.meta.env.VITE_PROJECTID,
//   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_APPID
// }

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "db-vue3-ticket-system.firebaseapp.com",
  projectId: "db-vue3-ticket-system",
  storageBucket: "db-vue3-ticket-system.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
}

initializeApp(firebaseConfig);
export const db = getFirestore()
export const auth = getAuth()

