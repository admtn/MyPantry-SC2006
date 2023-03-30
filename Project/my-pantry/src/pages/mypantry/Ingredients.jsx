import React, { useEffect, useState } from "react";
import "./mypantry.scss";
import { collection, getDocs,getFirestore, docs, doc } from "firebase/firestore";

const ShowIngredients = () => {

    const [ingredients, setIngredients] = useState([]);
    useEffect(() => {
        const fetchIngredients = async () => {
          const db = getFirestore();
          const querySnapshot = await getDocs(collection(db, "test")); 
          //QuerySnapshot object contains an array of QueryDocumentSnapshot objects, each of which represents a single document in the collection or query results.
          const data = querySnapshot.docs.map((doc) => doc.data());
          setIngredients(data);
        };
    
        fetchIngredients();
      }, []);


    
  return (
    <div>
        {ingredients && ingredients.map((item) => (
            <span>{item.name}</span>
        ))}
    </div> 
  );
};

export default ShowIngredients;
