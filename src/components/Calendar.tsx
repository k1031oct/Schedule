import React from 'react';
import { CalendarEvent } from '../states/ScheduleUiState';

interface CalendarProps {
  currentDate: Date;
  events: CalendarEvent[];
}

export const Calendar: React.FC<CalendarProps> = ({ currentDate, events }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get the first day of the month
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)

  // Get total days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Calendar grid calculation
  const calendarDays = [];
  
  // Previous month padding
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthLastDay - i, currentMonth: false });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, currentMonth: true });
  }

  // Next month padding
  const totalCells = 42; // 6 rows
  const remaining = totalCells - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, currentMonth: false });
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', height: '100%' }}>
      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
        <div key={day} style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 700, opacity: 0.3, marginBottom: '8px' }}>
          {day}
        </div>
      ))}
      {calendarDays.map((date, i) => {
        const dayEvents = events.filter(e => 
            e.start.getDate() === date.day && 
            e.start.getMonth() === (date.currentMonth ? month : month + (date.day > 15 ? -1 : 1))
        );

        return (
          <div 
            key={i} 
            className="calendar-day" 
            style={{ 
              minHeight: '100px', 
              padding: '12px', 
              border: '1px solid rgba(255,255,255,0.05)', 
              borderRadius: '12px', 
              background: date.currentMonth ? 'rgba(255,255,255,0.02)' : 'transparent',
              opacity: date.currentMonth ? 1 : 0.3,
              transition: 'all 0.3s ease'
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: date.currentMonth ? 600 : 400 }}>{date.day}</span>
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {dayEvents.slice(0, 2).map(event => (
                <div key={event.id} style={{ fontSize: '0.7rem', padding: '4px 8px', borderRadius: '6px', background: event.isGoogleEvent ? 'rgba(66, 133, 244, 0.2)' : 'rgba(255,255,255,0.1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && <span style={{ fontSize: '0.6rem', opacity: 0.5 }}>+{dayEvents.length - 2} more</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
