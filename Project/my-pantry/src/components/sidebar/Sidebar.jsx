import {
    ExitToAppOutlined,
    HomeOutlined,
    ShoppingBasketOutlined,
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
  
    return (
      <div className="sidebar">
        <div className="sidebarbarWrapper">
          <MenuLink icon={<HomeOutlined />} text="MyPantry" />
          <MenuLink icon={<ShoppingBasketOutlined />} text="Nearby Stores" />
          <span onClick={handleLogout}>
            <MenuLink icon={<ExitToAppOutlined />} text="Logout" />
          </span>
        </div>
      </div>
    );
  };
  
  export default Sidebar;