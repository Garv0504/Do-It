export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  weather?: {
    temp: number;
    description: string;
    icon: string;
  };
  completed: boolean;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
}