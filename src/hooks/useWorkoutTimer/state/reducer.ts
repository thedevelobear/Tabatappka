import { TimerStatus } from '../useWorkoutTimer.interface';

import type { Action, State } from '../useWorkoutTimer.interface';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'start': {
      return {
        ...state,
        status: TimerStatus.running,
        time: action.payload,
      };
    }
    case 'stop': {
      return {
        ...state,
        status: TimerStatus.stopped,
      };
    }
    case 'pause': {
      return {
        ...state,
        status: TimerStatus.paused,
      };
    }
    case 'resume': {
      return {
        ...state,
        status: TimerStatus.running,
      };
    }
    case 'set': {
      return {
        ...state,
        time: action.payload,
      };
    }
    case 'advanceTimeline': {
      const [, ...timeline] = state.timeline;
      return {
        ...state,
        timeline,
      };
    }
    default: {
      return state;
    }
  }
};
