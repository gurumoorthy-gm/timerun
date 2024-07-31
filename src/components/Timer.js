import React, { useState, useEffect, useRef } from "react";
import { dayActivity } from "../common/constant";
import { useSelector } from "react-redux";

const Timer = ({ activity, workedTime, resumeTime }) => {
  const storeWorkedTime = useSelector((state) => state.workedTime.value);
  const [seconds, setSeconds] = useState(storeWorkedTime);
  const [resumeTimeInSeconds, setResumeTimeInSeconds] = useState(resumeTime);
  const [breakTimeInSeconds, setBreakTimeInSeconds] = useState(3600);
  const intervalRef = useRef(null);

  useEffect(() => {
    setResumeTimeInSeconds(resumeTime);
  }, [resumeTime]);

  useEffect(() => {
    if (activity !== dayActivity.start) {
      intervalRef.current = setInterval(() => {
        if (activity === dayActivity.working) {
          setSeconds((prevSeconds) => prevSeconds + 1);
        } else if (activity === dayActivity.break) {
          setBreakTimeInSeconds((prevTimer) => {
            if (prevTimer > 0) {
              return prevTimer - 1;
            } else {
              clearInterval(intervalRef.current);
              return 0;
            }
          });
        } else {
          setResumeTimeInSeconds((prevTimer) => {
            if (prevTimer > 0) {
              return prevTimer - 1;
            } else {
              clearInterval(intervalRef.current);
              return 0;
            }
          });
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [activity]);

  useEffect(() => {
    workedTime(seconds);
  }, [seconds, workedTime]);

  const secondsToHms = (seconds) => {
    const hrs =
      activity !== dayActivity.resume ? Math.floor(seconds / 3600) : 0;
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const formattedHrs = String(hrs).padStart(2, "0");
    const formattedMins = String(mins).padStart(2, "0");
    const formattedSecs = String(secs).padStart(2, "0");

    return `${activity} - ${formattedHrs}:${formattedMins}:${formattedSecs}`;
  };

  return (
    <React.Fragment>
      {secondsToHms(
        activity === dayActivity.break
          ? breakTimeInSeconds
          : activity === dayActivity.resume
          ? resumeTimeInSeconds
          : seconds
      )}
    </React.Fragment>
  );
};

export default Timer;
