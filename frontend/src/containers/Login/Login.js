import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

export default function Login(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loginType, setLoginType] = useState("Teacher");

  const [phoneNumberValidationMsg, setPhoneNumberValidationMsg] = useState("");
  const [otpValidationMsg, setOtpValidationMsg] = useState("");
  const [userValidationMsg, setUserValidationMsg] = useState("");

  // @input - String: Validation text
  // @function - validate phone number
  // @output - boolean
  const validatePhoneNumber = (input) => {
    return input.match(/^\d{10}$/);
  };

  // @input - String: Validation text
  // @function - validate otp number
  // @output - boolean
  const validateOtp = (input) => {
    return input.match(/^\d{6}$/);
  };

  // @input - Number: Validation Phone Number
  // @function - handle phone number
  const handlePhoneNumberChange = (input) => {
    setPhoneNumberValidationMsg(
      validatePhoneNumber(input) ? "" : "Enter valid phone number"
    );
  };

  // @input - Number: Validation OTP
  // @function - handle otp
  const handleOtpChange = (input) => {
    setOtpValidationMsg(validateOtp(input) ? "" : "Enter valid OTP");
  };

  // @function - Handle login check
  const handleOnSubmit = async () => {
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);
    const isOptValid = validateOtp(otp);

    if (!isPhoneNumberValid) setPhoneNumberValidationMsg("Required");
    if (!isOptValid) setOtpValidationMsg("Required");

    if (isPhoneNumberValid && isOptValid) {
      try {
        const { data } = await axios.post("/api/user/login", {
          phone: phoneNumber,
          otp: otp,
          userType: loginType,
        });

        if (data.token) {
          localStorage.setItem("token", data.token);
          props.history.push("/home");
        }
      } catch {
        setUserValidationMsg("Phone number, Password or User type is invalid");
      }
    }
  };

  return (
    <div className="limiter">
      <div className="login-container">
        <div className="login-card px-5 py-4">
          <form className="login-form validate-form">
            <span className="login-form-title pb-3 mt-4">LOGIN</span>

            <div className="mb-3 err-msg">{userValidationMsg}</div>

            <div className="input-container">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
              </svg>
              <input
                className="input"
                type="text"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                  handlePhoneNumberChange(event.target.value);
                }}
              />
            </div>
            <div className="mb-2 err-msg mt-1">{phoneNumberValidationMsg}</div>

            <div className="input-container">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.187 1.025C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815zm3.328 6.884a1.5 1.5 0 10-1.06-.011.5.5 0 00-.044.136l-.333 2a.5.5 0 00.493.582h.835a.5.5 0 00.493-.585l-.347-2a.5.5 0 00-.037-.122z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <input
                className="input"
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(event) => {
                  setOtp(event.target.value);
                  handleOtpChange(event.target.value);
                }}
              />
              <span className="focus-input"></span>
            </div>
            <div className="mb-3 err-msg mt-1">{otpValidationMsg}</div>

            <select
              className="form-control"
              value={loginType}
              onChange={(event) => {
                setLoginType(event.target.value);
              }}
            >
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>

            <button
              className="login-form-btn mt-5"
              onClick={(event) => {
                event.preventDefault();
                handleOnSubmit();
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
