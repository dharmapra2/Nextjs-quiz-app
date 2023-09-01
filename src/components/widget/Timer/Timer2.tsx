import { useEffect, useMemo, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;

export const Timer2 = ({ countMin = 30 }: { countMin: number }) => {
  const startTime = useMemo(() => Date.now() + countMin * MINUTE, []);
  const [time, setTime] = useState(startTime - Date.now());
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = startTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimerExpired(true);
        setTime(0);
      } else {
        setTime(remainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const timeUnits = {
    Minutes: Math.floor((time / MINUTE) % 60),
    Seconds: Math.floor((time / SECOND) % 60),
  };

  return (
    <div className="flex w-2/5">
      {timerExpired ? (
        <div className="text-red-500 font-bold">Timer's Up!</div>
      ) : (
        Object.entries(timeUnits).map(([label, value]) => (
          <div key={label} className="flex flex-row bg-white font-black">
            <p>{`${value}`.padStart(2, "0")}</p>
            <span className="text">{label}</span>
          </div>
        ))
      )}
    </div>
  );
};
