
import React from 'react';
import { TemperatureUnit } from '../types/weather';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface TemperatureUnitToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

const TemperatureUnitToggle: React.FC<TemperatureUnitToggleProps> = ({ unit, onToggle }) => {
  const handleToggle = () => {
    onToggle(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={`text-sm ${unit === 'celsius' ? 'font-medium' : 'text-muted-foreground'}`}>°C</span>
      <Switch 
        checked={unit === 'fahrenheit'} 
        onCheckedChange={handleToggle}
        id="temperature-unit"
        aria-label="Toggle temperature unit"
      />
      <span className={`text-sm ${unit === 'fahrenheit' ? 'font-medium' : 'text-muted-foreground'}`}>°F</span>
    </div>
  );
};

export default TemperatureUnitToggle;
