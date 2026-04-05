import { CalendarRepository } from '../repositories/CalendarRepository';
import { ScheduleUiState, initialScheduleUiState, WeatherType, CalendarEvent } from '../states/ScheduleUiState';

export class ScheduleViewModel {
  private repository: CalendarRepository;
  private state: ScheduleUiState;
  private setState: (state: ScheduleUiState) => void;

  constructor(state: ScheduleUiState, setState: (state: ScheduleUiState) => void) {
    this.repository = new CalendarRepository();
    this.state = state;
    this.setState = setState;
  }

  async initialize() {
    this.updateState({ isLoading: true });
    try {
      const events = await this.repository.getEvents();
      this.updateState({ events, isLoading: false });
    } catch (e) {
      console.error('Initialization error', e);
      this.updateState({ isLoading: false });
    }
  }

  setWeather(weather: WeatherType) {
    this.updateState({ weather });
  }

  async addEvent(event: Omit<CalendarEvent, 'id'>) {
    const newEvent: CalendarEvent = {
        ...event,
        id: Math.random().toString(36).substring(2, 9)
    };
    const updatedEvents = [...this.state.events, newEvent];
    this.updateState({ events: updatedEvents });
    await this.repository.saveEvents(updatedEvents);
  }

  async loginWithGoogle() {
      // Mock Google login
      this.updateState({ isLoggedIn: true });
      const googleEvents = await this.repository.fetchGoogleCalendarEvents();
      this.updateState({ events: [...this.state.events, ...googleEvents] });
  }

  private updateState(updates: Partial<ScheduleUiState>) {
    const newState = { ...this.state, ...updates };
    this.state = newState;
    this.setState(newState);
  }
}
