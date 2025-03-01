
import React from 'react';
import { DailyForecast, TemperatureUnit } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface ForecastCardProps {
  forecast: DailyForecast[];
  temperatureUnit?: TemperatureUnit;
  className?: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ 
  forecast, 
  temperatureUnit = 'celsius',
  className = "" 
}) => {
  return (
    <div className={`glass-card rounded-2xl overflow-hidden p-6 h-full ${className}`}>
      <h3 className="text-lg font-medium mb-6">7-Day Forecast</h3>
      
      <div className="space-y-6">
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className="flex items-center justify-between"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-1">
              <div className="font-medium">{day.day}</div>
              <div className="text-xs text-muted-foreground">
                {day.precipitation > 0 ? `${day.precipitation}% ` : ''}
                {day.humidity}% humidity
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground text-right w-10">
                {Math.round(day.tempLow)}°
              </div>
              <div className="w-32 h-1.5 rounded-full bg-secondary/50 relative">
                <div 
                  className="absolute h-1.5 rounded-full bg-primary"
                  style={{
                    left: `${Math.min(100, Math.max(0, (day.tempLow / (day.tempHigh || 1)) * 100))}%`,
                    right: `${Math.min(100, Math.max(0, 100 - (day.tempHigh / (day.tempHigh || 1)) * 100))}%`
                  }}
                />
              </div>
              <div className="text-sm font-medium text-right w-10">
                {Math.round(day.tempHigh)}°
              </div>
              <WeatherIcon condition={day.condition} size={24} />
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-muted-foreground text-right mt-4">
        All temperatures in °{temperatureUnit === 'celsius' ? 'C' : 'F'}
      </div>
    </div>
  );
};

export default ForecastCard;
