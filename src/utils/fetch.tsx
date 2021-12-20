import React, { useState, useEffect } from 'react';
import { Country, Border, ResultCountryByName } from '../Interfaces';

const URL_BASE = 'https://restcountries.com/v2';
const URL_FIELDS = 'name,nativeName,population,capital,region,subregion,flags,currencies,languages,topLevelDomain,borders'


export const useFetch = (URL: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState<Country[]>([]);

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data: Country[]) => {
                setData(data)
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [URL]);

    return { data, loading, error };
};


export const getCountry = (countryId: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [country, setCountry] = useState<ResultCountryByName>();
    const [borders, setBorders] = useState<string[]>([]);


    useEffect(() => {
        fetch(`${URL_BASE}/name/${countryId}?fields=${URL_FIELDS}`)
            .then(response => response.json())
            .then((data: ResultCountryByName[] ) => {
                setCountry(data[0])
                getBorders(data[0].borders)
                    .then(data => setBorders(data.map(border => border.name)))
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false))


    }, [countryId]);

    console.log(country, borders)

    return { country, borders, loading, error };
}

export const getBorders = async (borders: string[]): Promise<Border[] | []> => {
    if (!borders) return [];

    const promises = borders.map((border) => fetch(`${URL_BASE}/alpha/${border}?fields=name`))
    return await Promise.all(promises)
        .then((responses) => Promise.all(responses.map((response) => response.json())))
        .catch((error) => {
            console.log(error);
            return [];
        });


}