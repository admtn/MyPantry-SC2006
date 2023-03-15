import React from "react";
import Update from "./../../components/update/Update";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "../profile/profile.scss"

const mypantry = () => {
  return (
    <div className="profile">
      <>
        <Navbar />
        <div className="profileContainer">
          <Sidebar />
        </div>
      </>
    </div>
  );
};

export default mypantry;