import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./viewSavedRecipes.scss";

const ViewSavedRecipes = () => {
  return (
    <div className="savedRecipes">
      <>
        <Navbar />
        <div className="savedRecipesContainer">
          <Sidebar />
        </div>
      </>
    </div>
  );
};

export default ViewSavedRecipes;