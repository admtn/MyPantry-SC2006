import React from "react";
import Update from "../../components/update/Update";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <>
        <Navbar />
        <div className="profileContainer">
          <Sidebar/>
          <Update />
          <Rightbar />
        </div>
      </>
    </div>
  );
};

export default Profile;