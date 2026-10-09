import { useEffect, useState } from 'react';

const CONFIRM_WINDOW_MS = 4000;

interface ConfirmTap {
  armedKey: string | null;
  tap: (key: string, action: () => void) => void;
}

/** Runs an action only on a second tap of the same key within the confirm window. */
export function useConfirmTap(): ConfirmTap {
  const [armedKey, setArmedKey] = useState<string | null>(null);

  useEffect(() => {
    if (armedKey === null) return;
    const timer = window.setTimeout(() => setArmedKey(null), CONFIRM_WINDOW_MS);
    return () => window.clearTimeout(timer);
  }, [armedKey]);

  const tap = (key: string, action: () => void): void => {
    if (armedKey !== key) {
      setArmedKey(key);
      return;
    }
    setArmedKey(null);
    action();
  };

  return { armedKey, tap };
}
