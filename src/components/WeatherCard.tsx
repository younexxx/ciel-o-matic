
import React from 'react';
import { Wind, Droplets, Thermometer } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { CurrentWeather, WeatherCondition, TemperatureUnit } from '../types/weather';
import { getWeatherGradientClass } from '../utils/weatherApi';

interface WeatherCardProps {
  weather: CurrentWeather;
  temperatureUnit?: TemperatureUnit;
  className?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  weather, 
  temperatureUnit = 'celsius',
  className = "" 
}) => {
  const gradientClass = getWeatherGradientClass(weather.condition);
  
  return (
    <div className={`glass-card rounded-2xl overflow-hidden p-6 ${gradientClass} ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center w-full">
          <WeatherIcon 
            condition={weather.condition} 
            size={68} 
            animated 
            className="mb-2"
          />
        </div>
        
        <div className="text-center">
          <div className="text-6xl font-light tracking-tighter animate-fade-in">
            {Math.round(weather.temperature)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
          </div>
          <div className="text-lg font-medium capitalize mt-1 animate-fade-in">
            {weather.description}
          </div>
          <div className="text-sm text-muted-foreground mt-1 animate-fade-in">
            Feels like {Math.round(weather.feelsLike)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
          </div>
        </div>
        
        <div className="w-full border-t border-border/30 my-2"></div>
        
        <div className="grid grid-cols-3 gap-4 w-full animate-fade-in">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-secondary/30 rounded-full w-10 h-10 mb-2">
              <Wind className="h-5 w-5 text-foreground/80" />
            </div>
            <div className="text-sm font-medium">{weather.windSpeed} mph</div>
            <div className="text-xs text-muted-foreground">Wind</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-secondary/30 rounded-full w-10 h-10 mb-2">
              <Droplets className="h-5 w-5 text-foreground/80" />
            </div>
            <div className="text-sm font-medium">{weather.humidity}%</div>
            <div className="text-xs text-muted-foreground">Humidity</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-secondary/30 rounded-full w-10 h-10 mb-2">
              <Thermometer className="h-5 w-5 text-foreground/80" />
            </div>
            <div className="text-sm font-medium">{weather.pressure}</div>
            <div className="text-xs text-muted-foreground">Pressure</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
