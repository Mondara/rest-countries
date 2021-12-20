import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Homepage.scss";

import { useFetch } from '../../utils/useFetch';
import { Card, Dropdown, SearchBar, SkeletonCard } from '../../components';


const URL_BASE = 'https://restcountries.com/v2';
const URL_FIELDS = 'name,population,region,capital,flags';

export const Homepage = () => {
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("ALL");
  const [isListOpen, setisListOpen] = useState(false);

  const [url, setUrl] = useState('')

  const regions = ["ALL", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const { loading, error, data } = useFetch(url);

  const filteredCountries = data.filter((country) =>
    country.name.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    if (region !== "ALL") {
      setUrl(`${URL_BASE}/region/${region}?fields=${URL_FIELDS}`);
    } else {
      setUrl(`${URL_BASE}/all?fields=${URL_FIELDS}`);
    }
  }, [region]);

  const updateInput = (input: string) => setInput(input);

  const toggleOpen = () => setisListOpen((prev: boolean) => !prev);

  const updateRegion = (id: number) => {
    setRegion(regions[id]);
    setisListOpen(false);
  };


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
          {filteredCountries && filteredCountries.map((country) => (
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
