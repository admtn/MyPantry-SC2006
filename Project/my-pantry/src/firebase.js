import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore";

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
const db= getFirestore(app);

export const storage = getStorage();
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export {db};
export default app;

try {
  const docRef = await addDoc(collection(db,  "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

