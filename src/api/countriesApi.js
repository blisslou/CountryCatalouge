const API_URL = 'https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,borders,independent';

/**
 * Fetches all countries from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of country objects.
 * @throws {Error} If the network response is not ok.
 */
export const fetchAllCountries = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch country data. Please try again later.');
  }
  const data = await response.json();
  return data;
};