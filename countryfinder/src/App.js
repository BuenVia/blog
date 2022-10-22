import axios from "axios";
import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [countryData, setCountryData] = useState(null);
  const [country, setCountry] = useState("");

  const url = `https://restcountries.com/v2/name/${country}`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios
        .get(url)
        .then((res) => {
          setCountryData(res.data[0]);
          console.log(res.data[0]);
        })
        .catch((err) => console.log(err));
      setCountry("");
    }
  };

  return (
    <div className="App">
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        onKeyDown={searchLocation}
        placeholder="Type country..."
        autoFocus
        type="text"
      />
      {countryData ? (
        <div className="card">
          {countryData ? (
            <img src={countryData.flags.svg} className="flag-img" alt="" />
          ) : null}

          <div className="details-element">
            {countryData ? (
              <p>
                <span className="bold">Country:</span> {countryData.name}
              </p>
            ) : null}
            {countryData ? (
              <p>
                <span className="bold">Continent:</span> {countryData.region}
              </p>
            ) : null}
            {countryData ? (
              <p>
                <span className="bold">Capital:</span> {countryData.capital}
              </p>
            ) : null}
            {countryData ? (
              <p>
                <span className="bold">Language:</span>{" "}
                {countryData.languages[0].name}
              </p>
            ) : null}
            {countryData ? (
              <p>
                <span className="bold">Population:</span>{" "}
                {(countryData.population / 1000000).toFixed()} million
              </p>
            ) : null}
            {countryData ? (
              <p>
                <span className="bold">Currency:</span>{" "}
                {countryData.currencies[0].name}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
