import React, { useState } from "react";
import googleLogo from "../assets/googleLogo.png";
import loginImg from "../assets/loginImg.png";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";

const CustomerSignIn = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cust_login",
        loginData
      );

      if (response.data.Status === "Success") {
        navigate("/customer_dashboard");
      } else {
        // Handle unsuccessful Sign In
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during Sign In:", error);
      // Handle error and provide user feedback
      alert("An error occurred during Sign In");
    }
  };

  return (
    <div>
      <TopNav />
      <NavbarComp />
      <div style={{ backgroundColor: "#E7E5E5", overflow: "hidden" }}>
        <div className="conatiner">
          <div className="row">
            <div className="col-12 col-lg-6">
              <form className="signUp_Form">
                <div
                  style={{
                    backgroundColor: "#036E8C",
                    borderTopRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                  }}
                  className=" text-center mb-0"
                >
                  <h1 className="h4 text-white p-2 fw-normal">
                    Please Sign In
                  </h1>
                </div>
                <div className="p-4">
                  <div>
                    <div className="form-floating mb-2">
                      <input
                        type="email"
                        className="form-control signup_form_control"
                        id="floatingInput"
                        placeholder="Email"
                        name="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                      />
                      <label for="floatingInput">Email</label>
                    </div>
                    <div className="form-floating">
                      <input
                        // type="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control signup_form_control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        value={loginData.password}
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
                        Remember me
                      </label>
                    </div>

                    <button
                      style={{ backgroundColor: "#036E8C" }}
                      className="btn text-white w-100 py-2 button_class"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Sign in
                    </button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    className="mt-2"
                  >
                    <p>
                      New to Addrupee?{" "}
                      <Link
                        to={"/customer_signup"}
                        style={{ textDecoration: "none", fontWeight: 500 }}
                      >
                        Sign Up
                      </Link>
                    </p>
                    <Link
                      style={{ textDecoration: "none", fontWeight: 500 }}
                      to="/cust_forgot_password"
                    >
                      Forgot Password
                    </Link>
                  </div>
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
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-6">
              <img style={{ width: "100%" }} src={loginImg} alt="..." />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerSignIn;
