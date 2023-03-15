import React from "react";
import Widget from "./../widget/Widget";
import "./rightbar.scss";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <Widget type="user" />
        <Widget type="popular" />
        <Widget type="editor" />
      </div>
    </div>
  );
};

export default Rightbar;