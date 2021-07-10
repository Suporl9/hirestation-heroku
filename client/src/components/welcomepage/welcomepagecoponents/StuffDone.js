import React from "react";
import "../welcomepagecoponents/css/welcomestyles.css";
import logosvg from "../welcomepagecoponents/imgs/logosvg.svg";
import searchsvg from "../welcomepagecoponents/imgs/search.svg";
export default function StuffDone() {
  return (
    <div className="StuffDone">
      <div className="h1p1search">
        <h1 className="h1stuff" style={{ fontWeight: "bold" }}>
          Get your service done from 5$
        </h1>
        <p className="p1stuff">
          Browse through many micro services.Choose one you trust and pay as you
          go!!
        </p>
        <div className="searchandinputfield">
          <input className="inputstuff" placeholder="Enter your Email*"></input>
          <button className="stuffsearchbtn">
            <img src={searchsvg} alt="search" className="searchsvg" />
          </button>
        </div>
      </div>
      <div className="logosvg">
        <img src={logosvg} alt="logosvg" className="logoimg" />
      </div>
    </div>
  );
}
