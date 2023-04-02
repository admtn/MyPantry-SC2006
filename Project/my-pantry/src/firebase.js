import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Add this import
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyABzG4Xk8vnToAEs_q2l0xl4t9Z820T9xY",
  authDomain: "mypantry-a5508.firebaseapp.com",
  projectId: "mypantry-a5508",
  storageBucket: "mypantry-a5508.appspot.com",
  messagingSenderId: "246039468508",
  appId: "1:246039468508:web:aafad9d1f6641599e35719",
  measurementId: "G-X7D8WG43V2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage();
export const auth = getAuth(app);
export const firestore = getFirestore(app); // Add this line
export const provider = new GoogleAuthProvider();

export default app;
