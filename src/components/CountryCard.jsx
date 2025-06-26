import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    // Ensure this link points to `/country/` followed by the cca3 code
    <Link to={`/country/${country.cca3}`}>
      <div className="country-card">
        <img 
          src={country.flags?.svg} 
          alt={`Flag of ${country.name?.common}`} 
          className="country-card-flag" 
        />
        <div className="country-card-body">
          <h3>{country.name?.common}</h3>
          <p><strong>Code:</strong> {country.cca3}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Borders:</strong> {country.borders?.join(', ') || 'None'}</p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;