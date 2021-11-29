import React, { useState } from "react";
import "./App.scss";

import Header from "./components/header/header";
import SearchBar from "./components/search-bar/search-bar";
import Dropdown from "./components/dropdown/dropdown";

function App() {
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("");
  const [isListOpen, setisListOpen] = useState(false);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const updateInput = (input: string) => {
    setInput(input);
  };

  const updateRegion = (id: number) => {
    setRegion(regions[id]);
    setisListOpen(false);
  };

  const toggleOpen = () => {
    setisListOpen((prev: boolean) => !prev);
  }

  return (
    <div className="App">
      <Header />
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
        {/* <div className="cards-container"><Card /></div> */}
      </main>
    </div>
  );
}

export default App;
