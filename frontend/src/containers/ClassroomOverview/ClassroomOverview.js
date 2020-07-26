import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { getDaysList } from "../../Helpers/classsrooomOverviewHelper";
import Toast from "../../components/Toast/Toast";
import InputField from "../../components/InputField/InputField";

export default function ClassroomOverview(props) {
  const days = ["Mon", "Tues", "Wed", "Thus", "Fri", "Sat", "Sun"];
  const [data, setData] = useState({});
  const [userType, setuserType] = useState("Student");

  const [saveToast, setsaveToast] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/classroom/specfic-classroom/${props.match.params.id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setData(data.data);
        setuserType(data.userType);
      });
  }, []);

  // @input - String: Input name, String: Input value
  // @function - Handles input change
  const handleChange = (key, value) => {
    let updatedData = Object.assign({}, data);
    updatedData[key] = value;
    setData(updatedData);
  };

  // @function - handle on submit
  const onSubmit = () => {
    axios
      .post(
        "/api/classroom/update-classroom",
        { data: data },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(setsaveToast(true))
      .catch((err) => {
        console.log(err);
      });
  };

  // @input - String: userType (ex- Teacher), Number: index of the day
  // @function - toogle between day on and off
  const handleDayChanged = (userType, index) => {
    if (userType === "Teacher") {
      let updatedData = Object.assign({}, data);
      updatedData["days"][index] = Math.abs(updatedData["days"][index] - 1);
      setData(updatedData);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container pt-5 mb-5">
        {saveToast ? (
          <Toast
            message="Updated Successfully"
            setToastFunction={setsaveToast}
          />
        ) : null}

        <div className="card shadow">
          <div className="card-body">
            <h5 className="card-title mb-3">Classroom id : {data["Id"]}</h5>
            <form>
              <div className="row">
                <div className="col-lg-6 col-md-12 mt-4">
                  <label>Classroom Name</label>
                  <InputField
                    name="name"
                    type="text"
                    placeholder="Classroom name"
                    value={data["name"]}
                    userType={userType}
                    handleChange={handleChange}
                  />
                </div>
                <div className="col-lg-6 col-md-12 mt-4">
                  <label>Subject</label>
                  <InputField
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    value={data["subject"]}
                    userType={userType}
                    handleChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-12 mt-4">
                  <label>Start Time</label>
                  <InputField
                    name="startTime"
                    type="time"
                    placeholder="00:00 AM"
                    value={data["startTime"]}
                    userType={userType}
                    handleChange={handleChange}
                  />
                </div>
                <div className="col-lg-6 col-md-12 mt-4">
                  <label>End Time</label>
                  <InputField
                    name="endTime"
                    type="time"
                    placeholder="00:00 AM"
                    value={data["endTime"]}
                    userType={userType}
                    handleChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-12">
                  <label>Days</label>
                  <br />
                  {data.days
                    ? getDaysList(data.days, userType, handleDayChanged)
                    : ""}
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-12 mt-4">
                  <label>Number of students</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Number of students"
                    disabled="true"
                    value={data["students"] ? data["students"].length : 0}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-12"></div>
              </div>
            </form>

            {userType === "Teacher" ? (
              <button
                className="my-btn info"
                style={{ float: "right", padding: "4px 15px" }}
                onClick={() => {
                  onSubmit();
                }}
              >
                Save
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
