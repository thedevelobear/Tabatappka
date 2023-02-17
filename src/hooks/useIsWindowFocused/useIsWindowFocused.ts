import { useState, useEffect, useCallback } from 'react';

import debounce from 'lodash/debounce';

import type { UseIsWindowFocusedType } from '@app/hooks/useIsWindowFocused/useIsWindowFocused.interface';

export const useIsWindowFocused: UseIsWindowFocusedType = () => {
  const [windowIsActive, setWindowIsActive] = useState<boolean>(true);

  const debouncedActivity = debounce(
    (event: { type: string }) => {
      if (event?.type == 'focus') {
        return setWindowIsActive(true);
      }
      if (event?.type == 'blur') {
        return setWindowIsActive(false);
      }
      if (event?.type == 'visibilitychange') {
        return document.hidden
          ? setWindowIsActive(false)
          : setWindowIsActive(true);
      }
    },
    100,
    { leading: false },
  );

  const handleActivity = useCallback(debouncedActivity, [debouncedActivity]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleActivity);
    document.addEventListener('blur', handleActivity);
    window.addEventListener('blur', handleActivity);
    window.addEventListener('focus', handleActivity);
    document.addEventListener('focus', handleActivity);

    return () => {
      window.removeEventListener('blur', handleActivity);
      document.removeEventListener('blur', handleActivity);
      window.removeEventListener('focus', handleActivity);
      document.removeEventListener('focus', handleActivity);
      document.removeEventListener('visibilitychange', handleActivity);
    };
  }, [handleActivity]);

  return windowIsActive;
};
