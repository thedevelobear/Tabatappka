import type { ClassnamesType } from '@app/helpers/index.interface';
import type { PrepareWorkoutTimelineFunction } from '@app/main.interface';
import { WorkoutTimelineItemStatuses } from '@app/main.interface';

export const classNames = (...classes: ClassnamesType) =>
  classes.filter(Boolean).join(' ');

export const WORKOUT_EMOJI: string[] = ['🧘🏻‍', '🏋🏻', '💪🏻', '🤸🏻‍'];

export const prepareWorkoutTimeline: PrepareWorkoutTimelineFunction = (
  config,
) => {
  const {
    exerciseCount,
    roundCount,
    exerciseBreakTime,
    roundBreakTime,
    roundTime,
  } = config;

  const timelineLength = exerciseCount * (2 * roundCount) - 1;

  const exerciseBreak = {
    title: 'Przerwa',
    subtitle: 'Przygotuj się do kolejnego ćwiczenia!',
    time: exerciseBreakTime,
    status: WorkoutTimelineItemStatuses.break,
  };
  const roundBreak = {
    title: 'Przerwa',
    subtitle: 'Odpocznij',
    time: roundBreakTime,
    status: WorkoutTimelineItemStatuses.break,
  };

  const array = [];
  for (let index = 0; index < timelineLength; index++) {
    if ((index + 1) % (2 * roundCount) === 0) {
      array.push(exerciseBreak);
    } else {
      if (index % 2 === 0) {
        const exerciseNo = Math.floor(index / (2 * roundCount)) + 1;
        const roundNo = (index % (2 * roundCount)) / 2 + 1;

        array.push({
          title: `Ćwiczenie ${exerciseNo}`,
          subtitle: `Runda ${roundNo}`,
          time: roundTime,
          status: WorkoutTimelineItemStatuses.exercise,
        });
      } else {
        array.push(roundBreak);
      }
    }
  }

  return array;
};

export const formatSecondsToString = (duration: number): string => {
  // Hours, minutes and seconds
  const hrs = Math.trunc(duration / 3600);
  const mins = Math.trunc((duration % 3600) / 60);
  const secs = Math.trunc(duration) % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let returnValue = '';

  if (hrs > 0) {
    returnValue += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  returnValue += '' + mins + ':' + (secs < 10 ? '0' : '');
  returnValue += '' + secs;

  return returnValue;
};

export const ROUTES = {
  root: '/',
  setup: '/setup',
  workout: '/workout',
};

export const DATABASE_KEYS = {
  username: 'username',
  workoutConfig: 'workoutConfig',
};
