import React from 'react';
import { Link } from 'react-router-dom';
import { useCountries } from '../context/CountryContext.jsx';
import Loader from '../components/Loader';

const CountryRegionPage = () => {
  
  const { regions, loading, error } = useCountries();

  
  if (loading) return <Loader />;
  if (error) return <p className="container">Error: {error}</p>;
  
  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Browse by Region</h2>
      
     
      <div className="region-list">
        {regions.map(region => (
         
          <Link key={region} to={`/region/${region}`} className="region-link">
            {region}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountryRegionPage;