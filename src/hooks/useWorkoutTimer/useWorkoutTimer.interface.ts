import type { WorkoutTimelineItem } from '@app/main.interface';

export enum TimerStatus {
  running = 'RUNNING',
  paused = 'PAUSED',
  stopped = 'STOPPED',
}

export type Config = {
  initialWorkoutTimeline: WorkoutTimelineItem[];
  withSound: boolean;
  preWorkoutItem?: WorkoutTimelineItem;
  postWorkoutItem?: WorkoutTimelineItem;
  onWorkoutOver?: VoidFunction;
};

export interface ReturnValue extends Omit<WorkoutTimelineItem, 'status'> {
  percentage: number;
  pause: VoidFunction;
  resume: VoidFunction;
  workoutStatus: WorkoutTimelineItem['status'];
  timerStatus: typeof TimerStatus[keyof typeof TimerStatus];
}

export interface State {
  status: typeof TimerStatus[keyof typeof TimerStatus];
  time: number;
  timeline: WorkoutTimelineItem[];
}

export type Action =
  | { type: 'start'; payload: number }
  | { type: 'set'; payload: number }
  | { type: 'stop' }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'advanceTimeline' };
