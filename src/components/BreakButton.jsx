import { Box, Button, TableCell } from "@mui/material";
import React, { useRef, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import "../App.css";
import {
  breakButtonMainStyles,
  buttonGroupStyles,
  breakButtonStyles,
} from "../styles/BreakButton";
import { end, resume, working } from "../store/activity";

const BreakButton = ({ setEndTime, resumeTime }) => {
  const dispatch = useDispatch();
  const [breakStartTime, setBreakStartTime] = useState({});

  const intervalRef = useRef(null);
  const handleFinishButton = () => {
    setEndTime(true);
    dispatch(end());
  };

  const handleBreakButton = (mins) => {
    dispatch(resume());
    setBreakStartTime({
      duration: mins,
      startTime: moment(new Date()).format("HH:mm A"),
    });
    resumeTime(mins * 60);
    intervalRef.current = setTimeout(() => {
      dispatch(working());
      setBreakStartTime({});
    }, mins * 60 * 1000);

    return () => clearInterval(intervalRef.current);
  };
  return (
    <TableCell style={{ ...breakButtonMainStyles }}>
      <p style={{ margin: "0% 0% 1% 10%" }}>Resume Time run after..</p>
      <div style={{ ...buttonGroupStyles }}>
        <Button
          sx={{ width: "30%", textTransform: "none" }}
          onClick={() => {
            handleBreakButton(15);
          }}
        >
          <Box
            sx={
              breakStartTime && breakStartTime.duration === 15
              ? { ...breakButtonStyles, background: "red" }
              : { ...breakButtonStyles }
            }
          >
            <img
              className="break-button"
              src="assets/phone-call.svg"
              width="30"
              height="30"
              alt="Break Button"
            ></img>
            15 minutes
            <br />
            {(breakStartTime && breakStartTime.duration === 15) && breakStartTime.startTime}
          </Box>
        </Button>
        <Button
          sx={{ width: "30%", textTransform: "none" }}
          onClick={() => {
            handleBreakButton(30);
          }}
        >
          <Box
            sx={
              breakStartTime && breakStartTime.duration === 30
                ? { ...breakButtonStyles, background: "red" }
                : { ...breakButtonStyles }
            }
          >
            <img
              className="break-button"
              src="assets/coffee.svg"
              width="30"
              height="30"
              alt="Break Button"
            ></img>
            30 minutes
            <br />
            {(breakStartTime && breakStartTime.duration === 30) && breakStartTime.startTime}
          </Box>
        </Button>
        <Button
          sx={{ width: "30%", textTransform: "none" }}
          onClick={handleFinishButton}
        >
          <Box sx={{ ...breakButtonStyles }}>
            <img
              className="break-button"
              src="assets/person-walk.svg"
              width="30"
              height="30"
              alt="Break Button"
            ></img>
            Finish
          </Box>
        </Button>
      </div>
    </TableCell>
  );
};

export default BreakButton;
