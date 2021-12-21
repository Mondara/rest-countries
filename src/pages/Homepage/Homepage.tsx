import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Homepage.scss";

import { getCountry } from '../../utils/fetch';
import { Card, Dropdown, SearchBar, SkeletonCard, Errorpage } from '../../components';

export const Homepage = () => {
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("ALL");
  const [isListOpen, setisListOpen] = useState(false);

  const regions = ["ALL", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const { loading, error, data } = getCountry(region);

  const filteredCountries = data.filter((country) =>
    country.name.toLowerCase().includes(input.toLowerCase())
  );

  const updateInput = (input: string) => setInput(input);

  const toggleOpen = () => setisListOpen((prev: boolean) => !prev);

  const updateRegion = (id: number) => {
    setRegion(regions[id]);
    setisListOpen(false);
  };

  if (error) return <Errorpage error="Error..." />

  return (
    <div className="homepage-container">

      <main>
        <div className="user-inputs">
          <SearchBar input={input} onChange={updateInput} />
          <Dropdown
            title="Filter by Region"
            list={regions}
            selected={region}
            select={updateRegion}
            open={isListOpen}
            toggleOpen={toggleOpen}
          />
        </div>

        <div className="cards-container">
          {loading && [...Array(15).keys()].map((_, indx) => <SkeletonCard key={indx} />)}
          {!loading && filteredCountries && filteredCountries.map((country) => (
            <Link to={`/Country/${country.name}`} key={country.name}>
              <Card
                key={country.name}
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
                flags={country.flags.svg}
              />
            </Link>
          ))}
        </div>

      </main>

    </div>

  );
}
