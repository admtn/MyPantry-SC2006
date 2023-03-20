import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./mypantry.scss";
import SearchBar from "../../components/Searchbar";
import Checkbox from "../../components/checkbox/Checkbox";
import InputBox from "../../components/inputbox/input";

const MyPantry = () => {

  const [Ingr, setIngr] = useState([])
  const [url,seturl] = useState('https://edamam-recipe-search.p.rapidapi.com/search?q=egg')
  const [value, setValue] = useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }
  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '', //enter key here
        'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    }
};

    useEffect( () => {
      fetch(url, options)
      .then(response => response.json())
      .then(json => setIngr(json))
    },[url],Ingr)

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
          {Ingr.hits && Ingr.hits.map((item,index) =>(
            <div className ="item">
              <div className ="item">
              <h5>{item.recipe.label}</h5>
              <a href={item.recipe.url}>Click here for more information</a>
              </div>
              {/* <button style={{ width: "10px", height: "15px" }}></button> */}
              <span onClick={() => console.log('you clicked!')}>
              <img src={item.recipe.image} width ="100" height = "100"/>
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