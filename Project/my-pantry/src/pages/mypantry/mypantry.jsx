import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./mypantry.scss";
import SearchBar from "../../components/Searchbar";
import Checkbox from "../../components/checkbox/Checkbox";
import InputBox from "../../components/inputbox/input";

const MyPantry = () => {
  const apikey = '&apiKey=7e512d08fbb14992a0d712854865b4eb'
  const [Rec, secRec] = useState([])
  const [url,seturl] = useState('https://api.spoonacular.com/recipes/findByIngredients?ingredients=+apples,+flour,+sugar,&apiKey=7e512d08fbb14992a0d712854865b4eb')

  const [RecInfo, setRecInfo] = useState([])
  const [RecipeInfoUrl,setRecipeInfoUrl] = useState('https://api.spoonacular.com/recipes/716429/information?includeNutrition=false')

  const [value, setValue] = useState('');//search bar

  function handleChange(event) {
    setValue(event.target.value);
  }

    useEffect( () => {
      fetch(url)
      .then(response => response.json())
      .then(json => secRec(json))
    },[url],Rec)

    useEffect( () => {
      fetch(RecipeInfoUrl)
      .then(response => response.json())
      .then(json => setRecInfo(json))
    },[RecipeInfoUrl],RecInfo)

  return (
    <div>
      <Navbar />
      <div style={{display:"flex", flexDirection:"row"}}>
        <div style ={{flex:1}}><Sidebar/></div>
        <div style ={{flex:4}}>
          <div>
              <label htmlFor="input-box">Enter text:</label>
              <input
                type="text"
                id="input-box"
                value={value}
                onChange={handleChange}
              />
              <button onClick={()=>{
                seturl('https://edamam-recipe-search.p.rapidapi.com/search?q='+value)
              }}>Search</button>
          </div>
          <div className="container">
          {Rec && Rec.map((item,index) =>(
            <div className ="item">
              <div className ="item">
              { () =>{setRecipeInfoUrl('https://api.spoonacular.com/recipes/'+Rec.id+'/information?includeNutrition=false'+apikey)
                  fetch(RecipeInfoUrl)
                  .then(response => response.json())
                  .then(json => setRecInfo(json))}}
              <h5>{item.title}</h5>
              <a href={RecInfo.sourceUrl}>Click here for more information</a>
              </div>
              {/* <button style={{ width: "10px", height: "15px" }}></button> */}
              <span onClick={() => console.log('you clicked!')}>
              <img src={item.image} width ="100" height = "100"/>
              </span>
              <Checkbox/>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPantry;