import React from "react";
import Navbar from "../components/Navbar";
import "../styles/homepage.scss";
import gridIcon from "../assets/image/gridIcon.png";
import threeDotIcon from "../assets/image/threeDotIcon.png";
import filterIcon from "../assets/image/filterIcon.png";
import dragIcon from "../assets/image/dragIcon.png";
import OnlineRatingChart from "../OnlineRatingChart";
import ReviewChart from "../ReviewChart";
import SentimentScore from "../SentimentScore";
import NetPromoter from "../NetPromoter";

const Homepage = () => {
  return (
    <div className="parent-home-container">
      <div className="inner-home-container">
        <div className="sidebar-menu"></div>
        <div className="right-menu">
          <Navbar />
          <div className="header-view">
            <div className="bead-first">
              <p className="normal-text">Dashboards / </p>
              <p className="black-text" style={{ marginLeft: "5px" }}>
                {" "}
                Default
              </p>
            </div>
            <div className="right-side-menu">
              <div className="monthly-filter-container">
                <p className="month-select">Monthly</p>
                <p className="month-select">Quarterly</p>
                <p className="month-select">Yearly</p>
              </div>
              <div className="widgets-button">
                <img src={gridIcon} className="image-icon" alt="" />
                <p className="label-text">Widgets</p>
              </div>
              <div className="widgets-button">
                <img src={filterIcon} className="image-icon" alt="" />
                <p className="label-text">Filter</p>
              </div>
            </div>
          </div>
          <div className="graph-container">
            <div className="first-row-graph">
              <div className="com-graph-box">
                <div className="top-row">
                  <div className="inner-top-first">
                    <input type="checkbox" />
                    <p className="title-top">Online&nbsp;Rating&nbsp;Index</p>
                  </div>
                  <div className="inner-top-last">
                    <img src={threeDotIcon} className="inner-top-last" alt="" />
                  </div>
                </div>
                <div className="main-graph-container">
                  <OnlineRatingChart />
                  <div className="expand-icon">
                    <img className="drag-icon" src={dragIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="com-graph-box">
                <div className="top-row">
                  <div className="inner-top-first">
                    <input type="checkbox" />
                    <p className="title-top">Responded&nbsp;&&nbsp;Unresponded&nbsp;Reviews</p>
                  </div>
                  <div className="inner-top-last">
                    <img src={threeDotIcon} className="inner-top-last" alt="" />
                  </div>
                </div>
                <div className="main-graph-container">
                  <ReviewChart />
                  <div className="expand-icon">
                    <img className="drag-icon" src={dragIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="com-graph-box">
                <div className="top-row">
                  <div className="inner-top-first">
                    <input type="checkbox" />
                    <p className="title-top">Sentiment&nbsp;Score</p>
                  </div>
                  <div className="inner-top-last">
                    <img src={threeDotIcon} className="inner-top-last" alt="" />
                  </div>
                </div>
                <div className="main-graph-container">
                  <SentimentScore />
                  <div className="expand-icon">
                    <img className="drag-icon" src={dragIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="second-row-graph">
              <div className="com-second-graph-box">
                <div className="top-row">
                  <div className="inner-top-first">
                    <input type="checkbox" />
                    <p className="title-top">Net&nbsp;Promotor&nbsp;Score</p>
                  </div>
                  <div className="inner-top-last">
                    <img src={threeDotIcon} className="inner-top-last" alt="" />
                  </div>
                </div>
                <div className="main-graph-container" style={{ marginLeft: "-15rem" }}>
                  <NetPromoter />
                  <div className="expand-icon" style={{ right: "-120px" }}>
                    <img className="drag-icon" src={dragIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="com-second-graph-box">
                <div className="top-row">
                  <div className="inner-top-first">
                    <input type="checkbox" />
                    <p className="title-top">Ratings&nbsp;&&nbsp;Reviews</p>
                  </div>
                  <div className="inner-top-last">
                    <img src={threeDotIcon} className="inner-top-last" alt="" />
                  </div>
                </div>
                <div className="main-graph-container" style={{ marginLeft: "-15rem" }}>
                  <NetPromoter />
                  <div className="expand-icon" style={{ right: "-120px" }}>
                    <img className="drag-icon" src={dragIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
