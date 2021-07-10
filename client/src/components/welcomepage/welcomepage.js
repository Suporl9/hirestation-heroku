import React from "react";
import "../CSS/globalcss.css";

import HireStationinfo from "./welcomepagecoponents/HireStationinfo";

import StuffDone from "./welcomepagecoponents/StuffDone";
import MetaData from "../layout/metaData";

function Welcomepage() {
  return (
    <>
      <MetaData title={`Welcome`} />

      <StuffDone />
      <HireStationinfo />
    </>
  );
}

export default Welcomepage;
