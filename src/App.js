import React from "react";
import RatingChart from "./RatingChart";
import OnlineRatingChart from "./OnlineRatingChart";
import ReviewChart from "./ReviewChart";
import SentimentScore from "./SentimentScore";
import NetPromoter from "./NetPromoter";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    // <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
    //   <OnlineRatingChart />
    //   <ReviewChart />
    //   <SentimentScore />
    //   <NetPromoter />
    // </div>
    <Homepage />
  );
};

export default App;
