import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import {
  createClassroomTable,
  getsubjectDropdown,
  getclassNameDropdown,
} from "../../Helpers/homeHelpers";
import Toast from "../../components/Toast/Toast";

export default function Profile() {
  const [tableRows, settableRows] = useState([]);
  const [userType, setuserType] = useState("Student");

  const [classNameSelected, setclassNameSelected] = useState("all");
  const [subjectSelected, setsubjectSelected] = useState("all");
  const [sortBy, setsortBy] = useState("all");
  const [deleteToast, setdeleteToast] = useState(false);

  // @input - String: Classroom Id
  // @function - delete classroom
  const HandleDeleteClassroom = async (Id) => {
    axios
      .delete(`/api/classroom/delete-classroom/${Id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setdeleteToast(true))
      .catch(console.log("error"));
  };

  useEffect(() => {
    axios
      .get("/api/classroom/classroom-list", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        params: {
          sortBy: sortBy,
          classnameFilter: classNameSelected,
          subjectFilter: subjectSelected,
        },
      })
      .then(({ data }) => {
        settableRows(data.classrooms);
        setuserType(data.userType);
      });
  }, [subjectSelected, classNameSelected, sortBy, deleteToast]);

  return (
    <>
      <Navbar />
      <div className="container pt-5">
        {deleteToast ? (
          <Toast
            message="Classroom Deleted Successfuly"
            setToastFunction={setdeleteToast}
          />
        ) : null}

        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <label style={{ width: "100%" }}>Select Subject</label>
            <select
              className="form-control filter-item"
              value={subjectSelected}
              onChange={(event) => {
                setsubjectSelected(event.target.value);
              }}
            >
              <option value="all">All</option>
              {getsubjectDropdown(tableRows)}
            </select>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <label style={{ width: "100%" }}>Select Classname</label>
            <select
              className="form-control filter-item"
              value={classNameSelected}
              onChange={(event) => {
                setclassNameSelected(event.target.value);
              }}
            >
              <option value="all">All</option>
              {getclassNameDropdown(tableRows)}
            </select>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <label style={{ width: "100%" }}>Apply Sorting</label>
            <select
              className="form-control filter-item"
              value={sortBy}
              onChange={(event) => {
                setsortBy(event.target.value);
              }}
            >
              <option value="all">None</option>
              <option value="name">Class name</option>
              <option value="subject">Subject</option>
            </select>
          </div>
        </div>

        <div className="table-responsive-lg mt-5 mb-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">S.no.</th>
                <th scope="col">Classroom Name</th>
                <th scope="col">Subject</th>
                <th scope="col">Day</th>
                <th scope="col">Time</th>
                {userType === "Student" ? <th scope="col">Instructor</th> : ""}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {createClassroomTable(tableRows, userType, HandleDeleteClassroom)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
