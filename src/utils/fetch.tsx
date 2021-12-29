import { useState, useEffect } from 'react';
import { Country, Border, ResultCountryByName } from '../Interfaces/interfaces';

const URL_BASE = 'https://restcountries.com/v2';
const URL_FIELDS = 'name,nativeName,population,capital,region,subregion,flags,currencies,languages,topLevelDomain,borders'

export const getCountry = (region: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<Country[]>([]);

    const URL_FETCH_ALL = `${URL_BASE}/all?fields=${URL_FIELDS}`;

    useEffect(() => {
        if (region === 'ALL') {
            fetchCountry(URL_FETCH_ALL);
        } else {
            fetchCountry(`${URL_BASE}/region/${region}?fields=${URL_FIELDS}`);
        }

        async function fetchCountry(url: string) {
            fetch(url)
                .then(response => response.json())
                .then((result: Country[]) => setData(result))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false))
        }
    }, [region]);

    return { data, loading, error };
}


export const getCountryDetails = (countryId: string | undefined) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [country, setCountry] = useState<ResultCountryByName>();
    const [borders, setBorders] = useState<string[]>([]);

    useEffect(() => {
        fetch(`${URL_BASE}/name/${countryId}?fields=${URL_FIELDS}`)
            .then(response => response.json())
            .then((data: ResultCountryByName[]) => {
                setCountry(data[0])
                getBorders(data[0].borders)
                    .then(data => setBorders(data.map(border => border.name)))
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))


    }, [countryId]);

    return { country, borders, loading, error };
}

export const getBorders = async (borders: string[]): Promise<Border[] | []> => {
    if (!borders) return [];

    const promises = borders.map((border) => fetch(`${URL_BASE}/alpha/${border}?fields=name`))
    return await Promise.all(promises)
        .then((responses) => Promise.all(responses.map((response) => response.json())))
        .catch((error) => {
            console.error(error);
            return [];
        });


}