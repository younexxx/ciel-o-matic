
import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudSun, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  CloudFog,
  Droplets
} from 'lucide-react';
import { WeatherCondition } from '../types/weather';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
  color?: string;
  animated?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  size = 24, 
  className = "",
  color,
  animated = false 
}) => {
  const animationClass = animated ? 'animate-float' : '';
  const baseClass = `${className} ${animationClass}`;
  
  switch (condition) {
    case 'clear':
      return <Sun size={size} className={baseClass} color={color || "#FFB74D"} />;
    case 'partly-cloudy':
      return <CloudSun size={size} className={baseClass} color={color || "#90A4AE"} />;
    case 'cloudy':
      return <Cloud size={size} className={baseClass} color={color || "#90A4AE"} />;
    case 'rain':
    case 'showers':
      return <CloudRain size={size} className={baseClass} color={color || "#64B5F6"} />;
    case 'thunderstorm':
      return <CloudLightning size={size} className={baseClass} color={color || "#5C6BC0"} />;
    case 'snow':
      return <CloudSnow size={size} className={baseClass} color={color || "#E1F5FE"} />;
    case 'fog':
    case 'mist':
    case 'haze':
      return <CloudFog size={size} className={baseClass} color={color || "#CFD8DC"} />;
    default:
      return <Sun size={size} className={baseClass} color={color || "#FFB74D"} />;
  }
};

export default WeatherIcon;
