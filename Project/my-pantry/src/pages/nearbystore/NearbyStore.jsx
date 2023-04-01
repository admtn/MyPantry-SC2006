import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./nearbyStore.scss";

const NearbyStore = () => {
  return (
    <div className="store">
      <>
        <Navbar />
        <div className="storeContainer">
          <Sidebar />
        </div>
      </>
    </div>
  );
};

export default NearbyStore;