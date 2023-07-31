import { useState, useEffect, useRef } from 'react';
import { Country, Border, ResultCountryByName, Cache } from '../Interfaces/interfaces';

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
                .then((result: Country[]) =>
                    setData(result))
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
    const cache = useRef<Cache>({});

    useEffect(() => {
        if (!countryId) return;

        setLoading(true);

        if (cache.current[countryId]) {
            setCountry(cache.current[countryId].data);
            setBorders(cache.current[countryId].border);
            setLoading(false)
        } else {

            fetch(`${URL_BASE}/name/${countryId}?fields=${URL_FIELDS}`)
                .then(response => response.json())
                .then(async (data: ResultCountryByName[]) => {
                    setCountry(data[0])
                    const countryBorders = await getBorders(data[0].borders);
                    setBorders(countryBorders)

                    cache.current[countryId] = {
                        data: data[0],
                        border: countryBorders
                    };
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false))
        }


    }, [countryId]);

    return { country, borders, loading, error };
}

export const getBorders = async (borders: string[]): Promise<string[] | []> => {
    if (!borders) return [];

    const promises = borders.map((border) => fetch(`${URL_BASE}/alpha/${border}?fields=name`))
    return await Promise.all(promises)
        .then((responses) => Promise.all(responses.map((response) => response.json())))
        .then((borders) => borders.map(border => border.name))
        .catch((error) => {
            console.error(error);
            return [];
        });
}