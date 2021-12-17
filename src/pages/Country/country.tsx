import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ResultCountryByName } from '../../Interfaces/Interfaces'

const URL_BASE = 'https://restcountries.com/v2';
const URL_FIELDS = 'name,nativeName,population,capital,region,subregion,flags,currencies,languages,topLevelDomain,borders'


export default function Country() {
    const { countryId } = useParams()
    const [country, setCountry] = useState<ResultCountryByName>(null);
    const [borderCountries, setBorderCountries] = useState<string[] | []>([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCountry();

    }, [])


    async function getCountry() {
        fetch(`${URL_BASE}/name/${countryId}?fields=${URL_FIELDS}`)
            .then(response => response.json())
            .then(data => {
                setCountry(data[0]);
                getBorders(data[0].borders);
            })
            .catch(error => console.log('Error fetching country data: ', error))
            .finally(() => {
                setLoading(false)
            })
    }

    async function getBorders(borders: string[]) {
        if (!borders) return;

        borders.forEach(border => {
            fetch(`${URL_BASE}/alpha/${border}?fields=name`)
                .then(response => response.json())
                .then((data: { name: string }) => setBorderCountries((prev: string[]) => [...prev, data.name]))
        })

    }

    return (
        <>
            {
                loading ? <h1>Loading...</h1> :
                    <div>
                        {/* <img src={country.flags.svg} alt={`${countryId} Flag`} /> */}
                        <h1>{country?.name}</h1>
                        {borderCountries.map(country => (
                            <li key={country}>{country}</li>
                        ))}
                    </div>
            }
        </>


    )
}