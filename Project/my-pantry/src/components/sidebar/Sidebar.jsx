import {
  ExitToAppOutlined,
  LocalDiningOutlined,
  ShoppingBasketOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import MenuLink from "../menuLink/MenuLink";
import "./sidebar.scss";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handlePantry = (e) => {
    navigate("/pantry");
  };
  const handleStores =(e) => {
    navigate("/store")
  }
  const handleProfile =(e) => {
    navigate("/")
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <span onClick={handlePantry}>
        <MenuLink icon={<LocalDiningOutlined/>} text="MyPantry" />
        </span>
        <span onClick={handleStores}>
        <MenuLink icon={<ShoppingBasketOutlined/>} text="Nearby Stores" />
        </span>
        <span onClick={handleProfile}>
        <MenuLink icon={<AccountCircleOutlined/>} text="Profile" />
        </span>
        <span onClick={handleLogout}>
          <MenuLink icon={<ExitToAppOutlined/>} text="Logout" />
        </span>
      </div>
    </div>
  );
};

export default Sidebar;