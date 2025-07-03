import { useState, useRef, useCallback, useEffect } from "react";

interface TimerOption {
  initialTime: number;
  interval: number;
  countDown: boolean;
}

type UserReturn = {
  time: number;
  start: () => void;
  stop: () => void;
  restart: () => void;
  isRunning: boolean;
};

const useTimer = ({
  initialTime,
  interval,
  countDown,
}: TimerOption): UserReturn => {
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (countDown) {
          setTime((prev) => (prev > 0 ? prev - 1 : 0));
        } else {
          setTime((prev) => prev + 1);
        }
      }, interval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [countDown, interval, isRunning]);

  const start = useCallback(() => setIsRunning(true), []);

  const stop = useCallback(() => setIsRunning(false), []);

  const restart = useCallback(() => {
    setTime(0);
    setIsRunning(true);
  }, []);

  return { time, start, stop, restart, isRunning };
};

export default useTimer;
