import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCountries } from '../context/CountryContext.jsx';

const Header = () => {
  const { searchTerm, setSearchTerm, independenceFilter, setIndependenceFilter } = useCountries();
  
  // 1. Get the current location object
  const location = useLocation();

  // 2. Determine if the filters should be shown.
  // They will NOT be shown if the pathname is exactly '/country-region'.
  const showFilters = location.pathname !== '/country-region';

  return (
    <header className="header">
      <Link to="/" className="header-title">Country Finder</Link>
      
      <div className="controls-container">
        {/* 3. Conditionally render the filters based on the 'showFilters' boolean */}
        {showFilters && (
          <div className="filters">
            <input
              type="text"
              placeholder="Search by name, region, code..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="filter-dropdown"
              value={independenceFilter}
              onChange={(e) => setIndependenceFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="independent">Independent</option>
              <option value="dependent">Dependent</option>
            </select>
          </div>
        )}
      </div>

      <nav className="header-nav">
        {/* This link correctly points to the page we are building */}
        <Link to="/country-region">Regions</Link>
      </nav>
    </header>
  );
};

export default Header;