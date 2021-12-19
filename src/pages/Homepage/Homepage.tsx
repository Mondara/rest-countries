import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Homepage.scss";

import SearchBar from "../../components/search-bar/search-bar";
import Dropdown from "../../components/dropdown/dropdown";
import Card from "../../components/card/card";

import { Country } from "../../Interfaces/Interfaces";


const URL_BASE = 'https://restcountries.com/v2';
const URL_FIELDS = 'name,population,region,capital,flags';

function App() {
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("ALL");
  const [isListOpen, setisListOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [countries, setCountries] = useState<Country[]>([]);

  const regions = ["ALL", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    if (region !== "ALL") {
      getCountries(`${URL_BASE}/region/${region}?fields=${URL_FIELDS}`);
    } else {
      getCountries(`${URL_BASE}/all?fields=${URL_FIELDS}`);
    }
  }, [region]);

  async function getCountries(URL: string) {
    fetch(URL)
      .then(response => response.json())
      .then(data => setCountries(data.sort((a, b) => a.name > b.name)))
      .catch(error => console.log('Error fetching country data: ', error))
      .finally(() => setLoading(false))
  }

  const updateInput = (input: string) => setInput(input);

  const toggleOpen = () => setisListOpen((prev: boolean) => !prev);

  const updateRegion = (id: number) => {
    setRegion(regions[id]);
    setisListOpen(false);
  };


  return (

    <div className="homepage-container">

      {loading ? <h1>Loading...</h1> :
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
      }
      
    </div>

  );
}

export default App;
