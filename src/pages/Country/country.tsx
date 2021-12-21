import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Country.scss';

import { Errorpage, SkeletonCountry } from '../../components';
import { Language, Currency } from '../../Interfaces';
import { getCountryDetails } from '../../utils/fetch'


export function Country() {
    const { countryId } = useParams();
    const navigate = useNavigate();

    if (!countryId) return;

    const { country, borders, loading, error } = getCountryDetails(countryId);

    function getLanguages(languages: Language[]) {
        return languages.map(language => language.name).join(', ');
    }

    function getCurrencies(currencies: Currency[]) {
        return currencies.map(currency => `${currency.name} ( ${currency.symbol} )`).join(', ');
    }

    return (
        <div className="page--container">
            <button className="btn btn-goBack" onClick={() => navigate(-1)}><FaArrowLeft /> <span>Go Back</span></button>
            {loading && <SkeletonCountry />}
            {!loading && country && (
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
                            {borders.length === 0 && <button className="btn btn-border btn-nan">None</button>}
                            {borders.length > 0 && borders.map((country: string, indx) => (
                                <Link to={`/Country/${country}`} key={country}>
                                    <button className="btn btn-border">{country}</button>
                                </Link>
                            ))
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}