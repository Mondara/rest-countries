import React, { useState } from "react";
import "./searchbar.scss";

import { FaSearch } from "react-icons/fa";

interface Props {
    input: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({input, onChange}) => {
  return (
    <div className="searchbar-container">
      <FaSearch className="searchbar-icon" />
      <input 
        className="searchbar-input" 
        placeholder="Search for a country..." 
        type="text"
        value={input}
        onChange={(e) => onChange(e.target.value) }
        
        />
    </div>
  );
};

export default SearchBar;
