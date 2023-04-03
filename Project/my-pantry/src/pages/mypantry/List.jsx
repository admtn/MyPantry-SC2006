
import React, { useEffect, useState } from "react";
import "./mypantry.scss";
import "./ingredients.scss";
import { collection, getDocs,getFirestore, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from '../../firebase';
import TextField from "@mui/material/TextField";


function List(props) {
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
        console.log(ingredients)
      }, []);

      const saveIngredient = async (id, name) => {
        try {
            const recipeRef = doc(firestore, "pantry", String(id));
            await setDoc(recipeRef, {
            id: id,
            name: name
            });
            alert("Ingredient saved successfully!");
            console.log("Ingredient saved successfully.");
        } catch (error) {
            console.error("Error saving Ingredient: ", error);
            }
        };


      const filteredData = ingredients.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(props.input)
        }
    })

    return (
        <ul>
            {filteredData.map((item) => (
                <span style={{cursor:'pointer'}} onClick={()=>{saveIngredient(item.id,item.name)}}>
                <li style={{margin:9}}key={item.id}>{item.name}</li>
                </span>
            ))}
        </ul>
    )
}

export default List