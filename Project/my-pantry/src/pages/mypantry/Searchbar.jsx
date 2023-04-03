import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./List"


function Searchbar() {

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
      };



  return (
    <div className="main">
      <h2>Add ingredients to pantry</h2>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <List input={inputText} />
    </div>
  );
}

export default Searchbar;