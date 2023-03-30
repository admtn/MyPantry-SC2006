import React, { useEffect, useState } from "react";
import "./mypantry.scss";
import "./ingredients.scss";
import { collection, getDocs,getFirestore, docs, doc } from "firebase/firestore";

const ShowIngredients = () => {

    //to fetch from firestore
    const [ingredients, setIngredients] = useState([]);
    useEffect(() => {
        const fetchIngredients = async () => {
          const db = getFirestore();
          const querySnapshot = await getDocs(collection(db, "ingredients")); 
          //QuerySnapshot object contains an array of QueryDocumentSnapshot objects, each of which represents a single document in the collection or query results.
          const data = querySnapshot.docs.map((doc) => doc.data());
          setIngredients(data);
        };
    
        fetchIngredients();
      }, []);

      //to toggle button
      const [isOn, setIsOn] = useState(false);
      const handleToggle = () => {
        setIsOn(!isOn);
      };

      //button styling
      const buttonStyle = {
        color: 'black',
        padding: '10px 20px',
        borderRadius: '5px',
        // border: 'none',
        cursor: 'pointer',
        margin: 10,
      };
    
  return (
    <div>
        {ingredients && ingredients.map((item) => (
          <button onClick={handleToggle}><span style={isOn?buttonStyle:{fontSize:10}}>{item.name}</span></button>
          // <button><span style={{fontSize:30}}>{item.name}</span></button>
            
    
        ))}
    </div> 
  );
};

export default ShowIngredients;
