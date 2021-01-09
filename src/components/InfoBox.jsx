import React from "react";
import "./InfoBox.css";

const InfoBox = ({ countries, selectedCountry, title, cases }) => {
  const numberWithCommas = cases => {
    return cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="info-card">
      <h1 className="info-heading">{numberWithCommas(cases)}</h1>
      <p className="info-text">{title}</p>
    </div>
  );
};

export default InfoBox;
