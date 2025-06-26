import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useCountries } from '../context/CountryContext.jsx';
import CountryCard from '../components/CountryCard';
import Loader from '../components/Loader';

const SelectedRegionPage = () => {
  const { regionName } = useParams();

  
  const { countries = [], loading, error, independenceFilter } = useCountries();

  const countriesInRegion = useMemo(() => {
   
    return countries
      
      .filter(country => country.region === regionName)
      
      .filter(country => {
        if (independenceFilter === 'independent') return country.independent === true;
        if (independenceFilter === 'dependent') return country.independent === false;
        return true; // For the 'all' option
      });
  
  }, [countries, regionName, independenceFilter]);
  
  if (loading) return <Loader />;
  if (error) return <p className="container">Error: {error}</p>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: '2rem' }}>Countries in {regionName}</h2>
      
      {countriesInRegion.length > 0 ? (
        <div className="country-list">
          {countriesInRegion.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <p>No countries found matching your criteria in this region.</p>
      )}
    </div>
  );
};

export default SelectedRegionPage;