import React from "react";
import Update from "./../../components/update/Update";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "../home/home.scss"

const mypantry = () => {
  return (
    <div className="home">
      <>
        <Navbar />
        <div className="homeContainer">
          <Sidebar />
        </div>
      </>
    </div>
  );
};

export default mypantry;