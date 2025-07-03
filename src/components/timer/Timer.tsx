"use client";

// import { useState, useRef, type JSX } from "react";

// type TimerChangeType = "start" | "restart" | "stop";

// export default function Timer(): JSX.Element {
//   const [timerValue, seTimerValue] = useState<number>(0);
// //   const [isRunning, setIsRunning] = useState<boolean>(false)
//   const timerRef = useRef<number | null>(null);

//   const handleChangeTimer = (type: TimerChangeType) => {
//     if (type === "restart" && timerRef.current !== null) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//       seTimerValue(0);
//       return;
//     }
//     if (type === "stop" && timerRef.current != null) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//       return;
//     }
//     if (type === "start" && timerRef.current === null) {
//       timerRef.current = setInterval(() => {
//         seTimerValue((prev) => prev + 1);
//       }, 1000);
//     }
//   };

//   return (
//     <>
//       <p>{timerValue}</p>
//       <button onClick={() => handleChangeTimer("start")}>start</button>
//       <button onClick={() => handleChangeTimer("stop")}>stop</button>
//       <button onClick={() => handleChangeTimer("restart")}>restart</button>
//     </>
//   );
// }

import { useState, useRef, useEffect, type JSX } from "react";

export default function Timer(): JSX.Element {
  const [timerValue, setTimerValue] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimerValue((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleStartTimer = () => setIsRunning(true);
  const handleStopTimer = () => setIsRunning(false);
  const handleRestartTimer = () => {
    setTimerValue(0);
    setIsRunning(true);
  };

  return (
    <>
      <p>{timerValue}</p>
      <button onClick={handleStartTimer} disabled={isRunning}>
        start
      </button>
      <button onClick={handleStopTimer} disabled={!isRunning}>
        stop
      </button>
      <button onClick={handleRestartTimer}>restart</button>
    </>
  );
}
