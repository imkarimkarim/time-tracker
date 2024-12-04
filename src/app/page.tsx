"use client";

import { useEffect, useRef, useState } from "react";
import { convertToHumanReadable } from "@/lib/utils";

export default function Home() {
  const [tracking, setTracking] = useState(false);
  const [timeTracked, setTimeTracked] = useState(0);
  const intervalRef = useRef<any>();
  const toggleButtonRef = useRef<any>();

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

  // toggle with keyboard
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        toggleButtonRef.current.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <button ref={toggleButtonRef} onClick={toggleTracking}>
        {tracking ? "stop tracking" : "track time"}
      </button>
      {/* raw */}
      <p>{timeTracked}</p>
      <a
        onClick={() => {
          alert(convertToHumanReadable(timeTracked));
        }}
        href="#"
      >
        human readable
      </a>
      {/* human readable */}
      {/* <div className="flex gap-6 opacity-20">
        {Object.keys(time).map((key) => {
          return (
            <div className="text-center">
              <div>{key[0].toUpperCase()}</div>
              <div>{`${String(time[key]).padStart(2, "0")}`}</div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
