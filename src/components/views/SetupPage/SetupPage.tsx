import { useEffect, useState } from 'react';

import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import * as localforage from 'localforage';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useSound from 'use-sound';

import { beep } from '@app/assets';
import { WebGlGradient } from '@app/components/common/WebGLGradient';
import type { SetupPageLoaderData } from '@app/components/views/SetupPage/SetupPage.interface';
import {
  formatSecondsToString,
  DATABASE_KEYS,
  ROUTES,
  WORKOUT_EMOJI,
} from '@app/helpers';
import type { WorkoutConfig } from '@app/main.interface';

const item = {
  hidden: { x: '-100vw', opacity: 0 },
  show: { x: 0, opacity: 1 },
};

export const SetupPage = () => {
  const { workoutConfig: workoutConfigFromDB, usernameFromDB } =
    useLoaderData() as SetupPageLoaderData;
  const navigate = useNavigate();

  // Using volume 0 to initialize AudioContext before the workout starts
  const [play] = useSound(beep, {
    volume: 0,
  });

  const [currentEmoji, setCurrentEmoji] = useState<string>('');
  const [workoutConfig, setWorkoutConfig] = useState<WorkoutConfig>(
    workoutConfigFromDB || {
      roundTime: 50,
      roundBreakTime: 15,
      exerciseCount: 4,
      roundCount: 4,
      exerciseBreakTime: 50,
      withSound: true,
    },
  );

  useEffect(() => {
    if (!usernameFromDB) {
      navigate(ROUTES.root);
      return;
    }
    setCurrentEmoji(
      WORKOUT_EMOJI[Math.floor(Math.random() * WORKOUT_EMOJI.length)],
    );
  }, []);

  const workoutSettings = [
    {
      name: 'Ilość rund',
      value: workoutConfig.roundCount,
      picker: (
        <input
          type="range"
          min="1"
          max="10"
          step={1}
          value={workoutConfig.roundCount}
          onChange={(event) =>
            setWorkoutConfig((previous) => ({
              ...previous,
              roundCount: +event.target.value,
            }))
          }
          className="range range-error"
        />
      ),
    },
    {
      name: 'Czas trwania rundy',
      value: formatSecondsToString(workoutConfig.roundTime),
      picker: (
        <input
          type="range"
          min="5"
          max="180"
          step={5}
          value={workoutConfig.roundTime}
          onChange={(event) =>
            setWorkoutConfig((previous) => ({
              ...previous,
              roundTime: +event.target.value,
            }))
          }
          className="range range-accent"
        />
      ),
    },
    {
      name: 'Przerwa pomiędzy rundami',
      value: formatSecondsToString(workoutConfig.roundBreakTime),
      picker: (
        <input
          type="range"
          min="5"
          max="180"
          step={5}
          value={workoutConfig.roundBreakTime}
          onChange={(event) =>
            setWorkoutConfig((previous) => ({
              ...previous,
              roundBreakTime: +event.target.value,
            }))
          }
          className="range range-warning"
        />
      ),
    },
    {
      name: 'Ilość ćwiczeń',
      value: workoutConfig.exerciseCount,
      picker: (
        <input
          type="range"
          min="1"
          max="10"
          step={1}
          value={workoutConfig.exerciseCount}
          onChange={(event) =>
            setWorkoutConfig((previous) => ({
              ...previous,
              exerciseCount: +event.target.value,
            }))
          }
          className="range range-primary"
        />
      ),
    },
    {
      name: 'Przerwa pomiędzy ćwiczeniami',
      value: formatSecondsToString(workoutConfig.exerciseBreakTime),
      picker: (
        <input
          type="range"
          min="5"
          max="600"
          step={5}
          value={workoutConfig.exerciseBreakTime}
          onChange={(event) =>
            setWorkoutConfig((previous) => ({
              ...previous,
              exerciseBreakTime: +event.target.value,
            }))
          }
          className="range range-secondary"
        />
      ),
    },
    {
      name: 'Beep boop',
      value: '',
      picker: (
        <button
          className="swap text-8xl"
          onClick={() =>
            setWorkoutConfig((previous) => ({
              ...previous,
              withSound: !previous.withSound,
            }))
          }
        >
          <input
            readOnly
            className="hidden"
            type="checkbox"
            checked={workoutConfig.withSound}
          />
          <span className="swap-on">
            <SpeakerWaveIcon className="h-11 w-11 stroke-2" />
          </span>
          <span className="swap-off">
            <SpeakerXMarkIcon className="h-11 w-11 stroke-2" />
          </span>
        </button>
      ),
    },
  ];

  const handleChangeName = async () => {
    await localforage.removeItem(DATABASE_KEYS.username);
    navigate(ROUTES.root);
  };

  const handleStartWorkout = async () => {
    await localforage.setItem(DATABASE_KEYS.workoutConfig, workoutConfig);
    play();
    navigate(ROUTES.workout);
  };

  return (
    <motion.div
      className="min-w-screen relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="relative flex flex-col items-center bg-gradient-to-r from-gradientFrom to-gradientTo py-32 align-middle">
        <motion.h1
          className="z-10 -mt-8 cursor-pointer text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          onClick={handleChangeName}
        >
          Cześć, {`${usernameFromDB} ${currentEmoji}`}
        </motion.h1>
        <div aria-hidden="true" className="absolute inset-0 z-0 flex flex-col">
          <div className="relative w-full flex-1">
            <div className="absolute inset-0 overflow-hidden">
              <WebGlGradient
                color1="#FE6860"
                color2="#FE8A71"
                color3="#D9BBAE"
                color4="#F3C9BF"
              />
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="collection-heading" className="relative -mt-16">
        <h2 id="collection-heading" className="sr-only">
          Workout settings
        </h2>
        <motion.ol
          transition={{ staggerChildren: 0.1 }}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8"
        >
          {workoutSettings.map((setting) => (
            <motion.li
              key={setting.name}
              variants={item}
              className="flex h-40 flex-col rounded-2xl bg-white shadow-xl shadow-softShadow/25 transition duration-700 hover:shadow-2xl hover:shadow-softShadow/50"
            >
              <div className="flex flex-1 flex-col items-center justify-center">
                <h3 className="mt-1 text-4xl font-semibold">{setting.value}</h3>
                <div className="mt-4 flex w-full items-center justify-center px-4">
                  {setting.picker}
                </div>
              </div>
              <div className="flex-none p-4">
                <p className="text-sm font-semibold">{setting.name}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </section>
      <section className="flex justify-center py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 1.2 }}
        >
          <button
            type="button"
            onClick={handleStartWorkout}
            className="btn-wide btn gap-2 border-0 bg-gradient-to-r from-gradientFrom to-gradientTo text-white shadow-xl shadow-softShadow/25 transition-shadow duration-700 hover:shadow-2xl hover:shadow-softShadow/75"
          >
            <PlayIcon className="h-6 w-6" />
            Start
          </button>
        </motion.div>
      </section>
    </motion.div>
  );
};

SetupPage.displayName = 'SetupPage';
