/* eslint-disable react/prop-types */
import React, { useState } from "react";
import searchsvg from "../welcomepage/welcomepagecoponents/imgs/search.svg";

function Search({ history }) {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="servicesearchfield">
        <input
          className="inputstuff"
          placeholder="Find Services"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <button className="stuffsearchbtn1">
          <img src={searchsvg} alt="search" className="searchsvg" />
        </button>
      </div>
    </form>
  );
}

export default Search;
