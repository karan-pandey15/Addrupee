import React from "react";
import { Link } from "react-router-dom";
const TopNav = () => {
  return (
    <div>
      <nav style={{ backgroundColor: "#036E8C" }} className="navbar">
        <div className="container-fluid">
          <p
            className="navbar-brand p-0"
            style={{ fontSize: "22px", color: "white" }}
          >
            Welcome you to AddRuppe
          </p>
          <div className="d-flex p-0  ">
            <Link
              className="issueCibil"
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

            <button
              className="smallsize_button btn button_class m-2"
              style={{
                backgroundColor: "#3e9d7c",
              }}
              type="submit"
            >
              <Link
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#fff",
                  textDecoration: "none",
                }}
                to="/become-partner"
              >
                Become a Partner
              </Link>
            </button>
            <button
              className="smallsize_button btn button_class m-2"
              style={{
                backgroundColor: "#3e9d7c",
              }}
              type="submit"
            >
              <Link
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#fff",
                  textDecoration: "none",
                }}
                to="/apply-now"
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

export default TopNav;
