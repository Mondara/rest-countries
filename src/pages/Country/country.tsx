import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Country.scss';

import { Errorpage, SkeletonCountry } from '../../components';
import { Language, Currency } from '../../Interfaces/interfaces';
import { getCountryDetails } from '../../utils/fetch'


export const Country = () => {
    const { countryId } = useParams();
    const navigate = useNavigate();
    
    let { country, borders, loading, error } = getCountryDetails(countryId);
    // loading = true

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

                        <div className="country_page-info-details">
                            <ul className="country_page-info-details-col">
                                <li className="country_page-info-details"><span>Native Name:</span> {country.nativeName}</li>
                                <li className="country_page-info-details"><span>Population:</span> {new Intl.NumberFormat().format(country.population)}</li>
                                <li className="country_page-info-details"><span>Region:</span> {country.region}</li>
                                <li className="country_page-info-details"><span>Sub Region:</span> {country.subregion}</li>
                                <li className="country_page-info-details"><span>Capital:</span> {country.capital}</li>
                            </ul>

                            <ul className="country_page-info-details-col">
                                <li className="country_page-info-details"><span>Top Level Domain:</span> {country.topLevelDomain}</li>
                                <li className="country_page-info-details"><span>Currencies:</span> {getCurrencies(country.currencies)}</li>
                                <li className="country_page-info-details"><span>Languages:</span> {getLanguages(country.languages)}</li>
                            </ul>
                        </div>

                        <div className="country_page-info-borders">
                            <h6>Border Countries: </h6>
                            <div className="country_page-info-borders-btns">
                                {borders.length === 0 && <button className="btn btn-border btn-nan">None</button>}
                                {borders.length > 0 && borders.map((country: string, indx) => (
                                    <Link to={`/Country/${country}`} key={country}>
                                        <button className="btn btn-border">{country}</button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}