import {db} from "../../firebase"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
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
       
         <button className="back" onClick={()=>{navigate("/mypantry")}}>back </button> 
  
        <div className="recipes">
          
          { recipes.map((recipe, i) => (
            <div className="recipe" key={recipe.id}>
              <h3>{ recipe.title }</h3>
              

  
             <div>
             { <a href= {recipe.url} target="_blank" rel="noreferrer">                
                 <img src={recipe.image} 
                 
                 />
                 </a> }

              </div>
  
              <div className="buttons">
                <button className="remove" onClick={() => removeRecipe(recipe.id)}>Remove</button>
              </div> 
            </div>
          ))}
        </div>
  
            
      </div>
    );
  }
  
  export default SavedRecipes;