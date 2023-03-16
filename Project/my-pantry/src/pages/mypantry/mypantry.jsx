import React from "react";
import Update from "../../components/update/Update";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./mypantry.scss";
import SearchBar from "../../components/Searchbar";

const MyPantry = () => {
  return (
    <div>
      <Navbar />
      <div style={{display:"flex", flexDirection:"row"}}>
        <div style ={{flex:1}}><Sidebar/></div>
        <div style ={{flex:4}}>
          <SearchBar/>
          <h2>hello all</h2>
        </div>
        
      </div>
      

    </div>
  );
};

export default MyPantry;