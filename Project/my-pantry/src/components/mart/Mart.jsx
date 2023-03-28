import React from "react";
import "./mart.scss";
import SearchMart from "../SearchMart";

// import { storage } from "../../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useNavigate } from "react-router-dom";

//import { ScriptTag } from "react-script-tag";
// const Loc = props => (
// <script type="text/javascript" src="/../../components/location/Location.js" />
// )

const Mart = () => {
  
  return (
    <div className="mart">
      <div className="martWrapper">
        <h3 className="martTitle">Marts Near You</h3>
        <div className="martContainer">
            {/* <button className="curLocationButton" onClick={()=>{CurLocation}}>
              Current Location
            </button> */}
            <SearchMart />
            {/* <Loc className="loc"/> */}
        </div>
      </div>
    </div>
  );
};

export default Mart;