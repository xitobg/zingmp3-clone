import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCGIMpJ25yLXssvJqA2XieH7wy4GptC-7g",
  authDomain: "zingmp3-cb50e.firebaseapp.com",
  projectId: "zingmp3-cb50e",
  storageBucket: "zingmp3-cb50e.appspot.com",
  messagingSenderId: "169009616034",
  appId: "1:169009616034:web:951755ff986463be4933fb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
