import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCitiesThunk, clearSearchResults } from '../../features/weatherSlice';
import { addRecentSearch } from '../../features/recentSearchesSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.weather.searchResults);
  const loading = useSelector((state) => state.weather.loading);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length >= 2) {
      setShowResults(true);
      await dispatch(searchCitiesThunk(value));
    } else {
      setShowResults(false);
      dispatch(clearSearchResults());
    }
  };

  const handleSelectCity = (city) => {
    dispatch(addRecentSearch(city));
    setQuery('');
    setShowResults(false);
    dispatch(clearSearchResults());
  };

  const handleBlur = () => {
    // Delay to allow click on results
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          onBlur={handleBlur}
          placeholder="Search for a city..."
          className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {showResults && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {searchResults.map((city, index) => (
            <button
              key={`${city.name}-${city.country}-${index}`}
              onClick={() => handleSelectCity(city)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition duration-150 border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-800">{city.name}</div>
              <div className="text-sm text-gray-500">
                {city.state && `${city.state}, `}{city.country}
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults && query.length >= 2 && searchResults.length === 0 && !loading && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg p-4 text-center text-gray-500">
          No cities found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
