import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

import { fetchAllCountries } from '../api/countriesApi.js';
const CountryContext = createContext();


export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [independenceFilter, setIndependenceFilter] = useState('all');

  useEffect(() => {
    const getCountriesData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
       
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    getCountriesData();
  }, []); 

  const regions = useMemo(() => {
    if (countries.length === 0) return [];
    const regionSet = new Set(countries.map(country => country.region));
    return Array.from(regionSet).sort();
  }, [countries]);

  
  const value = useMemo(() => ({
    countries,
    loading,
    error,
    regions,
    searchTerm,
    setSearchTerm,
    independenceFilter,
    setIndependenceFilter,
  }), [countries, loading, error, regions, searchTerm, independenceFilter]);

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};


export const useCountries = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountries must be used within a CountryProvider');
  }
  return context;
};