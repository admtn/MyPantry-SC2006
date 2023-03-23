import {db} from "../../firebase"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import {useState, useEffect, handleView} from "react"
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
      desc: "",
      ingredients: [],
      steps: []
    })
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
        <h1>My saved recipes</h1>
       
         <button onClick={()=>{navigate("/pantry")}}>back </button> 
  
        <div className="recipes">
          { recipes.map((recipe, i) => (
            <div className="recipe" key={recipe.id}>
              <h3>{ recipe.title }</h3>
  
              <p dangerouslySetInnerHTML={{ __html: recipe.desc }}></p>
  
             <div>
                <h4>Ingredients</h4>
                <ul>
                  { recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ ingredient }</li>
                  ))}
                </ul>
  
                <h4>Steps</h4>
                <ol>
                  { recipe.steps.map((step, i) => (
                    <li key={i}>{ step }</li>
                  ))}
                </ol>
              </div>
  
              <div className="buttons">
                <button onClick={() => handleView(recipe.id)}>View { recipe.viewing ? 'less' : 'more' }</button>
                <button className="remove" onClick={() => removeRecipe(recipe.id)}>Remove</button>
              </div> 
            </div>
          ))}
        </div>
  
            
      </div>
    );
  }
  
  export default SavedRecipes;