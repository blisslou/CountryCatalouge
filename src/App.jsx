import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CountryDetailsPage from './pages/CountryDetailsPage';
import CountryRegionPage from './pages/CountryRegionPage';
import SelectedRegionPage from './pages/SelectedRegionPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:countryCode" element={<CountryDetailsPage />} />
          <Route path="/country-region" element={<CountryRegionPage />} />
          <Route path="/region/:regionName" element={<SelectedRegionPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;