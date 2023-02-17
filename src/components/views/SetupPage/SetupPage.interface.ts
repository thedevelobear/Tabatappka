import type { WorkoutConfig } from '@app/main.interface';

export interface SetupPageLoaderData {
  workoutConfig?: WorkoutConfig;
  usernameFromDB: string;
}
