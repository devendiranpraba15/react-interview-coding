import { useState } from "react";
import useTimer from "../hooks/useTimer";

const TimerComponent = () => {
  const [isCountdown, setIsCountdown] = useState(false);

  const {
    time,
    isRunning,
    start,
    stop,
    restart
  } = useTimer({
    initialTime: isCountdown ? 10000 : 0, // 10 seconds for countdown
    interval: 1000,
    countDown: isCountdown,
  });

  const toggleMode = () => {
    stop();
    setIsCountdown((prev) => !prev);
  };

  return (
    <>
      <h2>{time / 1000}s</h2>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={restart}>Restart</button>
      <button onClick={toggleMode}>
        Switch to {isCountdown ? "Count Up" : "Count Down"}
      </button>
    </>
  );
};

export default TimerComponent;
