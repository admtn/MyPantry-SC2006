import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./widget.scss";

const Widget = ({ type }) => {
  const { currentUser } = useContext(AuthContext);
  const title =
    type === "user"
      ? "Recommended for " + currentUser.displayName
      : type === "popular"
      ? "Popular on MyPantry"
      : "People's choice";

  const img =
    type === "user"
      ? "/assets/zhongxina.jpg"
      : type === "popular"
      ? "/assets/zhongxina.jpg"
      : "/assets/ydoe.jpg";

  return (
    <div className="widget">
      <span className="rightTitle">{title}</span>
      <img className="rightImg" src={img} alt="" />
    </div>
  );
};

export default Widget;