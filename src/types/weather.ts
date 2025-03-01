
export type WeatherCondition = 
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rain'
  | 'showers'
  | 'thunderstorm'
  | 'snow'
  | 'fog'
  | 'mist'
  | 'haze';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: WeatherCondition;
  description: string;
  uvIndex: number;
  pressure: number;
  visibility: number;
  time: string;
}

export interface DailyForecast {
  date: string;
  day: string;
  tempHigh: number;
  tempLow: number;
  condition: WeatherCondition;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: WeatherCondition;
  precipitation: number;
}

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
    localTime: string;
  };
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
}

export interface LocationSearchResult {
  id: string;
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
}
