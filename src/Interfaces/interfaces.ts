export interface ResultCountryByName {
  name: string;
  capital: string;
  borders: string[];
  nativeName: string;
  topLevelDomain: string[];
  languages: Language[];
  subregion: string;
  region: string;
  population: number;
  flags: Flags;
  currencies: Currency[];
  flag: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Flags {
  svg: string;
  png: string;
}

export interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface Country {
  name: string;
  capital: string;
  region: string;
  population: number;
  flags: Flags;
}

export interface BorderNameChace {
  [key: string]: string;
}

export interface Border {
  name: string;
}
