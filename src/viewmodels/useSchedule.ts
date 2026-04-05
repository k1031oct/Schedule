import { useState, useEffect, useMemo } from 'react';
import { ScheduleViewModel } from './ScheduleViewModel';
import { initialScheduleUiState, ScheduleUiState } from '../states/ScheduleUiState';

export function useSchedule() {
  const [state, setState] = useState<ScheduleUiState>(initialScheduleUiState);
  
  const viewModel = useMemo(() => new ScheduleViewModel(state, setState), [state, setState]);

  useEffect(() => {
    viewModel.initialize();
  }, []);

  return {
    state,
    viewModel
  };
}
