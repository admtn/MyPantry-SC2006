import { useContext } from "react";
import {
  BrowserRouter,
  Route,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Mypantry from './pages/mypantry/mypantry';
import SavedRecipes from "./pages/savedRecipe/SavedRecipes"


function App() {
  const {currentUser}= useContext(AuthContext);
  const AuthRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/mypantry",
      element: <Mypantry/>,
    },
  
    {
      path: "/savedRecipe", 
      element: (
          <AuthRoute>
          <SavedRecipes />
          </AuthRoute>
      ),
    },
    {
      path: "/", //default path is to profile
      element: (
          <AuthRoute>
          <Profile />
          </AuthRoute>
      ),
    }
  ]);

  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;