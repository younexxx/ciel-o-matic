
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { LocationSearchResult } from '../types/weather';
import { searchLocations } from '../utils/weatherApi';

interface SearchBarProps {
  onLocationSelect: (location: LocationSearchResult) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect, className = "" }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const searchResults = await searchLocations(query);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
      } catch (error) {
        console.error('Error searching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const debounceTimer = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleLocationClick = (location: LocationSearchResult) => {
    onLocationSelect(location);
    setQuery('');
    setIsOpen(false);
  };
  
  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };
  
  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-10 py-2 text-sm rounded-full bg-secondary/50 border border-border/50 focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-200"
          placeholder="Search for a location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && results.length > 0 && setIsOpen(true)}
        />
        {(isLoading || query) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isLoading ? (
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
            ) : (
              query && (
                <button onClick={clearSearch} className="focus:outline-none">
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )
            )}
          </div>
        )}
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg overflow-hidden z-10 animate-fade-in">
          <ul className="max-h-60 overflow-auto py-1">
            {results.map((location) => (
              <li 
                key={`${location.name}-${location.region}-${location.country}`}
                className="px-4 py-2 hover:bg-secondary/50 cursor-pointer transition-colors"
                onClick={() => handleLocationClick(location)}
              >
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-primary mr-2" />
                  <div>
                    <div className="text-sm font-medium">{location.name}</div>
                    <div className="text-xs text-muted-foreground">{location.region}, {location.country}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
