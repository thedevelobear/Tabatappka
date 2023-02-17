export interface WorkoutConfig {
  roundTime: number;
  roundBreakTime: number;
  exerciseCount: number;
  roundCount: number;
  exerciseBreakTime: number;
  withSound: boolean;
}

export enum WorkoutTimelineItemStatuses {
  exercise = 'exercise',
  break = 'break',
}

export interface WorkoutTimelineItem {
  time: number;
  title: string;
  subtitle: string;
  status: typeof WorkoutTimelineItemStatuses[keyof typeof WorkoutTimelineItemStatuses];
}

export type PrepareWorkoutTimelineFunction = (
  config: WorkoutConfig,
) => WorkoutTimelineItem[];
