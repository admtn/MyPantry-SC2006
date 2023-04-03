import React, { useEffect, useState } from "react";
import "./mypantry.scss";
import "./ingredients.scss";
import { collection, getDocs,getFirestore, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from '../../firebase';
import TextField from "@mui/material/TextField";
import List from "./List";
import Searchbar from "./Searchbar";

const ShowIngredients = ({seturl,url}) => {

    //to fetch from firestore
    const [ingredients, setIngredients] = useState([]);
    const [buttonsClicked, setbuttonsClicked] = useState([]);
    const [pantry, setPantry] = useState([]);
    const [theArray, setTheArray] = useState([]);
    const remove = (index) => {
      if (index !== -1) {
        setTheArray([
          ...theArray.slice(0, index),
          ...theArray.slice(index + 1)
        ]);
      }
    };

    const remove2 = (name) => {
      const i = theArray.indexOf(name)
      remove(i)
    };

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

    useEffect(() => {
      const fetchPantry = () => {
        const db = getFirestore();
        const pantryCollection = collection(db, "pantry");
    
        const unsubscribe = onSnapshot(pantryCollection, (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setPantry(data);
        });
    
        return unsubscribe;
      };
    
    const unsubscribe = fetchPantry();
      return () => {
        unsubscribe();
      };
    }, []);

    const removePantry = id => {
      const db = getFirestore();
      deleteDoc(doc(db, "pantry", id))
    }

      //to toggle button
      const [isOn, setIsOn] = useState(false);
      const handleToggle = () => {
        setIsOn(!isOn);
        isOn?setButtonText('Delete'):setButtonText('Deleting from pantry')
      };
      const [buttonText, setButtonText] = useState('Delete');

      //button styling
      const buttonStyle = {
        color: 'white',
        borderRadius: '5px',
        backgroundColor: 'grey',
        // border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        margin: 10,
        fontSize:20
      };

      //button styling
      const buttonStyle2 = {
        color: 'black',
        borderRadius: '5px',
        // border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        margin: 10,
        fontSize:20
      };

      const ing = {
        color: 'black',
        borderRadius: '3px',
        // border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        margin: 5,
        fontSize:20
      };

      const ing2 = {
        color: 'white',
        borderRadius: '3px',
        backgroundColor: 'grey',
        // border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        margin: 5,
        fontSize:20
      };
    
  return (
    <div>
        <div>
        <h1 style={{marginLeft:20}}>Ingredients to use</h1>
          <div style={{marginLeft:8}}>{theArray && theArray.map((i,index)=>(
            <button onClick={()=>{
              remove(index) //remove button
              // removeButton(index)
            }}>{i}</button>
            
          ))}
          </div>

          <button onClick={()=>{setTheArray([])}} style={buttonStyle2}>Clear</button>
          <button onClick={()=>{
            var temp = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients='
            theArray.map(t=>temp+=t+',+');
            temp+='&number=3&apiKey=7e512d08fbb14992a0d712854865b4eb'
            console.log(temp);
            seturl(temp)}} style={buttonStyle2}>Generate Recipes</button>
          <button style = {isOn?buttonStyle:buttonStyle2} onClick={handleToggle}>
            {buttonText}
          </button>
        </div>

        <div style={{marginLeft:8}}>
        <h1 style={{marginLeft:40}}>My Pantry</h1>
        {pantry && pantry.map((item,id) => (
          <button style = {theArray.includes(item.name)?ing2:ing} key={id} onClick={ isOn?
          ()=>{removePantry(item.id.toString()  )}
          :() => {
            if(theArray.includes(item.name)){
              console.log("remove it nwo!!")
              remove2(item.name)
            }
            else{
              setTheArray(theArray => [...theArray, item.name])
              console.log(theArray)
            }
            
          }
          }>{item.name}</button>
          // <button><span style={{fontSize:30}}>{item.name}</span></button>\
        ))}
        
        </div>
    </div> 
  );
};

export default ShowIngredients;
