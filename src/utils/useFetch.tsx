export const fetchCountries = async (endpoint: string) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        return data.sort((a, b) => a.name.common > b.name.common);
      });
  };