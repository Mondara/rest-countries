import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Language, ResultCountryByName } from '../../Interfaces/Interfaces'
import './country.scss';

import { FaArrowLeft } from 'react-icons/fa'

const URL_BASE = 'https://restcountries.com/v2';
const URL_FIELDS = 'name,nativeName,population,capital,region,subregion,flags,currencies,languages,topLevelDomain,borders'


export default function Country() {
    const { countryId } = useParams();
    const navigate = useNavigate();

    const [country, setCountry] = useState<ResultCountryByName>(null);
    const [borderCountries, setBorderCountries] = useState<string[] | []>([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setBorderCountries([]);
        getCountry();

    }, [countryId])


    async function getCountry() {
        fetch(`${URL_BASE}/name/${countryId}?fields=${URL_FIELDS}`)
            .then(response => response.json())
            .then(data => {
                setCountry(data[0]);
                getBorders(data[0].borders);
            })
            .catch(error => console.log('Error fetching country data: ', error))
            .finally(() => {
                setLoading(false);
            })
    }

    async function getBorders(borders: string[]) {
        if (!borders) return;
        borders.forEach(border => {
            fetch(`${URL_BASE}/alpha/${border}?fields=name`)
                .then(response => response.json())
                .then((data: { name: string }) => setBorderCountries(prev => [...prev, data.name]))
        })

    }

    function getLanguages(languages: Language[]) {
        return languages.map(language => language.name).join(', ');
    }

    function getCurrencies(currencies: Currencies[]) {
        return currencies.map(currency => `${currency.name} ( ${currency.symbol} )`).join(', ');
    }

    if (loading) return <h1>Loading...</h1>
    if (!country) return <h1>No Data</h1>

    return (
        <div className="page--container">
            <button class="btn btn-goBack" onClick={() => navigate(-1)}><FaArrowLeft /> <span>Go Back</span></button>
            <div className="country_page--container">
                <div className="img--container">
                    <img src={country.flags.svg} alt={`${countryId} Flag`} />
                </div>

                <div className="country_page-info--container">
                    <h1 className="country_page-heading">{country.name}</h1>

                    <div className="country_page-info">
                        <ul className="country_page-info-col">
                            <li className="country_page-info"><span>Native Name:</span> {country.nativeName}</li>
                            <li className="country_page-info"><span>Population:</span> {new Intl.NumberFormat().format(country.population)}</li>
                            <li className="country_page-info"><span>Region:</span> {country.region}</li>
                            <li className="country_page-info"><span>Sub Region:</span> {country.subregion}</li>
                            <li className="country_page-info"><span>Capital:</span> {country.capital}</li>
                        </ul>

                        <ul className="country_page-info-col">
                            <li className="country_page-info"><span>Top Level Domain:</span> {country.topLevelDomain}</li>
                            <li className="country_page-info"><span>Currencies:</span> {getCurrencies(country.currencies)}</li>
                            <li className="country_page-info"><span>Languages:</span> {getLanguages(country.languages)}</li>
                        </ul>
                    </div>

                    <div className="country_page-info-borders">
                        <h6>Border Countries: </h6>
                        {borderCountries.map((country, indx) => (
                            <Link to={`/Country/${country}`} key={country}>
                                <button className="btn btn-border">{country}</button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    )
}