import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";

const CustResetPassword = () => {
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Inside the component handling the password reset page
  const { id, token } = useParams();

  const resetPasswordRequest = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/cust_reset_password/${id}/${token}`,
        { password }
      );

      if (response.data.status === "Success") {
        alert("Password Reset Successfully");
        navigate("/customer_signin"); // Redirect to signin page
      }
    } catch (error) {
      console.error("Error during resetPassword:", error);
      if (error.response && error.response.status === 404) {
        alert("Link not found or expired. Please request a new link.");
      } else {
        alert("An error occurred during password reset");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetPasswordRequest();
  };

  return (
    <div>
      <TopNav />
      <NavbarComp />
      <div style={{ backgroundColor: "#E7E5E5", overflow: "hidden" }}>
        <div className="conatiner">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-lg-6">
              <form className="signUp_Form" onSubmit={handleSubmit}>
                <div
                  style={{
                    backgroundColor: "#036E8C",
                    borderTopRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                  }}
                  className=" text-center mb-0"
                >
                  <h1 className="h4 text-white p-2 fw-normal">
                    Reset Your Password
                  </h1>
                </div>
                <div className="p-4">
                  <div>
                    <div className="form-floating">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control signup_form_control"
                        id="floatingPassword"
                        placeholder="New Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="floatingPassword">New Password</label>
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
                    <button
                      style={{ backgroundColor: "#036E8C" }}
                      className="btn text-white w-100 py-2 my-3 button_class"
                      type="submit"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustResetPassword;
