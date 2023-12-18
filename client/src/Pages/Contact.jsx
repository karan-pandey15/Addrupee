import React from "react";
import contactUsImg from "../assets/contactUs.png";
import NavbarComp from "../Components/Navbar";
import TopNav from "../Components/TopNav";
import Footer from "../Components/Footer";

const Contact = () => {
  return (
    <div>
    <TopNav />
    <NavbarComp />
    <div className="py-5" style={{ backgroundColor: "#E7E5E5" }}>
      <div
        style={{ backgroundColor: "#edf2f4" }}
        className="container contact_box-shadow "
      >
        <div className="row">
          <div className="col-12 col-lg-6 col-md-6 contact_form-shadow">
            <img style={{ width: "100%" }} src={contactUsImg} alt="..." />
          </div>
          <div className="col-12 col-lg-6 col-md-6 py-5 contact_form-shadow">
            <h2
              style={{ color: "#264653", fontWeight: 600 }}
              className="text-center"
            >
              Get In Touch
            </h2>
            <form style={{ width: "90%", paddingLeft: "50px" }}>
              <div className="form-group py-2">
                <label htmlFor="name">Email address</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="form-group py-2">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Your Email"
                />
              </div>

              <div className="form-group py-2">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="5"
                  placeholder="Message"
                ></textarea>
                <button
                  style={{ backgroundColor: "#036E8C" }}
                  type="button"
                  className="btn text-white mt-3 button_class"
                >
                  Submit
                </button>
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

export default Contact;
