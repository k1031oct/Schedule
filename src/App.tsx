import React from 'react';
import { useSchedule } from './viewmodels/useSchedule';
import { Calendar as CalendarIcon, Cloud, Sun, CloudRain, Snowflake, Settings, Plus, LogIn, Loader2 } from 'lucide-react';
import { Calendar } from './components/Calendar';
import { CalendarEvent } from './states/ScheduleUiState';

function App() {
  const { state, viewModel } = useSchedule();

  const getWeatherClass = () => {
    switch (state.weather) {
      case 'sunny': return 'bg-sunny';
      case 'rainy': return 'bg-rainy';
      case 'cloudy': return 'bg-cloudy';
      case 'snowy': return 'bg-snowy';
      default: return '';
    }
  };

  if (state.isLoading) {
    return (
      <div className="dynamic-background" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={48} color="white" />
      </div>
    );
  }

  return (
    <div className={`dynamic-background ${getWeatherClass()}`}>
      <main className="main-layout">
        {/* Calendar Section */}
        <section className="calendar-section glass-container">
          <header style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CalendarIcon size={24} />
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>Schedule</h1>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => viewModel.setWeather('rainy')} // Demo: Change weather
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.5 }}
              >
                Test Rainy
              </button>
              <button className="glass-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer' }}>
                <Plus size={18} /> New Event
              </button>
            </div>
          </header>
          
          <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <Calendar currentDate={state.currentDate} events={state.events} />
          </div>
        </section>

        {/* Sidebar Section */}
        <section className="sidebar-section">
          <div className="glass-container" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)' }}>
                {state.weather === 'sunny' && <Sun size={24} color="#ffd700" />}
                {state.weather === 'rainy' && <CloudRain size={24} color="#a4b0be" />}
                {state.weather === 'cloudy' && <Cloud size={24} color="#dfe4ea" />}
                {state.weather === 'snowy' && <Snowflake size={24} color="#ffffff" />}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>Current Weather</h3>
                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{state.weather.toUpperCase()}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {!state.isLoggedIn ? (
                <button 
                  onClick={() => viewModel.loginWithGoogle()}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', border: 'none', background: '#4285F4', color: 'white', cursor: 'pointer', fontWeight: 500 }}
                >
                  <LogIn size={20} /> Login with Google
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={`https://ui-avatars.com/api/?name=User&background=random`} style={{ width: '32px', height: '32px', borderRadius: '50%' }} alt="user" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Signed In</span>
                </div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>Upcoming Tasks</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {state.events.length > 0 ? (
                    state.events.map((event: CalendarEvent) => (
                        <div key={event.id} style={{ padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>{event.title}</p>
                            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                    ))
                ) : (
                    <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>No events for today</p>
                )}
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Settings size={20} opacity={0.7} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .calendar-day:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Weather Effects */
        .dynamic-background:before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .bg-rainy:before {
          background-image: radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: rain 0.5s linear infinite;
        }

        @keyframes rain {
          from { background-position: 0 0; }
          to { background-position: 0 50px; }
        }

        .bg-snowy:before {
          background-image: radial-gradient(circle at center, rgba(255,255,255,0.3) 2px, transparent 1px);
          background-size: 100px 100px;
          animation: snow 10s linear infinite;
        }

        @keyframes snow {
          from { background-position: 0 0; }
          to { background-position: 20px 100px; }
        }
      `}</style>
    </div>
  );
}

export default App;
