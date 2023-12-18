import React, { useState } from "react";
import TopNav from "./TopNav";
import NavbarComp from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot_password",
        { email }
      );

      if (response.data.status === "Success") {
        alert(response.data.message);
      } else {
        alert(response.data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error during forgot Password:", error);
      alert("An error occurred during forgot Password");
    }
  };

  return (
    <div>
      <TopNav />
      <NavbarComp />
      <div style={{ backgroundColor: "#E7E5E5", overflow: "hidden" }}>
        <div className="conatiner">
          <div className="row d-flex justify-content-center align-items-center ">
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
                    Forget Your Password
                  </h1>
                </div>
                <div className="p-4">
                  <div>
                    <div className="form-floating mb-2">
                      <input
                        type="email"
                        className="form-control signup_form_control"
                        id="floatingInput"
                        placeholder="Enter Your Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label for="floatingInput">Enter Your Email</label>
                    </div>
                    <button
                      style={{ backgroundColor: "#036E8C" }}
                      className="btn text-white w-100 py-2 my-3 button_class"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Send
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

export default ForgotPassword;
