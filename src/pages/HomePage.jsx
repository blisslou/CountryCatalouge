import React, { useMemo } from 'react';
import { useCountries } from '../context/CountryContext.jsx';
import CountryCard from '../components/CountryCard';
import Loader from '../components/Loader';

const HomePage = () => {
  const { countries = [], loading, error, searchTerm, independenceFilter } = useCountries();

  const filteredCountries = useMemo(() => {
    return countries
      .filter(country => {
        if (independenceFilter === 'independent') return country.independent === true;
        if (independenceFilter === 'dependent') return country.independent === false;
        return true;
      })
      .filter(country => {
        const term = searchTerm.toLowerCase();
        const nameMatch = country.name?.common?.toLowerCase().includes(term) || false;
        const regionMatch = country.region?.toLowerCase().includes(term) || false;
        const codeMatch = country.cca3?.toLowerCase().includes(term) || false;
        return nameMatch || regionMatch || codeMatch;
      });
  }, [countries, searchTerm, independenceFilter]);

  if (loading) return <Loader />;
  if (error) return <p className="container">Error: {error}</p>;

  return (
    <div className="container">
      {filteredCountries.length > 0 ? (
        <div className="country-list">
          
          {filteredCountries.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <p>No countries found matching your criteria.</p>
      )}
    </div>
  );
};

export default HomePage;