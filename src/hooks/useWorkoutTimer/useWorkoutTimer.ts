import { useCallback, useEffect, useMemo, useReducer } from 'react';

import useSound from 'use-sound';

import { beep } from '@app/assets';
import { useIsWindowFocused } from '@app/hooks/useIsWindowFocused';

import { reducer } from './state/reducer';
import { TimerStatus } from './useWorkoutTimer.interface';

import type { Config, ReturnValue } from './useWorkoutTimer.interface';

const TIMER_INTERVAL = 1000;

export const useWorkoutTimer = ({
  initialWorkoutTimeline,
  preWorkoutItem,
  postWorkoutItem,
  withSound,
  onWorkoutOver,
}: Config): ReturnValue => {
  const isWindowFocused = useIsWindowFocused();
  const [play] = useSound(beep);

  const initialTimeline = useMemo(
    () => [
      ...(preWorkoutItem ? [preWorkoutItem] : []),
      ...initialWorkoutTimeline,
      ...(postWorkoutItem ? [postWorkoutItem] : []),
    ],
    [preWorkoutItem, initialWorkoutTimeline, postWorkoutItem],
  );

  const initialTime = useMemo(() => initialTimeline[0].time, [initialTimeline]);

  const [state, dispatch] = useReducer(reducer, {
    status: TimerStatus.stopped,
    time: initialTime,
    timeline: initialTimeline,
  });

  const { status, time, timeline } = state;

  const currentTimelineItem = timeline[0];

  // Resume timer. Remove one second to make the interaction less laggy (otherwise resuming makes the user wait a second without any visual feedback)
  const resume = useCallback(() => {
    dispatch({ type: 'start', payload: time > 1 ? time - 1 : time });
  }, [time]);

  const pause = useCallback(() => {
    dispatch({ type: 'pause' });
  }, []);

  useEffect(() => {
    if (!isWindowFocused && status === TimerStatus.running) {
      dispatch({ type: 'pause' });
    }
  }, [isWindowFocused, status]);

  // Start the timer initially
  useEffect(() => {
    dispatch({ type: 'start', payload: time });
  }, [time]);

  // Advance time if timer is running. Play sound for the last three seconds
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (status === TimerStatus.running) {
      intervalId = setInterval(() => {
        dispatch({
          type: 'set',
          payload: time - 1,
        });

        if (!withSound) return;

        if (time >= 1 && time <= 4) {
          play({ playbackRate: 1 });
        }
        if (time === 1) {
          play({ playbackRate: 1.5 });
        }
      }, TIMER_INTERVAL);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [status, time, play]);

  // Stop timer and advance timeline.
  useEffect(() => {
    if (status !== TimerStatus.stopped && time < 0) {
      dispatch({ type: 'stop' });
      dispatch({ type: 'advanceTimeline' });
    }
  }, [time, status]);

  // Start the timer when timeline was advanced. If no elements left, stop the timer.
  useEffect(() => {
    if (currentTimelineItem) {
      dispatch({ type: 'start', payload: currentTimelineItem.time });
    } else {
      dispatch({ type: 'stop' });
    }
  }, [currentTimelineItem]);

  // Call onWorkoutOver callback when timeline is empty and the callback is available.
  useEffect(() => {
    if (
      !currentTimelineItem &&
      status === TimerStatus.stopped &&
      typeof onWorkoutOver === 'function'
    ) {
      onWorkoutOver();
    }
  }, [currentTimelineItem, status, onWorkoutOver]);

  const percentage = useMemo(() => {
    return currentTimelineItem ? (time * 100) / currentTimelineItem.time : 100;
  }, [time, currentTimelineItem]);

  return {
    time,
    percentage,
    title: currentTimelineItem?.title,
    subtitle: currentTimelineItem?.subtitle,
    workoutStatus: currentTimelineItem?.status,
    timerStatus: status,
    pause,
    resume,
  };
};
