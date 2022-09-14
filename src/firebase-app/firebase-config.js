import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBRNcoK5HFyVSvfqywVLonaaBks9wNLXfc",
  authDomain: "zingmp3-311d7.firebaseapp.com",
  projectId: "zingmp3-311d7",
  storageBucket: "zingmp3-311d7.appspot.com",
  messagingSenderId: "801012309576",
  appId: "1:801012309576:web:c188f1798b32c684fac27d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
