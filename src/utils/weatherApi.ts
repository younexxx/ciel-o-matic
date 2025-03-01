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
      temperature: 15, // Using Celsius as base now
      feelsLike: 14,
      humidity: 75,
      condition: 'fog',
      description: 'Foggy',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: day.tempHigh - 11, // Converting to Celsius
      tempLow: day.tempLow - 11,
      condition: day.day === 'Today' ? 'fog' as WeatherCondition : day.condition,
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
      temperature: 12, // Celsius
      feelsLike: 10,
      humidity: 80,
      condition: 'rain',
      description: 'Light rain',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: day.tempHigh - 15,
      tempLow: day.tempLow - 13,
      condition: (day.day === 'Today' || day.day === 'Tomorrow' ? 'rain' : day.condition) as WeatherCondition,
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
      condition: day.day === 'Today' ? 'clear' as WeatherCondition : day.condition,
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
      condition: day.day === 'Today' ? 'clear' as WeatherCondition : day.condition,
    })),
  },
  
  'dubai': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'Dubai',
      region: 'Dubai',
      country: 'United Arab Emirates',
      latitude: 25.2048,
      longitude: 55.2708,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 95,
      feelsLike: 98,
      humidity: 45,
      condition: 'clear',
      description: 'Sunny and hot',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: day.tempHigh + 20,
      tempLow: day.tempLow + 15,
      condition: day.day === 'Today' ? 'clear' as WeatherCondition : day.condition,
      precipitation: day.day === 'Today' ? 0 : day.precipitation,
    })),
  },
  
  'cairo': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'Cairo',
      region: 'Cairo Governorate',
      country: 'Egypt',
      latitude: 30.0444,
      longitude: 31.2357,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 90,
      feelsLike: 92,
      humidity: 40,
      condition: 'clear',
      description: 'Hot and dry',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: day.tempHigh + 15,
      tempLow: day.tempLow + 12,
      condition: day.day === 'Today' ? 'clear' as WeatherCondition : day.condition,
    })),
  },
  
  'riyadh': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'Riyadh',
      region: 'Riyadh Province',
      country: 'Saudi Arabia',
      latitude: 24.7136,
      longitude: 46.6753,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 99,
      feelsLike: 100,
      humidity: 20,
      condition: 'clear',
      description: 'Very hot',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: day.tempHigh + 22,
      tempLow: day.tempLow + 18,
      condition: day.day === 'Today' ? 'clear' as WeatherCondition : day.condition,
      precipitation: 0,
    })),
  },
  
  'doha': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'Doha',
      region: 'Doha',
      country: 'Qatar',
      latitude: 25.2854,
      longitude: 51.5310,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 92,
      feelsLike: 94,
      humidity: 55,
      condition: 'clear',
      description: 'Hot and humid',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: day.tempHigh + 18,
      tempLow: day.tempLow + 14,
      condition: day.day === 'Today' ? 'clear' as WeatherCondition : day.condition,
    })),
  },
  
  'paris': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'Paris',
      region: 'Île-de-France',
      country: 'France',
      latitude: 48.8566,
      longitude: 2.3522,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 14,
      feelsLike: 13,
      humidity: 70,
      condition: 'partly-cloudy',
      description: 'Partly cloudy',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: 16 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 5) - 2),
      tempLow: 10 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 3) - 1),
      condition: mockWeatherData.daily[0].condition
    })),
  },
  'berlin': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'Berlin',
      region: 'Berlin',
      country: 'Germany',
      latitude: 52.5200,
      longitude: 13.4050,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 11,
      feelsLike: 9,
      humidity: 75,
      condition: 'cloudy',
      description: 'Overcast',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: 13 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 4) - 2),
      tempLow: 7 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 3) - 1),
      condition: mockWeatherData.daily[0].condition
    })),
  },
  'moscow': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'Moscow',
      region: 'Moscow',
      country: 'Russia',
      latitude: 55.7558,
      longitude: 37.6173,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 5,
      feelsLike: 2,
      humidity: 85,
      condition: 'snow',
      description: 'Light snow',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: 7 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 3) - 1),
      tempLow: 0 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 3) - 2),
      condition: ['snow', 'cloudy', 'partly-cloudy'][Math.floor(Math.random() * 3)] as WeatherCondition,
    })),
  },
  'mumbai': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'Mumbai',
      region: 'Maharashtra',
      country: 'India',
      latitude: 19.0760,
      longitude: 72.8777,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 32,
      feelsLike: 35,
      humidity: 80,
      condition: 'clear',
      description: 'Hot and humid',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: 33 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 2)),
      tempLow: 28 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 2) - 1),
      condition: day.condition as WeatherCondition,
    })),
  },
  'mexico-city': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'Mexico City',
      region: 'CDMX',
      country: 'Mexico',
      latitude: 19.4326,
      longitude: -99.1332,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 23,
      feelsLike: 24,
      humidity: 60,
      condition: 'clear',
      description: 'Sunny',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: 25 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 3) - 1),
      tempLow: 18 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 2) - 1),
      condition: mockWeatherData.daily[0].condition
    })),
  },
  'sao-paulo': {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      name: 'São Paulo',
      region: 'São Paulo',
      country: 'Brazil',
      latitude: -23.5505,
      longitude: -46.6333,
    },
    current: {
      ...mockWeatherData.current,
      temperature: 27,
      feelsLike: 29,
      humidity: 75,
      condition: 'rain',
      description: 'Tropical rain',
    },
    daily: mockWeatherData.daily.map(day => ({
      ...day,
      tempHigh: 29 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 3) - 1),
      tempLow: 22 + (day.day === 'Today' ? 0 : Math.floor(Math.random() * 2) - 1),
      condition: ['rain', 'showers', 'cloudy'][Math.floor(Math.random() * 3)] as WeatherCondition,
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
  {
    id: 'dubai',
    name: 'Dubai',
    region: 'Dubai',
    country: 'United Arab Emirates',
    latitude: 25.2048,
    longitude: 55.2708,
  },
  {
    id: 'cairo',
    name: 'Cairo',
    region: 'Cairo Governorate',
    country: 'Egypt',
    latitude: 30.0444,
    longitude: 31.2357,
  },
  {
    id: 'riyadh',
    name: 'Riyadh',
    region: 'Riyadh Province',
    country: 'Saudi Arabia',
    latitude: 24.7136,
    longitude: 46.6753,
  },
  {
    id: 'doha',
    name: 'Doha',
    region: 'Doha',
    country: 'Qatar',
    latitude: 25.2854,
    longitude: 51.5310,
  },
  {
    id: 'marrakech',
    name: 'مراكش',  // Marrakech in Arabic
    region: 'Marrakech-Safi',
    country: 'Morocco',
    latitude: 31.6295,
    longitude: -7.9811,
  },
  {
    id: 'amman',
    name: 'عمّان',  // Amman in Arabic
    region: 'Amman Governorate',
    country: 'Jordan',
    latitude: 31.9454,
    longitude: 35.9284,
  },
  // Additional international locations
  {
    id: 'paris',
    name: 'Paris',
    region: 'Île-de-France',
    country: 'France',
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    id: 'berlin',
    name: 'Berlin',
    region: 'Berlin',
    country: 'Germany',
    latitude: 52.5200,
    longitude: 13.4050,
  },
  {
    id: 'moscow',
    name: 'Москва', // Moscow in Russian
    region: 'Moscow',
    country: 'Russia',
    latitude: 55.7558,
    longitude: 37.6173,
  },
  {
    id: 'mumbai',
    name: 'मुंबई', // Mumbai in Hindi
    region: 'Maharashtra',
    country: 'India',
    latitude: 19.0760,
    longitude: 72.8777,
  },
  {
    id: 'mexico-city',
    name: 'Ciudad de México',
    region: 'CDMX',
    country: 'Mexico',
    latitude: 19.4326,
    longitude: -99.1332,
  },
  {
    id: 'sao-paulo',
    name: 'São Paulo',
    region: 'São Paulo',
    country: 'Brazil',
    latitude: -23.5505,
    longitude: -46.6333,
  },
  {
    id: 'beijing',
    name: '北京', // Beijing in Chinese
    region: 'Beijing',
    country: 'China',
    latitude: 39.9042,
    longitude: 116.4074,
  },
  {
    id: 'istanbul',
    name: 'İstanbul',
    region: 'Istanbul',
    country: 'Turkey',
    latitude: 41.0082,
    longitude: 28.9784,
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    region: 'Buenos Aires',
    country: 'Argentina',
    latitude: -34.6037,
    longitude: -58.3816,
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    region: 'Western Cape',
    country: 'South Africa',
    latitude: -33.9249,
    longitude: 18.4241,
  },
  {
    id: 'bangkok',
    name: 'กรุงเทพมหานคร', // Bangkok in Thai
    region: 'Bangkok',
    country: 'Thailand',
    latitude: 13.7563,
    longitude: 100.5018,
  },
  {
    id: 'jerusalem',
    name: 'ירושלים', // Jerusalem in Hebrew
    region: 'Jerusalem District',
    country: 'Israel',
    latitude: 31.7683,
    longitude: 35.2137,
  },
];

// Helper function to get day name
function getDayName(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

// Function to fetch weather data - convert from Fahrenheit to Celsius as our base unit
export const getWeatherData = async (location?: string): Promise<WeatherData> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      if (location && mockLocationData[location.toLowerCase()]) {
        resolve(mockLocationData[location.toLowerCase()]);
      } else {
        // Convert the default weather data to use Celsius
        const celsiusData = {
          ...mockWeatherData,
          current: {
            ...mockWeatherData.current,
            temperature: Math.round((mockWeatherData.current.temperature - 32) * 5/9),
            feelsLike: Math.round((mockWeatherData.current.feelsLike - 32) * 5/9),
          },
          daily: mockWeatherData.daily.map(day => ({
            ...day,
            tempHigh: Math.round((day.tempHigh - 32) * 5/9),
            tempLow: Math.round((day.tempLow - 32) * 5/9),
          })),
          hourly: mockWeatherData.hourly.map(hour => ({
            ...hour,
            temperature: Math.round((hour.temperature - 32) * 5/9),
          })),
        };
        resolve(celsiusData);
      }
    }, 800);
  });
};

// Improve the searchLocations function to better handle international characters
export const searchLocations = async (query: string): Promise<LocationSearchResult[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      if (!query.trim()) {
        resolve([]);
        return;
      }
      
      // Normalize the search query for better matching with international characters
      const normalizedQuery = query.toLowerCase().trim();
      
      const results = mockSearchResults.filter(
        location => location.name.toLowerCase().includes(normalizedQuery) ||
                   location.region.toLowerCase().includes(normalizedQuery) ||
                   location.country.toLowerCase().includes(normalizedQuery)
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
