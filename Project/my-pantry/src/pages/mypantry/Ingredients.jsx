import React, { useEffect, useState } from "react";
import "./mypantry.scss";
import "./ingredients.scss";
import { collection, getDocs,getFirestore, docs, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ShowIngredients = () => {
    const navigate = useNavigate();

    //to fetch from firestore
    const [ingredients, setIngredients] = useState([]);
    const [theArray, setTheArray] = useState([]);
    const remove = (index) => {
      if (index !== -1) {
        setTheArray([
          ...theArray.slice(0, index),
          ...theArray.slice(index + 1)
        ]);
      }
    };

    useEffect(() => {
        const fetchIngredients = async () => {
          const db = getFirestore();
          const querySnapshot = await getDocs(collection(db, "ingredients")); 
          //QuerySnapshot object contains an array of QueryDocumentSnapshot objects, each of which represents a single document in the collection or query results.
          const data = querySnapshot.docs.map((doc) => doc.data());
          setIngredients(data);
        };
    
        fetchIngredients();
      }, []);

      //to toggle button
      const [isOn, setIsOn] = useState(false);
      const handleToggle = () => {
        setIsOn(!isOn);
      };

      function handleChange(event) {
        setValue(event.target.value);
      }



      const [value, setValue] = useState('');//search bar

      //button styling
      const buttonStyle = {
        color: 'black',
        padding: '10px 20px',
        borderRadius: '5px',
        // border: 'none',
        cursor: 'pointer',
        margin: 10,
        fontSize:20
      };
    
  return (
    <div>
        <div>
          <div>{theArray && theArray.map((i,index)=>(
            // <div style={{borderWidth:10,flexDirection:'row'}}>
            // <span style={{fontSize:30}}>{i} , </span>
            <button onClick={()=>{remove(index)}} style={buttonStyle}>{i}</button>
            // </div>
          ))}
          </div>

          <button onClick={()=>{setTheArray([])}} style={buttonStyle}>clear</button>
          

          <div>
            <label htmlFor="input-box">Enter ingredients:</label>
            <input
              type="text"
              id="input-box"
              value={value}
              onChange={handleChange}
            />
            <button onClick={()=>{
              // seturl('https://api.spoonacular.com/recipes/findByIngredients?ingredients=+apples,+flour,+sugar,&number=2'+value)
              navigate("/pantry")
            }}>Search</button>
          </div>

        </div>

        <div>
        {ingredients && ingredients.map((item,id) => (
          <button onClick={ () => {setTheArray(theArray => [...theArray, item.name])
            console.log(theArray)
          }
          }><span style={isOn?buttonStyle:{fontSize:30}}>{item.name}</span></button>
          // <button><span style={{fontSize:30}}>{item.name}</span></button>\
        ))}
        
        </div>
    </div> 
  );w
};

export default ShowIngredients;
