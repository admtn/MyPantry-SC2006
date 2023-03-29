import { doc, setDoc } from "firebase/firestore";
const db = require('./firebase');

void function addEntry(name,description,ingre,step,titl){
    setDoc(doc(db, "recipes", name), {
        desc: description,
        ingredients: ingre,
        steps:step,
        title:titl
    });
}
