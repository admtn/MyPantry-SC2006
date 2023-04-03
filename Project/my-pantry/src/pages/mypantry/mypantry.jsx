import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarCopy from "../../components/sidebar/Sidebar copy";
import Navbar from "../../components/navbar/Navbar";
import "./mypantry.scss";
import Searchbar from "./Searchbar";
import Checkbox from "../../components/checkbox/Checkbox";
import InputBox from "../../components/inputbox/input";
import { useNavigate } from "react-router-dom";
import ShowIngredients from "./Ingredients"
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { firestore } from '../../firebase';
import List from './List'
const db = require('../../firebase');

const MyPantry = () => {
  const apikey = '&apiKey=7e512d08fbb14992a0d712854865b4eb'
  
  const [Rec, setRec] = useState([])
  const [url,seturl] = useState('')
  const [RecInfo, setRecInfo] = useState([])
  const [RecipeInfoUrl,setRecipeInfoUrl] = useState('')
  const [value, setValue] = useState('');//search bar

  useEffect( () => {
    console.log("the new url is "+url)
    fetch(url)
    .then(response => response.json())
    .then(json => setRec(json))
  },[url],)

  function handleChange(event) {
    setValue(event.target.value);
  }

  function setfetchnavigate(recipeid) {
    fetch('https://api.spoonacular.com/recipes/' + recipeid.toString() + '/information?includeNutrition=false' + apikey)
    .then(response => response.json())
    .then(json => window.open(json.spoonacularSourceUrl, "_blank"));
  }

  const buttonStyle2 = {
    color: 'black',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: 10,
    fontSize:20
  };
  
  const saveRecipe = async (recipeId, recipeTitle, recipeUrl, recipeImage) => {
    try {
      const recipeRef = doc(firestore, "recipes", String(recipeId));
      await setDoc(recipeRef, {
        id: recipeId,
        title: recipeTitle,
        url: recipeUrl,
        image: recipeImage,
      });
      alert("Recipe saved successfully!");
      console.log("Recipe saved successfully.");
    } catch (error) {
      console.error("Error saving recipe: ", error);
    }
  };

  return (
    <div className="mypantry">
      <Navbar />
        <div style={{display:"flex", flexDirection:"row"}}>
          <div style ={{flex:2}}>
            <SidebarCopy/>
            <div style={{borderWidth:1}}><ShowIngredients seturl={seturl} url={url}/></div>
          </div>

          <div style ={{flex:4}}>       
            <div className="container">
            {Rec && Rec.map((item) =>(
              <div className ="item">
                <h2 style={{ maxWidth: '150px', margin:'30px' }}>{item.title}</h2>             
                <span onClick={() => setfetchnavigate(item.id)}
                style={{display:"flex",justifyContent:"centre",width: "150px", height: "150px", objectFit: "cover",cursor:'pointer'}}>
                <img style = {{margin:10}}src={item.image} />
                </span>
                <span>
                  <h3>Used ingredients</h3>
                  {item.usedIngredients && item.usedIngredients.map((missedObj)=>(
                    <li>{missedObj.originalName}</li>
                  ))}
                  <h3>Unsed ingredients</h3>
                  {item.unusedIngredients && item.unusedIngredients.map((missedObj)=>(
                    <li>{missedObj.originalName}</li>
                  ))}
                  <h3>Missing ingredients</h3>
                  {item.missedIngredients && item.missedIngredients.map((missedObj)=>(
                    <li>{missedObj.originalName}</li>
                  ))}
                </span>
                <button style ={{fontSize:25,borderRadius:10, backgroundColor:'rgb(212, 135, 18)', cursor: 'pointer'}}onClick={() => saveRecipe(item.id, item.title,`https://api.spoonacular.com/recipes/${item.id}/information?includeNutrition=false&apiKey=7e512d08fbb14992a0d712854865b4eb`, item.image)}>
                  Save this recipe
                </button>
            </div>
        ))}
        </div>
          </div>
          <div stlye={{flex:1}}>
              <Searchbar/>
          </div>
        </div>
    </div>
);
};

export default MyPantry;
