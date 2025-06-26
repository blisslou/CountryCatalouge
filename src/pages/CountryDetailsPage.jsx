import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCountries } from '../context/CountryContext.jsx';
import Loader from '../components/Loader';

const CountryDetailsPage = () => {
  // This hook gets the 'countryCode' from the URL. It is reactive.
  const { countryCode } = useParams();
  const { countries = [], loading, error } = useCountries();

  // This useMemo hook RE-RUNS whenever 'countryCode' or 'countries' changes.
  // This is what finds the *new* country when you navigate.
  const country = useMemo(() => {
    return countries.find(c => c.cca3 === countryCode);
  }, [countryCode, countries]);

  // This also re-runs when the 'country' is found.
  const borderCountries = useMemo(() => {
    if (!country?.borders) return [];
    
    return country.borders.map(borderCode => {
      const borderCountry = countries.find(c => c.cca3 === borderCode);
      return borderCountry ? { code: borderCountry.cca3, name: borderCountry.name.common } : null;
    }).filter(Boolean);
  }, [country, countries]);

  if (loading) return <Loader />;
  if (error) return <p className="container">Error: {error}</p>;

  // This check prevents crashes if you navigate to a code that doesn't exist.
  if (!country) {
    return <p className="container">Country not found.</p>;
  }

  return (
    <div className="container">
      <div className="country-details">
        {/* Country Flag */}
        <img 
          src={country.flags?.svg} 
          alt={`Flag of ${country.name?.common}`} 
          className="country-details-flag" 
        />
        <div className="country-details-info">
          {/* Country Name */}
          <h2>{country.name?.common}</h2>

          {/* Country Code */}
          <p><strong>Code:</strong> {country.cca3}</p>

          {/* Country Region */}
          <p><strong>Region:</strong> {country.region}</p>
        </div>

        {/* Country Borders */}
        {borderCountries.length > 0 && (
          <div className="borders-container">
            <h3>Borders:</h3>
            {borderCountries.map(border => (
              <Link key={border.code} to={`/country/${border.code}`}>
                {border.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetailsPage;