import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyABzG4Xk8vnToAEs_q2l0xl4t9Z820T9xY",
  authDomain: "mypantry-a5508.firebaseapp.com",
  projectId: "mypantry-a5508",
  storageBucket: "mypantry-a5508.appspot.com",
  messagingSenderId: "246039468508",
  appId: "1:246039468508:web:aafad9d1f6641599e35719",
};

const app = initializeApp(firebaseConfig);
const db= getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const provider = new GoogleAuthProvider(app);
export {db};

export default app;
