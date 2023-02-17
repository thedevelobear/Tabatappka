import { AnimatePresence } from 'framer-motion';
import * as localforage from 'localforage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ScrollToTop } from '@app/components/common/ScrollToTop';
import { SetupPage } from '@app/components/views/SetupPage/SetupPage';
import { SplashScreen } from '@app/components/views/SplashScreen';
import { WorkoutPage } from '@app/components/views/WorkoutPage';
import { DATABASE_KEYS, ROUTES } from '@app/helpers';

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ScrollToTop />,
      children: [
        {
          path: ROUTES.root,
          loader: async () => {
            return await localforage.getItem(DATABASE_KEYS.username);
          },
          element: <SplashScreen />,
        },
        {
          path: ROUTES.setup,
          loader: async () => {
            const workoutConfig = await localforage.getItem(
              DATABASE_KEYS.workoutConfig,
            );
            const usernameFromDB = await localforage.getItem(
              DATABASE_KEYS.username,
            );
            return { workoutConfig, usernameFromDB };
          },
          element: <SetupPage />,
        },
        {
          path: ROUTES.workout,
          loader: async () => {
            return await localforage.getItem(DATABASE_KEYS.workoutConfig);
          },
          element: <WorkoutPage />,
        },
      ],
    },
  ]);

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};

export { App };
