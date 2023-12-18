import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import {
  AiFillPhone,
  AiOutlineMail,
  AiFillFacebook,
  AiFillYoutube,
} from "react-icons/ai";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#232935" }}>
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-2 mb-3">
              <h5
                style={{
                  color: "#3E9D7C",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                Loan
              </h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link to="/personal-loan" className="nav-link p-0 text-white">
                    Personal Loan
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/business-loan" className="nav-link p-0 text-white">
                    Business Loan
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/home-loan" className="nav-link p-0 text-white">
                    Home Loan
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to="/loan-against-property"
                    className="nav-link p-0 text-white"
                  >
                    Loan Against Property
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/car-loan" className="nav-link p-0 text-white">
                    Car Loan
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to="/od-cc-workingCapital"
                    className="nav-link p-0 text-white"
                  >
                    OD/CC/Working Capital
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/credit-card" className="nav-link p-0 text-white">
                    Credit Card
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5
                style={{
                  color: "#3E9D7C",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                Company
              </h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link to="/about-us" className="nav-link p-0 text-white">
                    About
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/contact-us" className="nav-link p-0 text-white">
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/policy_page" className="nav-link p-0 text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to="/terms-conditions"
                    className="nav-link p-0 text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="#" className="nav-link p-0 text-white">
                    Disclaimer
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/career_page" className="nav-link p-0 text-white">
                    Career (Join Us)
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5
                style={{
                  color: "#3E9D7C",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                Other Links
              </h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link to="/blog" className="nav-link p-0 text-white">
                    Blog
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/emi-calc" className="nav-link p-0 text-white">
                    Emi Calculator
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-5 offset-md-1 mb-3">
              <h2 style={{ color: "#3E9D7C" }}>Contact Details</h2>
              <p className="text-white">
                {" "}
                <span style={{ color: "#3E9D7C", fontSize: "26px" }}>
                  <MdOutlineLocationOn />
                </span>
                G-13, sector 6 noida - 201301
              </p>
              <p className="text-white">
                <span style={{ color: "#3E9D7C", fontSize: "26px" }}>
                  <AiFillPhone />
                </span>{" "}
                +91 8887796224
              </p>
              <p className="text-white">
                <span style={{ color: "#3E9D7C", fontSize: "26px" }}>
                  <TbDeviceLandlinePhone />
                </span>{" "}
                0120 - 4978652
              </p>
              <p className="text-white">
                {" "}
                <span
                  style={{
                    color: "#3E9D7C",
                    fontSize: "26px",
                    paddingRight: "6px",
                  }}
                >
                  <AiOutlineMail />
                </span>
                info@addrupee.com
              </p>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p
              className="text-white"
              style={{ fontSize: "18px", fontWeight: 500 }}
            >
              © 2023{" "}
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >
                AddRupee
              </Link>{" "}
              , Inc. All rights reserved.
            </p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <Link
                  className="link-white fs-2"
                  to="https://www.youtube.com/channel/UCTSA6p0niTmhK1yaK2qDwPA"
                >
                  <AiFillYoutube />
                </Link>
              </li>
              <li className="ms-3">
                <Link
                  className="link-white fs-2 "
                  to="https://www.instagram.com/addrupeefinance/"
                >
                  <BsInstagram />
                </Link>
              </li>
              <li className="ms-3">
                <Link
                  className="link-white fs-2 "
                  to="https://www.facebook.com/people/Add-Rupee/100083152737651/?is_tour_dismissed=true"
                >
                  <AiFillFacebook />
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
