
import React from 'react';
import { MapPin, Clock } from 'lucide-react';

interface LocationInfoProps {
  name: string;
  region: string;
  country: string;
  localTime: string;
  className?: string;
}

const LocationInfo: React.FC<LocationInfoProps> = ({
  name,
  region,
  country,
  localTime,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-start space-y-1 ${className}`}>
      <div className="flex items-center space-x-1.5">
        <div className="bg-primary/10 rounded-full p-1.5">
          <MapPin className="h-4 w-4 text-primary" />
        </div>
        <div className="text-sm font-medium animate-fade-in">{name}</div>
        <div className="text-xs text-muted-foreground animate-fade-in">{region}, {country}</div>
      </div>
      <div className="flex items-center space-x-1.5 text-xs text-muted-foreground ml-1">
        <Clock className="h-3 w-3" />
        <span className="animate-fade-in">Local time: {localTime}</span>
      </div>
    </div>
  );
};

export default LocationInfo;
