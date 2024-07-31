import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  ButtonGroup,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "../App.css";
import {
  tableStyles,
  tableHeaderStyles,
  CustomTableBody,
  CustomTableCell,
} from "../styles/HomeScreen";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  buttonStyles,
  buttonBoxStyles,
  buttonParentStyles,
} from "../styles/IdleScreen";
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { dayActivity } from "../common/constant";
import { working } from "../store/activity";

const IdleScreen = ({ inactiveTime, setActionButton, idleTime }) => {
  const [idleDuration, setIdleDuration] = useState(0);
  const [viewButton, setViewButton] = useState(true);

  const activity = useSelector((state) => state.activity.value);
  const dispatch = useDispatch();

  const handleBreak = () => {
    dispatch(working());
    setActionButton(true);
    idleTime(idleDuration);
  };

  const handleWorking = () => {
    setViewButton(false);
  };

  useEffect(() => {
    if (activity === dayActivity.idle) {
      const interval = setInterval(() => {
        setIdleDuration((prevSeconds) => prevSeconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Table sx={{ ...tableStyles, borderTop: 5 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              ...tableHeaderStyles,
              color: "black",
              borderBottom: 1,
              borderColor: grey["A400"],
            }}
          >
            {activity}
          </TableCell>
        </TableRow>
      </TableHead>

      <CustomTableBody>
        <TableRow sx={{ display: "flex", width: "100%", height: "9rem" }}>
          <CustomTableCell>
            <p style={{ margin: 0, padding: "2%", fontSize: "larger" }}>
              Your device seems to be inactive from {inactiveTime}, please
              confirm
            </p>
            {!viewButton && (
              <div>
                <p style={{ margin: 0, padding: "2%", fontSize: "larger" }}>
                  Describe your activity in detail:
                </p>
                <OutlinedInput
                  sx={{
                    "& .MuiInputBase-input": {
                      paddingTop: 0,
                      paddingLeft: 0,
                      alignItems: "flex-start",
                      display: "flex",
                      height: "2rem",
                      width: "23rem",
                    },
                  }}
                />
                <ButtonGroup
                  size="small"
                  variant="text"
                  sx={{
                    "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                      borderRight: "none",
                    },
                    "& .MuiButtonGroup-grouped": {
                      textTransform: "none",
                    },
                    display: "flex",
                    gap: "40%",
                    marginTop: "2%",
                  }}
                >
                  <Button sx={{ color: "black" }} onClick={handleBreak}>
                    No, I was not working
                  </Button>
                  <Button variant="contained" color="success">
                    Submit
                  </Button>
                </ButtonGroup>
              </div>
            )}
          </CustomTableCell>
        </TableRow>
        {viewButton && (
          <TableRow sx={{ display: "flex", width: "100%", height: "9rem" }}>
            <TableCell sx={{ ...buttonParentStyles }}>
              <Button
                onClick={handleWorking}
                sx={{
                  ...buttonStyles,
                }}
              >
                <Box sx={{ ...buttonBoxStyles, bgcolor: "#14397d" }}>
                  <p>
                    <span style={{ fontSize: "xxx-large" }}>YES</span> <br />
                    <span style={{ fontSize: "medium" }}>I was working</span>
                  </p>
                </Box>
              </Button>
              <Button onClick={handleBreak} sx={{ ...buttonStyles }}>
                <Box
                  sx={{
                    ...buttonBoxStyles,
                    bgcolor: grey["400"],
                  }}
                >
                  <p>
                    <span style={{ fontSize: "xxx-large" }}>&nbsp;NO</span> <br />
                    <span style={{ fontSize: "medium" }}>I took a break</span>
                  </p>
                </Box>
              </Button>
            </TableCell>
          </TableRow>
        )}
      </CustomTableBody>
    </Table>
  );
};

export default IdleScreen;
