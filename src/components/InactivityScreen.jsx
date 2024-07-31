import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { CustomSlider, popupStyle } from "../styles/InactivityScreen";
import { inactivityScreenTime } from "../common/constant";
import moment from "moment";
import { useDispatch } from "react-redux";
import { idle, inactivity, working } from "../store/activity";

const InactivityScreen = ({ setActionButton, sendInactiveTime }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState(0);
  const [inactiveTime, setInactiveTime] = useState("");

  const dispatch = useDispatch();

  function SliderValueLabel({ children }) {
    return <span className="valueLabel">{children}</span>;
  }

  SliderValueLabel.propTypes = {
    children: PropTypes.element.isRequired,
  };

  useEffect(() => {
    let timer;

    const handleMouseClick = () => {
      setShowPopup(false);
      setInactivityTimer(0);
      dispatch(working());
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowPopup(true);
        dispatch(inactivity());
        setInactiveTime(moment(new Date()).format("hh:mm A"));
      }, inactivityScreenTime);
    };

    document.addEventListener("click", handleMouseClick);

    timer = setTimeout(() => {
      setShowPopup(true);
      dispatch(inactivity());
      setInactiveTime(moment(new Date()).format("hh:mm A"));
    }, inactivityScreenTime);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleMouseClick);
    };
  }, []);

  useEffect(() => {
    if (!showPopup) {
      setInactivityTimer(0);
    } else {
      const interval = setInterval(() => {
        setInactivityTimer((prevValue) => {
          const newValue = prevValue + 1;
          if (newValue < 30) return newValue;
          else {
            dispatch(idle());
            setActionButton(false);
            sendInactiveTime(inactiveTime);
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showPopup, inactivityTimer]);

  return (
    <div>
      {showPopup && (
        <div style={popupStyle}>
          <p>If you're working, click anywhere on the window</p>
          <Box sx={{ width: 300, display: "block", marginLeft: "12%" }}>
            <CustomSlider
              aria-label="Inactivity Timer"
              value={inactivityTimer}
              step={1}
              marks
              min={1}
              max={30}
              slots={{ valueLabel: SliderValueLabel }}
              onChange={(e, newValue) => setInactivityTimer(newValue)}
            />
          </Box>
        </div>
      )}
    </div>
  );
};

export default InactivityScreen;
