import React from "react";
import { Link } from "react-router-dom";

const days = ["Mon", "Tues", "Wed", "Thus", "Fri", "Sat", "Sun"];

// @input - Array:day array (ex- [1,0,1,0,1,1,0])
// @function - Create string of days name
// @output - String
export const getDaysList = (daysArray) => {
  let daysString = "";
  for (let i = 0; i < daysArray.length; i++) {
    daysString += daysArray[i] ? days[i] + " " : "";
  }
  return daysString;
};

// @input - Array:raw classroom row, String:usertype, function: to handle on delete
// @function - create classroom list
// @output - JSX: Classroom list
export const createClassroomTable = (
  classroomRawData,
  userType,
  HandleDeleteClassroom
) => {
  return classroomRawData.map((element, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{element["name"]}</td>
      <td>{element["subject"]}</td>
      <td>{`${element["startTime"]} - ${element["endTime"]}`}</td>
      <td>{getDaysList(element["days"])}</td>
      {userType === "Student" ? <td>{element["instructorId"]["name"]}</td> : ""}
      <td>
        <Link className="my-btn info" to={`classroom-details/${element["Id"]}`}>
          Info
        </Link>

        {userType === "Teacher" ? (
          <button
            className="my-btn danger"
            onClick={() => {
              HandleDeleteClassroom(element["Id"]);
            }}
          >
            Delete
          </button>
        ) : (
          ""
        )}
      </td>
    </tr>
  ));
};

// @input - Array: Raw classroom data
// @function - create subject dropdown
// @output - JSX: subject dropdown
export const getsubjectDropdown = (classroomRawData) => {
  let subjectDropdownTemp = classroomRawData.map(
    (element) => element["subject"]
  );
  subjectDropdownTemp = Array.from(new Set(subjectDropdownTemp));
  return subjectDropdownTemp.map((element, index) => (
    <option key={index} value={element}>
      {element}
    </option>
  ));
};

// @input - Array: Raw classroom data
// @function - create classname dropdown
// @output - JSX: classname dropdown
export const getclassNameDropdown = (classroomRawData) => {
  let classNameDropdownTemp = classroomRawData.map(
    (element) => element["name"]
  );
  classNameDropdownTemp = Array.from(new Set(classNameDropdownTemp));
  return classNameDropdownTemp.map((element, index) => (
    <option key={index} value={element}>
      {element}
    </option>
  ));
};
