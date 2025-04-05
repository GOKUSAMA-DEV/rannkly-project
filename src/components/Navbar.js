import React from "react";
import "../styles/navbar.scss";
import searchIcon from "../assets/image/searchIcon.png";
import bellIcon from "../assets/image/bellIcon.png";
import profileIcon from "../assets/image/profileIcon.png";

const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="name-box">
        <p>Good Morning, Nidaant</p>
      </div>
      <div className="right-container">
        <img className="com-icon" src={searchIcon} alt="" />
        <img className="com-icon" src={bellIcon} alt="" />
        <div className="profile-container">
          <img className="profile-image" src={profileIcon} alt="" />
          <div className="content-con">
            <p className="name-text">Nidaant</p>
            <p className="email-text">nidaant@gmail.com</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
