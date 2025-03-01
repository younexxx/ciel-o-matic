
import { WeatherData, LocationSearchResult, WeatherCondition } from '../types/weather';

// This is a mock API for demonstration purposes
// In a real app, you would connect to a real weather API

// Mock data for current location weather
const mockWeatherData: WeatherData = {
  location: {
    name: 'New York',
    region: 'New York',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: 'America/New_York',
    localTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  },
  current: {
    temperature: 72,
    feelsLike: 73,
    humidity: 65,
    windSpeed: 8,
    condition: 'partly-cloudy',
    description: 'Partly cloudy',
    uvIndex: 5,
    pressure: 1012,
    visibility: 10,
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  },
  daily: [
    {
      date: new Date().toLocaleDateString(),
      day: 'Today',
      tempHigh: 75,
      tempLow: 62,
      condition: 'partly-cloudy',
      precipitation: 10,
      humidity: 65,
      windSpeed: 8,
    },
    {
      date: new Date(Date.now() + 86400000).toLocaleDateString(),
      day: 'Tomorrow',
      tempHigh: 68,
      tempLow: 58,
      condition: 'rain',
      precipitation: 80,
      humidity: 75,
      windSpeed: 10,
    },
    {
      date: new Date(Date.now() + 86400000 * 2).toLocaleDateString(),
      day: getDayName(new Date(Date.now() + 86400000 * 2)),
      tempHigh: 62,
      tempLow: 54,
      condition: 'rain',
      precipitation: 90,
      humidity: 80,
      windSpeed: 12,
    },
    {
      date: new Date(Date.now() + 86400000 * 3).toLocaleDateString(),
      day: getDayName(new Date(Date.now() + 86400000 * 3)),
      tempHigh: 65,
      tempLow: 56,
      condition: 'cloudy',
      precipitation: 40,
      humidity: 70,
      windSpeed: 9,
    },
    {
      date: new Date(Date.now() + 86400000 * 4).toLocaleDateString(),
      day: getDayName(new Date(Date.now() + 86400000 * 4)),
      tempHigh: 70,
      tempLow: 60,
      condition: 'partly-cloudy',
      precipitation: 20,
      humidity: 60,
      windSpeed: 7,
    },
    {
      date: new Date(Date.now() + 86400000 * 5).toLocaleDateString(),
      day: getDayName(new Date(Date.now() + 86400000 * 5)),
      tempHigh: 72,
      tempLow: 63,
      condition: 'clear',
      precipitation: 0,
      humidity: 55,
      windSpeed: 6,
    },
    {
      date: new Date(Date.now() + 86400000 * 6).toLocaleDateString(),
      day: getDayName(new Date(Date.now() + 86400000 * 6)),
      tempHigh: 74,
      tempLow: 65,
      condition: 'clear',
      precipitation: 0,
      humidity: 50,
      windSpeed: 5,
    },
  ],
  hourly: [
    { time: '12 AM', temperature: 62, condition: 'clear', precipitation: 0 },
    { time: '1 AM', temperature: 61, condition: 'clear', precipitation: 0 },
    { time: '2 AM', temperature: 60, condition: 'clear', precipitation: 0 },
    { time: '3 AM', temperature: 59, condition: 'partly-cloudy', precipitation: 0 },
    { time: '4 AM', temperature: 58, condition: 'partly-cloudy', precipitation: 0 },
    { time: '5 AM', temperature: 58, condition: 'cloudy', precipitation: 10 },
    { time: '6 AM', temperature: 59, condition: 'cloudy', precipitation: 20 },
    { time: '7 AM', temperature: 61, condition: 'cloudy', precipitation: 20 },
    { time: '8 AM', temperature: 63, condition: 'partly-cloudy', precipitation: 10 },
    { time: '9 AM', temperature: 65, condition: 'partly-cloudy', precipitation: 0 },
    { time: '10 AM', temperature: 68, condition: 'partly-cloudy', precipitation: 0 },
    { time: '11 AM', temperature: 70, condition: 'partly-cloudy', precipitation: 0 },
    { time: '12 PM', temperature: 72, condition: 'partly-cloudy', precipitation: 0 },
    { time: '1 PM', temperature: 73, condition: 'partly-cloudy', precipitation: 0 },
    { time: '2 PM', temperature: 74, condition: 'partly-cloudy', precipitation: 0 },
    { time: '3 PM', temperature: 75, condition: 'partly-cloudy', precipitation: 0 },
    { time: '4 PM', temperature: 74, condition: 'partly-cloudy', precipitation: 0 },
    { time: '5 PM', temperature: 73, condition: 'partly-cloudy', precipitation: 0 },
    { time: '6 PM', temperature: 71, condition: 'partly-cloudy', precipitation: 0 },
    { time: '7 PM', temperature: 69, condition: 'clear', precipitation: 0 },
    { time: '8 PM', temperature: 67, condition: 'clear', precipitation: 0 },
    { time: '9 PM', temperature: 66, condition: 'clear', precipitation: 0 },
    { time: '10 PM', temperature: 65, condition: 'clear', precipitation: 0 },
    { time: '11 PM', temperature: 63, condition: 'clear', precipitation: 0 },
  ],
};

// Mock weather data for different locations
const mockLocationData: Record<string, WeatherData> = {
  'san-francisco': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'San Francisco',
      region: 'California',
      country: 'United States',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 65,
      feelsLike: 64,
      humidity: 75,
      condition: 'fog',
      description: 'Foggy',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: day.tempHigh - 8,
      tempLow: day.tempLow - 5,
      condition: day.day === 'Today' ? 'fog' : day.condition,
    })),
  },
  'london': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'London',
      region: 'Greater London',
      country: 'United Kingdom',
      latitude: 51.5074,
      longitude: -0.1278,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 60,
      feelsLike: 58,
      humidity: 80,
      condition: 'rain',
      description: 'Light rain',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: day.tempHigh - 12,
      tempLow: day.tempLow - 8,
      condition: day.day === 'Today' || day.day === 'Tomorrow' ? 'rain' : day.condition,
      precipitation: day.day === 'Today' || day.day === 'Tomorrow' ? 80 : day.precipitation,
    })),
  },
  'tokyo': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'Tokyo',
      region: 'Tokyo',
      country: 'Japan',
      latitude: 35.6762,
      longitude: 139.6503,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 78,
      feelsLike: 80,
      humidity: 70,
      condition: 'clear',
      description: 'Sunny',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: day.tempHigh + 6,
      tempLow: day.tempLow + 8,
      condition: day.day === 'Today' ? 'clear' : day.condition,
    })),
  },
  'sydney': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'Sydney',
      region: 'New South Wales',
      country: 'Australia',
      latitude: -33.8688,
      longitude: 151.2093,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 70,
      feelsLike: 71,
      humidity: 60,
      condition: 'clear',
      description: 'Sunny',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: day.tempHigh + 2,
      tempLow: day.tempLow + 4,
      condition: day.day === 'Today' ? 'clear' : day.condition,
    })),
  },
};

// Mock location search results
const mockSearchResults: LocationSearchResult[] = [
  {
    id: 'new-york',
    name: 'New York',
    region: 'New York',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.0060,
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    region: 'California',
    country: 'United States',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: 'london',
    name: 'London',
    region: 'Greater London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    region: 'Tokyo',
    country: 'Japan',
    latitude: 35.6762,
    longitude: 139.6503,
  },
  {
    id: 'sydney',
    name: 'Sydney',
    region: 'New South Wales',
    country: 'Australia',
    latitude: -33.8688,
    longitude: 151.2093,
  },
];

// Helper function to get day name
function getDayName(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

// Function to fetch weather data
export const getWeatherData = async (location?: string): Promise<WeatherData> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      if (location && mockLocationData[location.toLowerCase()]) {
        resolve(mockLocationData[location.toLowerCase()]);
      } else {
        resolve(mockWeatherData);
      }
    }, 800);
  });
};

// Function to search for locations
export const searchLocations = async (query: string): Promise<LocationSearchResult[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      if (!query.trim()) {
        resolve([]);
        return;
      }
      
      const results = mockSearchResults.filter(
        location => location.name.toLowerCase().includes(query.toLowerCase()) ||
                   location.region.toLowerCase().includes(query.toLowerCase()) ||
                   location.country.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 500);
  });
};

// Function to get the appropriate class based on weather condition
export const getWeatherGradientClass = (condition: WeatherCondition): string => {
  switch (condition) {
    case 'clear':
      return 'weather-gradient-sunny';
    case 'partly-cloudy':
    case 'cloudy':
      return 'weather-gradient-cloudy';
    case 'rain':
    case 'showers':
      return 'weather-gradient-rainy';
    case 'thunderstorm':
      return 'weather-gradient-stormy';
    case 'snow':
      return 'weather-gradient-snowy';
    case 'fog':
    case 'mist':
    case 'haze':
      return 'weather-gradient-foggy';
    default:
      return 'weather-gradient-sunny';
  }
};
