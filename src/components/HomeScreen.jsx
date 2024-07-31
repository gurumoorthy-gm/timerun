import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import Timer from "./Timer";
import InactivityScreen from "./InactivityScreen";
import IdleScreen from "./IdleScreen";
import "../App.css";
import {
  tableStyles,
  tableHeaderStyles,
  CustomTableBody,
  CustomTableCell,
  logoHeaderStyles,
  titleDateStyles,
  titleStyles,
} from "../styles/HomeScreen";
import { green, orange } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { dayActivity } from "../common/constant";
import BreakButton from "./BreakButton";
import { breakTime, working } from "../store/activity";
import { setTime } from "../store/workedTime";

const HomeScreen = ({ profile }) => {
  const [actionButton, setActionButton] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalWorkedTime, setTotalWorkedTime] = useState("");
  const [idleTime, setIdleTime] = useState({ seconds: 0, totalIdleTime: "" });
  const [resumeTime, setResumeTime] = useState("");
  const [inactiveTime, setInactiveTime] = useState("");

  const activity = useSelector((state) => state.activity.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    setActionButton(!actionButton);
    if (actionButton) {
      dispatch(breakTime());
    } else {
      if (activity === dayActivity.start)
        setStartTime(moment(new Date()).format("hh:mm A"));
      dispatch(working());
    }
  };

  const handleTotalWorkedTime = (seconds) => {
    dispatch(setTime(seconds));
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    setTotalWorkedTime(hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`);
  };

  const handleTotalIdleTime = (seconds) => {
    const totalSeconds = idleTime.seconds ? idleTime.seconds + seconds : seconds;
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    setIdleTime({
      seconds: totalSeconds,
      totalIdleTime: hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`,
    });
  };

  const handleEndTime = (endTime) => {
    if (endTime) {
      setEndTime(moment(new Date()).format("hh:mm A"));
    }
  };

  const handleResumeTime = (secs) => {
    setResumeTime(secs);
  };

  const handleInactiveTime = (time) => {
    setInactiveTime(time);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "32rem",
      }}
      aria-label="simple table"
    >
      <div style={{ ...logoHeaderStyles }} variant="head">
        <img
          src="/assets/time-logo.svg"
          style={{ paddingRight: "2%" }}
          width="50"
          height="50"
          alt="Time Logo"
        ></img>
        <h1 style={{ ...titleStyles }}>Time Run</h1>

        <div style={{ ...titleDateStyles }}>
          {moment(new Date()).format("DD-MMM-YYYY (dddd)")}
        </div>
      </div>

      {actionButton ? (
        <InactivityScreen
          setActionButton={setActionButton}
          sendInactiveTime={handleInactiveTime}
        />
      ) : null}

      {activity === dayActivity.idle ? (
        <IdleScreen
          inactiveTime={inactiveTime}
          setActionButton={setActionButton}
          idleTime={handleTotalIdleTime}
        />
      ) : (
        <Table
          sx={
            activity === dayActivity.start || activity === dayActivity.working
              ? { ...tableStyles }
              : { ...tableStyles, borderColor: orange["A400"] }
          }
          aria-label="simple table"
        >
          <TableHead
            sx={
              activity === dayActivity.start || activity === dayActivity.working
                ? { bgcolor: green["A700"] }
                : { bgcolor: orange["A400"] }
            }
          >
            <TableRow>
              <TableCell sx={{ ...tableHeaderStyles }}>
                <Timer
                  activity={activity}
                  workedTime={handleTotalWorkedTime}
                  resumeTime={resumeTime}
                />
              </TableCell>
            </TableRow>
          </TableHead>

          <CustomTableBody>
            <TableRow sx={{ display: "flex", width: "100%", height: "11rem" }}>
              <CustomTableCell>
                <p style={{ margin: 0, padding: "2%" }}>
                  Welcome, {profile?.name}
                </p>
                <p style={{ margin: 0, padding: "2%" }}>
                  Worked for {totalWorkedTime}
                </p>
                <p style={{ margin: 0, padding: "2%" }}>
                  Idle for {idleTime.totalIdleTime}
                </p>
                <p style={{ margin: 0, padding: "2%" }}>
                  Started at {startTime}
                </p>
                {endTime ? (
                  <div style={{ padding: "2%" }}>Finished at {endTime}</div>
                ) : null}
              </CustomTableCell>
              <TableCell>
                <Button variant="text" onClick={handleClick}>
                  {activity === dayActivity.working ? (
                    <img
                      className="image-logo"
                      alt="Action Button"
                      src="/assets/pause-button.svg"
                      width="80"
                      height="80"
                    ></img>
                  ) : activity === dayActivity.break ? (
                    <img
                      className="image-logo"
                      alt="Action Button"
                      src="/assets/orange-play-button.svg"
                      width="80"
                      height="80"
                    ></img>
                  ) : (
                    <img
                      className="image-logo"
                      alt="Action Button"
                      src="/assets/green-play-button.svg"
                      width="80"
                      height="80"
                    ></img>
                  )}
                </Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ display: "flex", width: "100%", height: "8rem" }}>
              {(activity === dayActivity.break || activity === dayActivity.resume) ? (
                <BreakButton
                  setEndTime={handleEndTime}
                  resumeTime={handleResumeTime}
                />
              ) : null}
            </TableRow>
          </CustomTableBody>
        </Table>
      )}
    </Box>
  );
};

export default HomeScreen;
