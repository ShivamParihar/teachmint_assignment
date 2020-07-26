import React from "react";
const days = ["Mon", "Tues", "Wed", "Thus", "Fri", "Sat", "Sun"];

// @input - Array:day array (ex- [1,0,1,0,1,1,0])
// @function - Create JSX of days name
// @output - JSX
export const getDaysList = (daysArray, userType, handleDayChanged) => {
  return daysArray.map((element, index) => (
    <div
      className={`day-box ${element ? "blue" : ""} ${
        userType === "Student" ? "disable-day-box" : ""
      }`}
      onClick={() => {
        handleDayChanged(userType, index);
      }}
    >
      {days[index]}
    </div>
  ));
};
