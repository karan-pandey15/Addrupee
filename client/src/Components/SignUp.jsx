import React, { useState } from "react";
import googleLogo from "../assets/googleLogo.png";
import facebookLogo from "../assets/facebookLogo.png";
import signUp from "../assets/signupImg.png";
import { Link } from "react-router-dom";
import TopNav from "./TopNav";
import NavbarComp from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const SignUp = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    TL_Name: "",
    Branch_Name: "",
  });
  const [userType, setUserType] = useState("Team Leader");
  const [secretKey, setSecretKey] = useState("");
  const [radioError, setRadioError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRadioChange = (e) => {
    setUserType(e.target.value);
    setRadioError(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
      userType: userType,
    });
  };

  const handleSubmit = (event) => {
    if (
      (userType === "Team Leader" && secretKey !== "AddRupee@325") ||
      (userType === "Admin" && secretKey !== "AdminKey123")
    ) {
      event.preventDefault();
      alert("Invalid Credentials");
    } else {
      event.preventDefault();
      if (!userType) {
        setRadioError(true);
        return;
      }

      axios
        .post("http://localhost:5000/api/emp_register", registerData)
        .then((res) => {
          if (res.status !== 200 || !res.data) {
            alert("Error while registering. Please try again.");
          } else if (res.data.Status === "Success") {
            alert(res.data.Message); // Inform the user that an email has been sent
          } else {
            alert(res.data.Error);
          }
        })
        .catch((err) => {
          console.error("Error during registration:", err);
          alert("Error while registering. Please try again.");
        });
    }
  };

  return (
    <div>
      <TopNav />
      <NavbarComp />
      <div style={{ backgroundColor: "#E7E5E5" }}>
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-12 col-lg-6">
              <form className="register_form">
                <div
                  style={{
                    backgroundColor: "#036E8C",
                    borderTopRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                  }}
                  className=" text-center mb-0"
                >
                  <h1 className="h4 text-white p-2 fw-normal">
                    Please Sign Up
                  </h1>
                </div>
                <div className="p-4">
                  <div>
                    Register As
                    <input
                      type="radio"
                      name="userType"
                      value="Employee"
                      onChange={handleRadioChange}
                      style={{ marginLeft: "6px", cursor: "pointer" }}
                      checked={userType === "Employee"}
                    />
                    AQM
                    <input
                      type="radio"
                      name="userType"
                      value="Team Leader"
                      onChange={handleRadioChange}
                      style={{ marginLeft: "6px", cursor: "pointer" }}
                      checked={userType === "Team Leader"}
                    />
                    Team Manager
                    <input
                      type="radio"
                      name="userType"
                      value="Admin"
                      onChange={handleRadioChange}
                      style={{ marginLeft: "6px", cursor: "pointer" }}
                      checked={userType === "Admin"}
                    />
                    Admin
                  </div>
                  {radioError && (
                    <p style={{ color: "red" }}>Please select a user type.</p>
                  )}
                  {(userType === "Admin" && (
                    <div>
                      <div className="form-floating mt-1">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Secret Key"
                          onChange={(e) => setSecretKey(e.target.value)}
                          autoComplete="off"
                        />
                        <label htmlFor="floatingInput">Secret Key</label>
                      </div>
                      <div className="form-floating mt-1">
                        <input
                          type="text"
                          className="form-control signup_form_control"
                          id="floatingInput"
                          placeholder="Name"
                          name="name"
                          value={registerData.name}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingInput">Name</label>
                      </div>
                      <div className="form-floating mt-1">
                        <input
                          type="tel"
                          className="form-control signup_form_control"
                          id="floatingInput"
                          name="phone"
                          value={registerData.phone}
                          placeholder="Phone No."
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingInput">Phone No.</label>
                      </div>
                      <div className="form-floating mt-1">
                        <input
                          type="email"
                          className="form-control signup_form_control"
                          id="floatingInput"
                          name="email"
                          value={registerData.email}
                          placeholder="name@example.com"
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                      </div>
                      <div className="form-floating mt-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control signup_form_control"
                          id="floatingPassword"
                          name="password"
                          value={registerData.password}
                          placeholder="Password"
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        <span
                          onClick={togglePasswordVisibility}
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          {showPassword ? (
                            <span
                              style={{
                                backgroundColor: "#dedbd2",
                                padding: "2px 6px",
                                cursor: "pointer",
                                borderRadius: "4px",
                                color: "#2f3e46",
                                fontSize: "16px",
                                fontWeight: 500,
                              }}
                            >
                              Hide
                            </span>
                          ) : (
                            <span
                              style={{
                                backgroundColor: "#dedbd2",
                                padding: "2px 6px",
                                cursor: "pointer",
                                borderRadius: "4px",
                                color: "#2f3e46",
                                fontSize: "16px",
                                fontWeight: 500,
                              }}
                            >
                              Show
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="form-check text-start my-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="remember-me"
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Agree to terms & conditions
                        </label>
                      </div>
                      <button
                        style={{ backgroundColor: "#036E8C" }}
                        className="btn text-white w-100 py-2 button_class"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Sign Up
                      </button>
                    </div>
                  )) ||
                    (userType === "Team Leader" && (
                      <div>
                        <div className="form-floating mt-1">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Secret Key"
                            onChange={(e) => setSecretKey(e.target.value)}
                            autoComplete="off"
                          />
                          <label for="floatingInput">Secret Key</label>
                        </div>
                        <div className="form-floating mt-1">
                          <select
                            className="form-select"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                            required
                          >
                            <option selected disabled>
                              Select Name
                            </option>
                            <option value="CHAHAT SHARMA">CHAHAT SHARMA</option>
                            <option value="PRADEEP NAWHAL">
                              PRADEEP NAWHAL
                            </option>
                            <option value="RAJENDRA SINGH">
                              RAJENDRA SINGH
                            </option>
                            <option value="HIMANSHU GUJJAR">
                              HIMANSHU GUJJAR
                            </option>
                            <option value="FAIZAN KHAN">FAIZAN KHAN</option>
                            <option value="DEEPAK KUMAR">DEEPAK KUMAR</option>
                            <option value="BHAGWAN SINGH">BHAGWAN SINGH</option>
                            <option value="SACHIN KUMAR">SACHIN KUMAR</option>
                            <option value="AKASH BHARDWAJ">
                              AKASH BHARDWAJ
                            </option>
                          </select>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type="tel"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            name="phone"
                            value={registerData.phone}
                            placeholder="Phone No."
                            onChange={handleInputChange}
                          />
                          <label for="floatingInput">Phone No.</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type="email"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            name="email"
                            value={registerData.email}
                            placeholder="name@example.com"
                            onChange={handleInputChange}
                          />
                          <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            // type="password"
                            type={showPassword ? "text" : "password"}
                            className="form-control signup_form_control"
                            id="floatingPassword"
                            name="password"
                            value={registerData.password}
                            placeholder="Password"
                            onChange={handleInputChange}
                          />
                          <label for="floatingPassword">Password</label>
                          <span
                            onClick={togglePasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                          >
                            {showPassword ? (
                              <span
                                style={{
                                  backgroundColor: "#dedbd2",
                                  padding: "2px 6px",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                  color: "#2f3e46",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                }}
                              >
                                Hide
                              </span>
                            ) : (
                              <span
                                style={{
                                  backgroundColor: "#dedbd2",
                                  padding: "2px 6px",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                  color: "#2f3e46",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                }}
                              >
                                Show
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="form-floating mt-1">
                          <select
                            className="form-select"
                            name="Branch_Name"
                            id="Branch_Name"
                            onChange={handleInputChange}
                            required
                          >
                            <option selected disabled>
                              Select Branch Name
                            </option>
                            <option value="Addrupee Noida">
                              Addrupee Noida
                            </option>
                          </select>
                        </div>

                        <div className="form-check text-start my-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Agree to terms & conditions
                          </label>
                        </div>
                        <button
                          style={{ backgroundColor: "#036E8C" }}
                          className="btn text-white w-100 py-2 button_class"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Sign Up
                        </button>
                      </div>
                    )) ||
                    (userType === "Employee" && (
                      <div>
                        <div className="form-floating mt-1">
                          <input
                            type="text"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            placeholder="Name"
                            name="name"
                            value={registerData.name}
                            onChange={handleInputChange}
                          />
                          <label for="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type="tel"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            name="phone"
                            value={registerData.phone}
                            placeholder="Phone No."
                            onChange={handleInputChange}
                          />
                          <label for="floatingInput">Phone No.</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            type="email"
                            className="form-control signup_form_control"
                            id="floatingInput"
                            name="email"
                            value={registerData.email}
                            placeholder="name@example.com"
                            onChange={handleInputChange}
                          />
                          <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mt-1">
                          <input
                            // type="password"
                            type={showPassword ? "text" : "password"}
                            className="form-control signup_form_control"
                            id="floatingPassword"
                            name="password"
                            value={registerData.password}
                            placeholder="Password"
                            onChange={handleInputChange}
                          />
                          <label for="floatingPassword">Password</label>
                          <span
                            onClick={togglePasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                          >
                            {showPassword ? (
                              <span
                                style={{
                                  backgroundColor: "#dedbd2",
                                  padding: "2px 6px",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                  color: "#2f3e46",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                }}
                              >
                                Hide
                              </span>
                            ) : (
                              <span
                                style={{
                                  backgroundColor: "#dedbd2",
                                  padding: "2px 6px",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                  color: "#2f3e46",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                }}
                              >
                                Show
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="form-floating mt-1">
                          <select
                            className="form-select"
                            name="TL_Name"
                            id="TL_Name"
                            onChange={handleInputChange}
                            required
                          >
                            <option selected disabled>
                              Select TL Name
                            </option>
                            <option value="CHAHAT SHARMA">CHAHAT SHARMA</option>
                            <option value="PRADEEP NAWHAL">
                              PRADEEP NAWHAL
                            </option>
                            <option value="RAJENDRA SINGH">
                              RAJENDRA SINGH
                            </option>
                            <option value="HIMANSHU GUJJAR">
                              HIMANSHU GUJJAR
                            </option>
                            <option value="FAIZAN KHAN">FAIZAN KHAN</option>
                            <option value="DEEPAK KUMAR">DEEPAK KUMAR</option>
                            <option value="BHAGWAN SINGH">BHAGWAN SINGH</option>
                            <option value="SACHIN KUMAR">SACHIN KUMAR</option>
                            <option value="AKASH BHARDWAJ">
                              AKASH BHARDWAJ
                            </option>
                          </select>
                        </div>
                        <div className="form-floating mt-1">
                          <select
                            className="form-select"
                            name="Branch_Name"
                            id="Branch_Name"
                            onChange={handleInputChange}
                            required
                          >
                            <option selected disabled>
                              Select Branch Name
                            </option>
                            <option value="Addrupee Noida">
                              Addrupee Noida
                            </option>
                          </select>
                        </div>

                        <div className="form-check text-start my-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Agree to terms & conditions
                          </label>
                        </div>
                        <button
                          style={{ backgroundColor: "#036E8C" }}
                          className="btn text-white w-100 py-2 button_class"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Sign Up
                        </button>
                      </div>
                    ))}

                  <p className="mt-2 ">
                    Already a User?{" "}
                    <Link
                      to={"/signin"}
                      style={{ textDecoration: "none", fontWeight: 500 }}
                    >
                      Sign In
                    </Link>
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="mt-2"
                  >
                    <span
                      style={{
                        width: "40%",
                        height: "1px",
                        color: "#036E8C",
                        border: "1px solid",
                        opacity: 0.5,
                      }}
                    ></span>
                    <span
                      style={{
                        fontSize: "19px",
                        color: "#264653",
                        fontWeight: 500,
                      }}
                    >
                      Or
                    </span>
                    <span
                      style={{
                        width: "40%",
                        height: "1px",
                        color: "#036E8C",
                        border: "1px solid",
                        opacity: 0.5,
                      }}
                    ></span>
                  </div>
                  <div className="text-center">
                    <p
                      style={{
                        fontSize: "19px",
                        fontWeight: 500,
                        color: "#264653",
                      }}
                    >
                      Sign In With
                    </p>
                    <span
                      style={{
                        padding: "13px 22px",
                        borderRadius: "5px",
                        marginRight: "25px",
                      }}
                      className="google_facebook_link"
                    >
                      <Link>
                        {" "}
                        <img
                          style={{ height: "42px", width: "42px" }}
                          src={googleLogo}
                          alt="..."
                        />
                      </Link>
                    </span>
                    <span
                      style={{
                        padding: "13px 22px",
                        borderRadius: "5px",
                      }}
                      className="google_facebook_link"
                    >
                      <Link>
                        <img
                          style={{ height: "36px", width: "36px" }}
                          src={facebookLogo}
                          alt="..."
                        />
                      </Link>
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <img style={{ width: "100%" }} src={signUp} alt="..." />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
