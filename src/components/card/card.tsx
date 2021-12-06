import React from "react";
import './card.scss';

interface Props {
  name: string;
  population: number;
  region: string;
  capital: string;
  flags: string;
}

const Card: React.FC<Props> = ({
  name,
  region,
  capital,
  population,
  flags,
}) => {
  return (
    <div className="card">
      <img src={flags} />
      <div className="card-info">
        <h3 className="card-info-title">{name}</h3>
        <div className="card-info-population"><strong>Population:</strong> {population}</div>
        <div className="card-info-region"><strong>Region:</strong> {region}</div>
        <div className="card-info-capital"><strong>Capital:</strong> {capital}</div>
      </div>
    </div>
  );
};

export default Card;
