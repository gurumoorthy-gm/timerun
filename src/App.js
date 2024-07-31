import "./App.css";
import React from "react";
import { Paper, TableContainer, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeScreen from "./components/HomeScreen";
import { start } from "../src/store/activity";
import { resetTime } from "./store/workedTime";

const tableContainerStyles = {
  border: "1px black solid",
  display: "block",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: "0% 30%",
  height: "35rem",
  flexDirection: "column",
};

function App() {
  const [startButton, setStartButton] = useState(true);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleExitClick = () => {
    setStartButton(true);
    setUser([]);
    dispatch(start());
    dispatch(resetTime());
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          setStartButton(false);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <Box className="App">
      <TableContainer component={Paper} sx={{ ...tableContainerStyles }}>
        {startButton ? (
          <Button onClick={() => login()}>Sign in with Google 🚀</Button>
        ) : (
          <React.Fragment>
            <HomeScreen profile={profile} />
            <Button
              sx={{ display: "flex" }}
              onClick={handleExitClick}
              endIcon={<LogoutIcon />}
            >
              Exit
            </Button>
          </React.Fragment>
        )}
      </TableContainer>
    </Box>
  );
}

export default App;
