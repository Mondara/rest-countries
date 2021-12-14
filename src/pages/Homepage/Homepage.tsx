import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Homepage.scss";

import SearchBar from "../../components/search-bar/search-bar";
import Dropdown from "../../components/dropdown/dropdown";
import Card from "../../components/card/card";

function App() {
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("ALL");
  const [isListOpen, setisListOpen] = useState(false);
  const [countries, setCountries] = useState([]);

  const regions = ["ALL", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(input.toLowerCase()) ||
    country.name.official.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    if (region !== "ALL") {
      fetchCountries(
        `https://restcountries.com/v3.1/region/${region}?fields=name,population,region,capital,flags`
      );
    } else {
      fetchCountries(
        "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
      );
    }
  }, [region]);

  const fetchCountries = async (endpoint: string) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCountries(data.sort((a, b) => a.name.common > b.name.common));
      });
  };

  const updateInput = (input: string) => {
    setInput(input);
    console.log(input);
  };

  const updateRegion = (id: number) => {
    setRegion(regions[id]);
    setisListOpen(false);

    console.log(region);
  };

  const toggleOpen = () => {
    setisListOpen((prev: boolean) => !prev);
  };

  return (
    <div className="App">
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
          {filteredCountries.map((country) => (
            <Link to={`/Country/${country.name.common}`} key={country.name.common}>
              <Card
                key={country.name.common}
                name={country.name.common}
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

export default App;
