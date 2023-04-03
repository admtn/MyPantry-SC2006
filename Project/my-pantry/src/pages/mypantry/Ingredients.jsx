import React, { useEffect, useState } from "react";
import "./mypantry.scss";
import "./ingredients.scss";
import { collection, getDocs,getFirestore, setDoc, doc, onSnapshot} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from '../../firebase';
import TextField from "@mui/material/TextField";
import List from "./List";
import Searchbar from "./Searchbar";

const ShowIngredients = ({seturl,url}) => {
    const navigate = useNavigate();

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };
    //to fetch from firestore
    const [ingredients, setIngredients] = useState([]);
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

    // useEffect(() => {
    //   const fetchPantry = async () => {
    //     const db = getFirestore();
    //     const querySnapshot = await getDocs(collection(db, "pantry")); 
    //     //QuerySnapshot object contains an array of QueryDocumentSnapshot objects, each of which represents a single document in the collection or query results.
    //     const data = querySnapshot.docs.map((doc) => doc.data());
    //     setPantry(data);
        
    //   };

    //   fetchPantry();
    // }, []);

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

      //to toggle button
      const [isOn, setIsOn] = useState(false);
      // const handleToggle = () => {
      //   setIsOn(!isOn);
      //   setButtonText('Deleting from pantry');
      // };
      // const [buttonText, setButtonText] = useState('Delete');


      function handleChange(event) {
        setValue(event.target.value);
      }


      const [value, setValue] = useState('');//search bar

      //button styling
      const buttonStyle = {
        color: 'black',
        // padding: '10px 20px',
        borderRadius: '5px',
        // border: 'none',
        cursor: 'pointer',
        margin: 10,
        fontSize:22
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
    
  return (
    <div>
        <div>
          <div>{theArray && theArray.map((i,index)=>(
            // <div style={{borderWidth:10,flexDirection:'row'}}>
            // <span style={{fontSize:30}}>{i} , </span>
            <button onClick={()=>{remove(index)}} style={buttonStyle}>{i}</button>
            
            // </div>
          ))}
          </div>

          <button onClick={()=>{setTheArray([])}} style={buttonStyle2}>Clear</button>
          <button onClick={()=>{
            var temp = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients='
            theArray.map(t=>temp+=t+',+');
            temp+='&number=3&apiKey=7e512d08fbb14992a0d712854865b4eb'
            console.log(temp);
            seturl(temp)}} style={buttonStyle2}>Generate Recipes</button>
          {/* <button style = {buttonStyle2} onClick={()=>{handleToggle}}>
             {buttonText}
             </button> */}
        </div>

        <div>
        {pantry && pantry.map((item,id) => (
          <button onClick={ isOn?
          ()=>{console.log('cibai')}
          :() => {setTheArray(theArray => [...theArray, item.name])}
          }>{item.name}</button>
          // <button><span style={{fontSize:30}}>{item.name}</span></button>\
        ))}
        
        </div>
    </div> 
  );
};

export default ShowIngredients;
