import React from "react";
import Update from "../../components/update/Update";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <>
        <Navbar />
        <div className="profileContainer">
          <Sidebar/>
          <Update />
        </div>
      </>
    </div>
  );
};

export default Profile;