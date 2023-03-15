import { useContext } from "react";
import {
  BrowserRouter,
  Route,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Mypantry from './pages/mypantry/mypantry';

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
      path: "/",
      element: (
          <AuthRoute>
          <Home />
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