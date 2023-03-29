import { doc, setDoc } from "firebase/firestore";

import {db} from './firebase.js';

void function addEntry(name,description,ingre,step,titl){
    setDoc(doc(db, "recipes", name), {
        desc: description,
        ingredients: ingre,
        steps:step,
        title:titl
    });
}
