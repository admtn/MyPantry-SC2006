import { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import MyPantry from "./pages/mypantry/MyPantry";
import NearbyStore from "./pages/nearbystore/NearbyStore";

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
      path: "/", //to profile
      element: (
          <AuthRoute>
          <Profile />
          </AuthRoute>
      ),
    },
    {
      path: "/pantry",
      element: (
        <AuthRoute>
        <MyPantry />,
        </AuthRoute>
      ),
    },
    {
      path: "/store",
      element: (
        <AuthRoute>
        <NearbyStore />,
        </AuthRoute>
      ),
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;