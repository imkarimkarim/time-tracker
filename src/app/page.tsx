"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [tracking, setTracking] = useState(false);
  const [timeTracked, setTimeTracked] = useState(0);
  const intervalRef = useRef<any>();

  // restore persisted data
  useEffect(() => {
    setTimeTracked(Number(localStorage.getItem("TIME_TRACKED")));
  }, []);

  // main
  const toggleTracking = () => {
    if (tracking) {
      setTracking(false);
      clearInterval(intervalRef.current);
    } else {
      setTracking(true);
      intervalRef.current = setInterval(() => {
        setTimeTracked((prev) => {
          const tmp = prev + 1;
          localStorage.setItem("TIME_TRACKED", tmp.toString());
          document.title = tmp.toString();
          return tmp;
        });
      }, 1000);
    }
  };

  // toggle with keyboard (space key)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        toggleTracking();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <button onClick={toggleTracking}>
        {tracking ? "stop tracking" : "track time"}
      </button>
      <p>{timeTracked}</p>
    </div>
  );
}
