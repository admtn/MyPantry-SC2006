import React from "react";
import "./mart.scss";
//import CurLocation from "../../components/curLocation/CurLocation";

import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import CurLocation from "../curLocation/CurLocation";

const Mart = () => {
  
  return (
    <div className="mart">
      <div className="martWrapper">
        <h3 className="martTitle">Marts Near You</h3>
        <div className="martContainer">
            {/* <button className="curLocationButton" onClick={()=>{CurLocation}}>
              Current Location
            </button> */}
            {/* <CurLocation /> */}
        </div>
      </div>
    </div>
  );
};

export default Mart;