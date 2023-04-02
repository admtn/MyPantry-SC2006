import React from "react";
import "./menuLink.scss";

const MenuLink = ({ icon, text }) => {
  return (
    <div className="menulink">
      {icon}
      <span className="menuLinkText">{text}</span>
      <span className="menuLinkTextName">
        {" "}
        {text === "Logout"}
      </span>
    </div>
  );
};

export default MenuLink;