
import React, { useEffect, useState } from 'react';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import SearchBar from '../components/SearchBar';
import LocationInfo from '../components/LocationInfo';
import WeatherIcon from '../components/WeatherIcon';
import { Loader2 } from 'lucide-react';
import { WeatherData, LocationSearchResult } from '../types/weather';
import { getWeatherData } from '../utils/weatherApi';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchWeatherData = async (locationId?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(locationId);
      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to fetch weather data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchWeatherData();
  }, []);
  
  const handleLocationSelect = (location: LocationSearchResult) => {
    fetchWeatherData(location.id);
    toast({
      title: 'Location updated',
      description: `Weather data for ${location.name} has been loaded.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-medium">Weather Forecast</h1>
          <SearchBar onLocationSelect={handleLocationSelect} className="w-full sm:w-64 md:w-80" />
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-destructive">{error}</p>
            <button 
              onClick={() => fetchWeatherData()} 
              className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : weatherData && (
          <div className="animate-fade-in">
            <LocationInfo 
              name={weatherData.location.name}
              region={weatherData.location.region}
              country={weatherData.location.country}
              localTime={weatherData.location.localTime}
              className="mb-6"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <WeatherCard weather={weatherData.current} />
                
                <div className="mt-6 glass-card rounded-2xl overflow-hidden p-6">
                  <h3 className="text-lg font-medium mb-4">Hourly Forecast</h3>
                  
                  <div className="overflow-x-auto">
                    <div className="flex space-x-6 pb-2 min-w-max">
                      {weatherData.hourly.slice(0, 12).map((hour, index) => (
                        <div 
                          key={hour.time} 
                          className="flex flex-col items-center"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="text-sm font-medium">{hour.time}</div>
                          <WeatherIcon 
                            condition={hour.condition} 
                            size={28} 
                            className="my-2"
                          />
                          <div className="text-sm">{Math.round(hour.temperature)}°</div>
                          <div className="text-xs text-muted-foreground">{hour.precipitation}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-1">
                <ForecastCard forecast={weatherData.daily} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
