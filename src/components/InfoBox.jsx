import React from "react";
import "./InfoBox.css";

const InfoBox = ({ countries, selectedCountry, title, cases }) => {
  return (
    <div className="info-card">
      <h1 className="info-heading">{cases}</h1>
      <p className="info-text">{title}</p>
    </div>
  );
};

export default InfoBox;
