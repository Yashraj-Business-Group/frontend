import { useCallback } from 'react';

/**
 * Client-side submission throttle, backed by localStorage. This stops
 * accidental double-submits and casual repeat-clicking through the UI —
 * it is NOT a security boundary, since anyone calling the Supabase API
 * directly (bypassing the browser entirely) skips it completely. Real
 * enforcement lives in supabase/rate_limiting.sql, run at the database
 * level, which this pairs with rather than replaces.
 */
export const useRateLimit = (key: string, maxAttempts: number, windowMs: number) => {
  const storageKey = `rateLimit_${key}`;

  const getTimestamps = (): number[] => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      const cutoff = Date.now() - windowMs;
      return Array.isArray(parsed) ? parsed.filter((t: number) => typeof t === 'number' && t > cutoff) : [];
    } catch {
      return [];
    }
  };

  const checkLimit = useCallback((): { allowed: boolean; retryAfterMs: number } => {
    const timestamps = getTimestamps();
    if (timestamps.length >= maxAttempts) {
      const oldest = Math.min(...timestamps);
      return { allowed: false, retryAfterMs: Math.max(0, oldest + windowMs - Date.now()) };
    }
    return { allowed: true, retryAfterMs: 0 };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, maxAttempts, windowMs]);

  const recordAttempt = useCallback(() => {
    const timestamps = getTimestamps();
    timestamps.push(Date.now());
    localStorage.setItem(storageKey, JSON.stringify(timestamps));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, windowMs]);

  return { checkLimit, recordAttempt };
};

export const formatRetryAfter = (ms: number): string => {
  const minutes = Math.ceil(ms / 60000);
  if (minutes <= 1) return 'a minute';
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.ceil(minutes / 60);
  return hours === 1 ? 'an hour' : `${hours} hours`;
};
