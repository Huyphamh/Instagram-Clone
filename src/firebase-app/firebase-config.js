import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDR-EuCTFNa5x5t2B5NbREUVJJk9gUAa_k",
  authDomain: "instagram-clone-b7176.firebaseapp.com",
  projectId: "instagram-clone-b7176",
  storageBucket: "instagram-clone-b7176.appspot.com",
  messagingSenderId: "929960438494",
  appId: "1:929960438494:web:1bd8192f7129d5cbd8b04f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
