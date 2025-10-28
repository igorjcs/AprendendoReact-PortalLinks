
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVEHi0CcKIDOPNBT1xRP9AfD7EKuYPCaA",
  authDomain: "reactlinks-b9d95.firebaseapp.com",
  projectId: "reactlinks-b9d95",
  storageBucket: "reactlinks-b9d95.firebasestorage.app",
  messagingSenderId: "479703698175",
  appId: "1:479703698175:web:375f480161e38918cd5aca",
  measurementId: "G-K37N6QB497"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };
