import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const NavbarComp = () => {
  return (
    <div className="navbar_div">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            <img
              style={{ height: "60px", width: "150px" }}
              src={logo}
              alt="..."
            />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  class="nav-link"
                  aria-current="page"
                  to="/about-us"
                >
                  About Us
                </Link>
              </li>

              <li class="nav-item dropdown">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  class="nav-link dropdown-toggle"
                  to="/loans"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Loans
                </Link>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      class="dropdown-item"
                      to="/personal-loan"
                    >
                      Personal Loan
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      class="dropdown-item"
                      to="/business-loan"
                    >
                      Business Loan
                    </Link>
                  </li>

                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      class="dropdown-item"
                      to="/home-loan"
                    >
                      Home Loan
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      class="dropdown-item"
                      to="/loan-against-property"
                    >
                      Loan Against Property
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      class="dropdown-item"
                      to="/car-loan"
                    >
                      Car Loan
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      class="dropdown-item"
                      to="/od-cc-workingCapital"
                    >
                      OD/CC/Working Capital
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      class="dropdown-item"
                      to="/credit-card"
                    >
                      Credit Card
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  class="nav-link dropdown-toggle"
                  to="/insurance"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Insurance
                </Link>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      class="dropdown-item"
                      to="/health-insurance"
                    >
                      Health Insurance
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      class="dropdown-item"
                      to="/general-insurance"
                    >
                      General Insurance
                    </Link>
                  </li>

                  <li>
                    <Link
                      style={{ fontSize: "19px", fontWeight: 500 }}
                      class="dropdown-item"
                      to="/mutal-funds"
                    >
                      Mutual Funds
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  class="nav-link"
                  to="/blog"
                >
                  Blog
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  class="nav-link"
                  to="/emi-calc"
                >
                  Emi Calculator
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  class="nav-link"
                  to="/contact-us"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  className="issueRelatedCibil"
                  to={"/cibil-issue"}
                  style={{
                    textDecoration: "none",
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#A7C957",
                  }}
                >
                  Improve Your Cibil
                </Link>
              </li>
              {/* <li class="nav-item">
                <Link
                  style={{ fontSize: "19px", fontWeight: 500 }}
                  class="nav-link"
                  to="/cibil"
                >
                  Cibil
                </Link>
              </li> */}
            </ul>

            <button
              style={{
                backgroundColor: "#036E8C",
              }}
              className="btn button_class m-2 smallSize_block "
              type="submit"
            >
              <Link
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#fff",
                  textDecoration: "none",
                }}
                to="/signin"
              >
                Employee Login
              </Link>
            </button>
            <button
              style={{
                backgroundColor: "#036E8C",
              }}
              className="btn button_class smallSize_block"
              type="submit"
            >
              <Link
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#fff",
                  textDecoration: "none",
                }}
                to="/customer_signup"
              >
                Apply Now
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComp;
