import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ResultCountryByName } from '../../Interfaces/CountryInterfaces'


export default function Country() {
    const { countryId } = useParams()
    const [country, setCountry] = useState<ResultCountryByName>();
    const [borderCountries, setBorderCountries] =useState <string[] | []>([])

    useEffect(() => {
        fetchCountries(`https://restcountries.com/v2/name/${countryId}?fields=name,nativeName,population,capital,region,subregion,flags,currencies,languages,topLevelDomain,borders`)
            .then((countryInfo) => {
                fetchBorderCountries(countryInfo.borders);
            })
        
    }, [])

    const fetchCountries = async (endpoint: string) => {
        return fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                setCountry(data[0]);
                return data[0]
            });
    };

    const fetchBorderCountries = async (borders: string[]) => {
        if (!borders) return;
        borders.forEach(border => {
            fetch(`https://restcountries.com/v2/alpha/${border}?fields=name`)
                .then(response => response.json())
                .then((data: { name: string }) => {
                    setBorderCountries((prev: string[]) => [...prev, data.name]);
                })
        })
    }



    return (
        <div>
            {/* <img src={country.flags.svg} alt={`${countryId} Flag`} /> */}
            <h1>Hello</h1>
            {borderCountries.map(country => (
                <li key={country}>{country}</li>
            ))}
        </div>
    )
}