
import React from 'react';
import { DailyForecast } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface ForecastCardProps {
  forecast: DailyForecast[];
  className?: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, className = "" }) => {
  return (
    <div className={`glass-card rounded-2xl overflow-hidden p-6 ${className}`}>
      <h3 className="text-lg font-medium mb-4">7-Day Forecast</h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div 
            key={day.date} 
            className={`flex items-center justify-between animate-fade-in`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex-1">
              <div className="font-medium">
                {day.day}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 flex-1 justify-center">
              <WeatherIcon condition={day.condition} size={24} />
              <span className="text-xs text-muted-foreground">{day.precipitation}%</span>
            </div>
            
            <div className="flex space-x-2 justify-end flex-1">
              <span className="font-medium">{Math.round(day.tempHigh)}°</span>
              <span className="text-muted-foreground">{Math.round(day.tempLow)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
