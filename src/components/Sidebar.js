import React from "react";
import "../styles/sidebar.scss";
import rannklyLogo from "../assets/image/rannklyLogo.png";
import leftArrowIcon from "../assets/image/leftArrowIcon.png";
import dashIcon from "../assets/image/dashIcon.png";
import anaIcon from "../assets/image/anaIcon.png";
import settingIcon from "../assets/image/settingIcon.png";
import socialIcon from "../assets/image/socialIcon.png";
import surveyIcon from "../assets/image/surveyIcon.png";
import notDashIcon from "../assets/image/notDashIcon.png";

const Sidebar = () => {

  return (
    <div className="parent-sidebar">
      <div className="inner-sidebar">
        <div className="sidebar-header">
          <img className="main-logo" src={rannklyLogo} alt="" />
          <img className="arrow-logo" src={leftArrowIcon} alt="" />
        </div>
        <div className="menu-container">
          <p className="main-title">MAIN</p>
          <div className="inner-menu-container">
            <div className="menu-options active-filter">
              <div className="menu-image-box active-filter">
                <img src={dashIcon} alt="" />
              </div>
              <p className="menu-title">Dashboard</p>
            </div>
            <div className="menu-options">
              <div className="menu-image-box">
                <img src={anaIcon} alt="" />
              </div>
              <p className="menu-title">Analytics</p>
            </div>
            <div className="menu-options">
              <div className="menu-image-box">
                <img src={settingIcon} alt="" />
              </div>
              <p className="menu-title">Settings</p>
            </div>
            <div className="menu-options">
              <div className="menu-image-box">
                <img src={socialIcon} alt="" />
              </div>
              <p className="menu-title">Social Media</p>
            </div>
            <div className="menu-options">
              <div className="menu-image-box">
                <img src={surveyIcon} alt="" />
              </div>
              <p className="menu-title">Surveys</p>
            </div>
          </div>
        </div>
        <div className="menu-container">
          <p className="main-title">Management</p>
          <div className="inner-menu-container">
            <div className="menu-options">
              <div className="menu-image-box">
                <img src={notDashIcon} alt="" />
              </div>
              <p className="menu-title">Dashboard</p>
            </div>
            <div className="menu-options">
              <div className="menu-image-box">
                <img src={anaIcon} alt="" />
              </div>
              <p className="menu-title">Analytics</p>
            </div>
            <div className="menu-options">
              <div className="menu-image-box">
                <img src={settingIcon} alt="" />
              </div>
              <p className="menu-title">Settings</p>
            </div>
            <div className="menu-options">
              <div className="menu-image-box">
                <img src={socialIcon} alt="" />
              </div>
              <p className="menu-title">Social Media</p>
            </div>
            <div className="menu-options">
              <div className="menu-image-box">
                <img src={surveyIcon} alt="" />
              </div>
              <p className="menu-title">Surveys</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
