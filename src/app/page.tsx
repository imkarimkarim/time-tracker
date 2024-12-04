"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [tracking, setTracking] = useState(false);
  const [timeTracked, setTimeTracked] = useState(0);
  const intervalRef = useRef<any>();

  const handleClick = () => {
    if (tracking) {
      setTracking(false);
      clearInterval(intervalRef.current);
    } else {
      setTracking(true);
      intervalRef.current = setInterval(() => {
        setTimeTracked((prev) => {
          localStorage.setItem("TIME_TRACKED", prev + 1 + "");
          return prev + 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    setTimeTracked(Number(localStorage.getItem("TIME_TRACKED")));
  }, []);

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <button onClick={handleClick}>
        {tracking ? "stop tracking" : "track time"}
      </button>
      <p>{timeTracked}</p>
    </div>
  );
}
