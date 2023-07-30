import React from "react";
import "./timmer.css";
const Timmer = (props) => {
  return (
    <div id="time">
      <div className="circle">
        <div
          className="dots"
          style={{ transform: `rotateZ(${props.timer * 24}deg)` }}
        ></div>
        <svg>
          <circle cx="70" cy="70" r="70" />
          <circle
            cx="70"
            cy="70"
            r="70"
            style={{ strokeDashoffset: 440 - (440 * props.timer) / 15 }}
          />
        </svg>
        <div id="seconds">
          {props.timer}
          <br />
          <span>seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Timmer;
