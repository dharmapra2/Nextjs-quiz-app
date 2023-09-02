import React, { useEffect, useMemo, useState } from "react";
import { AppDispatch } from "@/components/redux/store";
import { useDispatch } from "react-redux";
import { clickSave } from "@/components/redux/slices/EditSummarySlice";
import { useRouter } from "next/navigation";

const SECOND = 1000;
const MINUTE = SECOND * 10;

function Timer({ countMin = 30 }: { countMin: number }) {
  const startTime = useMemo(() => Date.now() + countMin * MINUTE, []);
  const [time, setTime] = useState(startTime - Date.now());
  const [timerExpired, setTimerExpired] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();



  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = startTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimerExpired(true);
        dispatch(clickSave());
        setTime(0);
        push(`/reportPage/1`);
      } else {
        setTime(remainingTime);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  const timeUnits = {
    Minutes: Math.floor((time / MINUTE) % 60),
    Seconds: Math.floor((time / SECOND) % 60),
  };

  return (
    <div className="float-right flex gap-2 justify-end w-[400px] font-extrabold text-lg">
      {timerExpired ? (
        <div className={`text-red-500 font-bold`}>Timer's Up!</div>
      ) : (
        Object.entries(timeUnits).map(([label, value]) => (
          <div key={label} className={`flex flex-row gap-1 bg-white font-black`}>
            <p>{`${value}`.padStart(2, "0")}</p>
            <span className="text">{label}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default React.memo(Timer);
