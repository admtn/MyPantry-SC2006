import {db} from "../../firebase"
import {useState, useEffect} from "react"
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc
  } from "firebase/firestore"
import './savedrecipes.scss';
import { useNavigate } from "react-router-dom";


  
  function SavedRecipes() {
    const navigate=useNavigate();
    const [recipes, setRecipes] = useState([])
    const [form, setForm] = useState({
      title: "",
      image: "",
      url: ""
      
    })
    const apikey = '&apiKey=7e512d08fbb14992a0d712854865b4eb'

    function setfetchnavigate(recipeid) {
      fetch('https://api.spoonacular.com/recipes/' + recipeid.toString() + '/information?includeNutrition=false' + apikey)
      .then(response => response.json())
      .then(json => window.open(json.spoonacularSourceUrl, "_blank"));
    }
    const [popupActive, setPopupActive] = useState(false)
  
    const recipesCollectionRef = collection(db, "recipes")
  
    //extract only the important data from firebase
    useEffect(() => {
      onSnapshot(recipesCollectionRef, snapshot => {
        setRecipes(snapshot.docs.map(doc => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data()
          }
        }))
      })
    }, [])
  
  
     const removeRecipe = id => {
      deleteDoc(doc(db, "recipes", id))
     }
  
    return (
      <div className="SavedRecipes">
        <div className="title">
        <>My saved recipes</>
        </div>
       
         <button className="back" onClick={()=>{navigate("/pantry")}}>back </button> 
  
        <div className="recipes">
          
          { recipes.map((recipe, i) => (
            <div className="recipe" key={recipe.id}>
              <h3>{ recipe.title }</h3>
              

  
             <div>
              <span style ={{cursor:'pointer'}}onClick={() => setfetchnavigate(recipe.id)}>
                <img src={recipe.image}/>
              </span>
              </div>
  
              <div className="buttons">
                <button className="remove" onClick={() => removeRecipe(recipe.id.toString())}>Remove</button>
              </div> 
            </div>
          ))}
        </div>
  
            
      </div>
    );
  }
  
  export default SavedRecipes;