import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./mypantry.scss";
import SearchBar from "../../components/Searchbar";
import Checkbox from "../../components/checkbox/Checkbox";
import InputBox from "../../components/inputbox/input";

const MyPantry = () => {
  const apikey = '&apiKey=8b4379dc21bc4c1aa94cb4a62fdb130c'
  
// 7e512d08fbb14992a0d712854865b4eb
// 4da76519f82242caa825c7db58bdf9f1
// 8b4379dc21bc4c1aa94cb4a62fdb130c

  const [Rec, setRec] = useState([])
  const [url,seturl] = useState('https://api.spoonacular.com/recipes/findByIngredients?ingredients=+apples,+flour,+sugar,&number=2'+apikey)

  const [RecInfo, setRecInfo] = useState([])
  const [RecipeInfoUrl,setRecipeInfoUrl] = useState('')

  const [value, setValue] = useState('');//search bar

  function handleChange(event) {
    setValue(event.target.value);
  }

  function setfetchnavigate(recipeid) {
    setRecipeInfoUrl('https://api.spoonacular.com/recipes/' + recipeid.toString() + '/information?includeNutrition=false' + apikey);
    fetch('https://api.spoonacular.com/recipes/' + recipeid.toString() + '/information?includeNutrition=false' + apikey)
    .then(response => response.json())
    .then(json => window.open(json.sourceUrl, "_blank"));
  }

    useEffect( () => {
      fetch(url)
      .then(response => response.json())
      .then(json => setRec(json))
    },[url],)

    // useEffect( () => {
    //   fetch(RecipeInfoUrl)
    //   .then(response => response.json())
    //   .then(json => setRecInfo(json))
    // },[RecipeInfoUrl])


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
              <h5 style={{ maxWidth: '150px', margin:'30px' }}>{item.title}</h5>             
              {/* <button style={{ width: "10px", height: "15px" }}></button> */}
              <span onClick={() => setfetchnavigate(item.id)}
              style={{display:"flex",justifyContent:"centre",width: "150px", height: "150px", objectFit: "cover"}}>
              <img src={item.image} />
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