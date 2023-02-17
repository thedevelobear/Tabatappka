import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import * as localforage from 'localforage';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { WebGlGradient } from '@app/components/common/WebGLGradient';
import type { SplashScreenLoaderData } from '@app/components/views/SplashScreen/SplashScreen.interface';
import { DATABASE_KEYS, ROUTES } from '@app/helpers';

export const SplashScreen = () => {
  const navigate = useNavigate();
  const storedUsername = useLoaderData() as SplashScreenLoaderData;
  const [inputValue, setInputValue] = useState<string>();

  useEffect(() => {
    if (storedUsername) {
      navigate(ROUTES.setup);
    }
  }, [storedUsername, navigate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value || '');
  };

  const handleNavigate = async () => {
    if (!inputValue) return;

    await localforage.setItem(DATABASE_KEYS.username, inputValue);
    navigate(ROUTES.setup);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="min-w-screen relative min-h-screen bg-gradient-to-r from-gradientFrom to-gradientTo">
        <div className="min-w-screen flex min-h-screen flex-1 flex-col p-8">
          <div className="z-20 flex flex-1 flex-col flex-nowrap justify-between gap-2 text-center">
            <section className="flex flex-1 flex-col justify-center">
              <motion.h1
                className="text-6xl font-extrabold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Cześć
              </motion.h1>
              <motion.h2
                className="text-center text-xl text-white text-opacity-80 sm:text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Jak masz na imię?
              </motion.h2>
            </section>
            <section className="flex flex-1 flex-col justify-center">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                className="block w-full border-2 border-l-0 border-r-0 border-t-0 border-b-white bg-transparent text-center text-2xl font-bold tracking-tight text-white focus:border-current focus:ring-0 sm:text-3xl md:text-4xl"
                onChange={handleChange}
              />
            </section>
            <section className="flex flex-1 flex-col justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  onClick={handleNavigate}
                  disabled={!inputValue}
                  className="btn-wide btn mt-16 gap-2 border-0 bg-white text-[#C3A7BC] shadow-xl hover:bg-white focus:bg-white active:bg-white disabled:bg-white disabled:bg-opacity-10"
                >
                  <RocketLaunchIcon className="h-6 w-6" />
                </button>
              </motion.div>
            </section>
          </div>
        </div>
        <div className="absolute inset-0 z-10 bg-red-600 opacity-30" />
        <WebGlGradient
          aria-hidden="true"
          className="absolute inset-0 z-0 flex flex-none flex-col"
          color1="#C3E4FF"
          color2="#6EC3F4"
          color3="#EAE2FF"
          color4="#B9BEFF"
        />
      </section>
    </motion.div>
  );
};

SplashScreen.displayName = 'SplashScreen';
