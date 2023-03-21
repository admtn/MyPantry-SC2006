import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Mart from "../../components/mart/Mart";
import "./nearbyStore.scss";

const NearbyStore = () => {
  return (
    <div className="store">
      <>
        <Navbar />
        <div className="storeContainer">
          <Sidebar />
          <Mart/>
        </div>
      </>
    </div>
  );
};

export default NearbyStore;