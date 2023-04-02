import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarCopy from "../../components/sidebar/Sidebar copy";
import Navbar from "../../components/navbar/Navbar";
import "./mypantry.scss";
import SearchBar from "../../components/Searchbar";
import Checkbox from "../../components/checkbox/Checkbox";
import InputBox from "../../components/inputbox/input";
import { useNavigate } from "react-router-dom";
import ShowIngredients from "./Ingredients"
import { doc, setDoc } from "firebase/firestore";
const db = require('../../firebase');

const MyPantry = () => {
  const apikey = '&apiKey=7e512d08fbb14992a0d712854865b4eb'
  
// 7e512d08fbb14992a0d712854865b4eb
// 4da76519f82242caa825c7db58bdf9f1
// 8b4379dc21bc4c1aa94cb4a62fdb130c

  const [Rec, setRec] = useState([])
  const [url,seturl] = useState('')
  const [RecInfo, setRecInfo] = useState([])
  const [RecipeInfoUrl,setRecipeInfoUrl] = useState('')
  const [value, setValue] = useState('');//search bar

  useEffect( () => {
    console.log("the new url is "+url)
    fetch(url)
    .then(response => response.json())
    .then(json => setRec(json))
  },[url],)

  function handleChange(event) {
    setValue(event.target.value);
  }

//   const addEntry = (id,img,titl) => {
//     setDoc(doc(db, "recipes"), {
//         id:id,
//         image: img,
//         title:titl
//     });
// }

async function run() {
  try {
      await setDoc(doc(database, `path`), objData)
  } catch (e) {
      console.error(e); // handle your error here
  } finally {
      console.log('Cleanup here'); // cleanup, always executed
  }
}

  function setfetchnavigate(recipeid) {
    // setRecipeInfoUrl('https://api.spoonacular.com/recipes/' + recipeid.toString() + '/information?includeNutrition=false' + apikey);
    fetch('https://api.spoonacular.com/recipes/' + recipeid.toString() + '/information?includeNutrition=false' + apikey)
    .then(response => response.json())
    .then(json => window.open(json.sourceUrl, "_blank"));
  }

  const buttonStyle2 = {
    color: 'black',
    borderRadius: '5px',
    // border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: 10,
    fontSize:20
  };

  return (
    <div>
      <Navbar />
      <div style={{display:"flex", flexDirection:"row"}}>
        <div style ={{flex:1}}>
          <SidebarCopy/>
          <div style={{borderWidth:1}}><ShowIngredients seturl={seturl} url={url}/></div>
          
        </div>
        <div style ={{flex:4}}>
        
          {/* <div>
              <label htmlFor="input-box">Enter ingredients:</label>
              <input
                type="text"
                id="input-box"
                value={value}
                onChange={handleChange}
              />
              <button onClick={()=>{
                // seturl('https://api.spoonacular.com/recipes/findByIngredients?ingredients=+apples,+flour,+sugar,&number=2'+value)
                setalling
                console.log(url)
                // navigate("/ingredients")
              }}>Search</button>
          </div> */}
          <div className="container">
          {Rec && Rec.map((item,index) =>(
            <div className ="item">
              <h5 style={{ maxWidth: '150px', margin:'30px' }}>{item.title}</h5>             
              {/* <button style={{ width: "10px", height: "15px" }}></button> */}
              <span onClick={() => setfetchnavigate(item.id)}
              style={{display:"flex",justifyContent:"centre",width: "150px", height: "150px", objectFit: "cover",cursor:'pointer'}}>
              <img style = {{margin:10}}src={item.image} />
              </span>
              <button onClick={()=>{console.log("saved")}
                // addEntry(item.id,item.img,'cook my ass')
              }>Save this recipe</button>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPantry;