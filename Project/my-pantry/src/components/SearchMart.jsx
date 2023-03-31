import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import Location from "../components/location/Location";
import "./searchmart.scss";

const SearchMart = () => {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <h1>Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Enter a location"
        />
      </div>
      {/* <Location input={inputText} /> */}
      <Location />
    </div>
  );
}

export default SearchMart;