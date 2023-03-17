<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./mypantry.scss";
import SearchBar from "../../components/Searchbar";
import Checkbox from "../../components/checkbox/Checkbox";

const MyPantry = () => {

  const [Ingr, setIngr] = useState([])
  const [url,seturl] = useState('http://localhost:3000/ingredients')

    useEffect( () => {
      fetch(url)
      .then(response => response.json())
      .then(json => setIngr(json))
    },[url])


  return (
    <div>
      <Navbar />
      <div style={{display:"flex", flexDirection:"row"}}>
        <div style ={{flex:1}}><Sidebar/></div>
        <div style ={{flex:4}}>
          <SearchBar/>
          <div className="container">
          {Ingr.map((item,index) =>(
            <div className ="item">
              <h2>{item.name}</h2>
              {/* <button style={{ width: "10px", height: "15px" }}></button> */}
              <span onClick={() => console.log('you clicked!')}>
              <img src={item.image} width ="100" height = "100"/>
              </span>
              <Checkbox/>
            </div>
          ))}
          </div>
=======
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./mypantry.scss";

const MyPantry = () => {
  return (
    <div className="pantry">
      <>
        <Navbar />
        <div className="pantryContainer">
          <Sidebar />
>>>>>>> main
        </div>
      </div>
    </div>
  );
};

export default MyPantry;