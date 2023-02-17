import type { CSSProperties } from 'react';
import { useMemo } from 'react';

import {
  ArrowSmallLeftIcon,
  PauseIcon,
  PlayIcon,
} from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useReward } from 'react-rewards';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { Checkmark } from '@app/assets';
import { WebGlGradient } from '@app/components/common/WebGLGradient';
import { prepareWorkoutTimeline, ROUTES } from '@app/helpers';
import { useWorkoutTimer } from '@app/hooks/useWorkoutTimer';
import { TimerStatus } from '@app/hooks/useWorkoutTimer/useWorkoutTimer.interface';
import type { WorkoutConfig } from '@app/main.interface';
import { WorkoutTimelineItemStatuses } from '@app/main.interface';

export const WorkoutPage = () => {
  const navigate = useNavigate();

  const workoutConfig = useLoaderData() as WorkoutConfig;

  const { reward } = useReward('balloons', 'balloons', {
    colors: ['#B9BEFF', '#EAE2FF', '#6EC3F4', '#C3E4FF'],
    elementSize: 40,
    onAnimationComplete: () => navigate(ROUTES.setup),
  });

  const {
    time,
    percentage,
    title,
    subtitle,
    workoutStatus,
    timerStatus,
    pause,
    resume,
  } = useWorkoutTimer({
    initialWorkoutTimeline: prepareWorkoutTimeline(workoutConfig),
    withSound: workoutConfig.withSound,
    preWorkoutItem: {
      time: 10,
      title: 'Przygotuj się!',
      subtitle: 'Będzie bolało.',
      status: WorkoutTimelineItemStatuses.break,
    },
    postWorkoutItem: {
      time: 60,
      title: 'Oddychaj!',
      subtitle: 'Dobra robota, czas się porozciągać.',
      status: WorkoutTimelineItemStatuses.break,
    },
    onWorkoutOver: () => {
      reward();
    },
  });

  const handleGoBack = () => {
    navigate(ROUTES.setup);
  };

  const circularProgressStyles = useMemo(() => {
    return {
      '--value': percentage,
      '--size': '20rem',
      '--thickness': '1.5rem',
      color: percentage === 0 ? 'transparent' : 'white',
    } as CSSProperties;
  }, [percentage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2 } }}
      transition={{ duration: 0.5 }}
    >
      <section className="min-w-screen relative min-h-screen bg-gradient-to-r from-gradientFrom to-gradientTo">
        <div className="min-w-screen flex min-h-screen flex-1 flex-col flex-col items-center justify-center p-8">
          <ArrowSmallLeftIcon
            className="z-10 h-6 w-6 self-start stroke-white stroke-2 text-white"
            onClick={handleGoBack}
          />
          <div className="z-10 flex flex-1 flex-col items-center justify-center font-bold tracking-tight text-white">
            <motion.h2
              key={`title-${workoutStatus}`}
              className="text-4xl font-extrabold sm:text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h2>
            <motion.h3
              key={`subtitle-${workoutStatus}`}
              className="text-center text-2xl text-white text-opacity-70 sm:text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {subtitle}
            </motion.h3>
          </div>
          <div className="z-10 flex flex-1 items-center justify-center">
            <motion.div
              key={`progress-${workoutStatus}`}
              className="radial-progress"
              style={circularProgressStyles}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1
                key={
                  workoutStatus
                    ? `time-${workoutStatus}`
                    : `time-${WorkoutTimelineItemStatuses.break}`
                }
                className="text-6xl font-bold tracking-tight text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span>
                  {time > 0 ? time : <Checkmark className="text-8xl" />}
                </span>
              </motion.h1>
            </motion.div>
          </div>
          <div className="z-10 flex flex-1 items-center justify-center">
            {workoutStatus && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  type="button"
                  disabled={timerStatus === TimerStatus.stopped}
                  onClick={timerStatus === TimerStatus.running ? pause : resume}
                  className="btn-white btn-outline btn-circle btn-lg btn border-4 border-white text-white hover:border-white hover:bg-white hover:bg-opacity-20 focus:border-white focus:bg-white focus:bg-opacity-20 active:border-white active:bg-white active:bg-opacity-20"
                >
                  {timerStatus === TimerStatus.running ? (
                    <PauseIcon className="h-8 w-8" />
                  ) : (
                    <PlayIcon className="h-8 w-8" />
                  )}
                </button>
              </motion.div>
            )}
          </div>
        </div>
        <WebGlGradient
          aria-hidden="true"
          className="absolute inset-0 z-0 flex flex-none flex-col"
          color1="#C3E4FF"
          color2="#6EC3F4"
          color3="#EAE2FF"
          color4="#B9BEFF"
        />
        <AnimatePresence>
          {(!workoutStatus ||
            workoutStatus === WorkoutTimelineItemStatuses.break) && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute inset-0 bg-red-600 opacity-30" />
            </motion.span>
          )}
        </AnimatePresence>
        <span
          id="balloons"
          className="absolute absolute bottom-0 right-1/2 left-1/2 z-20"
        />
      </section>
    </motion.div>
  );
};

WorkoutPage.displayName = 'WorkoutPage';
