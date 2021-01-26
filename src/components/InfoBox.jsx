import React from "react";
import "./InfoBox.css";
import numeral from 'numeral'

const InfoBox = ({title, cases }) => {
  
const formatNumbers = (cases) => numeral((String(cases))).format('0,0')

  return (
    <div className="info-card">
      <h1 className="info-heading">{formatNumbers(cases)}</h1>
      <p className="info-text">{title}</p>
    </div>
  );
};

export default InfoBox;
