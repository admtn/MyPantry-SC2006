import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./mypantry.scss";
import SearchBar from "../../components/Searchbar";
import Checkbox from "../../components/checkbox/Checkbox";
import InputBox from "../../components/inputbox/input";

const MyPantry = () => {

  const [Ingr, setIngr] = useState([])
  const [url,seturl] = useState('https://edamam-recipe-search.p.rapidapi.com/search?q=steak')
  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b66fbaaab8msh010a648f16505e6p1e88f1jsn1d336377b0f2',
        'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    }
};

    useEffect( () => {
      fetch(url, options)
      .then(response => response.json())
      .then(json => setIngr(json))
    },[url])

  return (
    <div>
      <Navbar />
      <div style={{display:"flex", flexDirection:"row"}}>
        <div style ={{flex:1}}><Sidebar/></div>
        <div style ={{flex:4}}>
          <InputBox/>
          <div className="container">
          {Ingr.hits && Ingr.hits.map((item,index) =>(
            <div className ="item">
              <h5>{item.recipe.label}</h5>
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