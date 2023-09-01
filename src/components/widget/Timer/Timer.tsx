import React, { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState({ m: 0, s: 0 });
  const [seconds, setSeconds] = useState(5);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Explicitly specify the type

  const secondsToTime = (secs: number) => ({
    m: Math.floor(secs / 60),
    s: secs % 60,
  });

  const startTimer = () => {
    if (!timer && seconds > 0) {
      setTimer(setInterval(countDown, 1000));
    }
  };

  const countDown = () => {
    if (seconds > 0) {
      const updatedSeconds = seconds - 1;
      setTime(secondsToTime(updatedSeconds));
      setSeconds(updatedSeconds);
    } else {
      clearInterval(timer!); // Use the non-null assertion operator (!)
      setTimer(null);
    }
  };

  useEffect(() => {
    const timeLeftVar = secondsToTime(seconds);
    setTime(timeLeftVar);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [seconds, timer]);

  return (
    <div>
      <button onClick={startTimer}>Start</button>
      m: {time.m} s: {time.s}
    </div>
  );
}

export default Timer;
