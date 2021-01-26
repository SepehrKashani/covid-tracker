import "./App.css";

import React, { useState, useEffect } from "react";

import InfoBox from "./components/InfoBox";
import Fade from 'react-reveal/Fade'
import Pulse from 'react-reveal/Pulse'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            id: country.countryInfo._id,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
            cases: country.cases,
            deaths: country.deaths,
            recovered: country.recovered,
            population: country.population,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async e => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  const RenderCountries = countries.map((country, i) => {
    return (
      <>
        <option key={i} value={country.value}>
          {country.name}
        </option>
      </>
    );
  });

  return (
    <div className="parent-wrapper">
     <Pulse>
     <img
        src="/images/left-side.png"
        alt=""
        style={{ position: "absolute", top: "45%", left: 0, height: 150 }}
      />
      <img
        src="/images/right-bottom.png"
        alt=""
        style={{ position: "absolute", bottom: 50, right: 0, width: 226 }}
      />
     </Pulse>
     
      <div className="wrapper">
        <div className="header">
          <h1>Covid Tracker</h1>
          <select
            className="select-input"
            value={country}
            onChange={onCountryChange}
          >
            <option value="worldwide">worldwide</option>

            {RenderCountries}
          </select>
        </div>
      
        <div className="main-section">
          <h1 className="main-header">COVID-19</h1>
          <p className="main-text">
            Coronavirus disease (COVID-19) is an infectious disease caused by a
            newly discovered coronavirus. Most people who fall sick with
            COVID-19 will experience mild to moderate symptoms and recover
            without special treatment.
          </p>
          <Fade top>
            <div className="info-wrapper"> 
            <InfoBox
              className="info-card"
              title="Total cases"
              cases={countryInfo.cases}
              style={{ borderTop: "10px solid #282C34" }}
            />
            <InfoBox
              className="info-card"
              title="Recovered cases"
              cases={countryInfo.recovered}
            />
            <InfoBox
              className="info-card"
              title="Total Deaths"
              cases={countryInfo.deaths}
            />
            <InfoBox
              className="info-card"
              title="Population"
              cases={countryInfo.population}
            />
          </div>
          </Fade> 
        </div>
      </div>
    </div>
  );
}

export default App;
