export type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'snowy';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  isGoogleEvent: boolean;
}

export interface ScheduleUiState {
  currentDate: Date;
  events: CalendarEvent[];
  weather: WeatherType;
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const initialScheduleUiState: ScheduleUiState = {
  currentDate: new Date(),
  events: [],
  weather: 'sunny',
  isLoggedIn: false,
  isLoading: false,
};
