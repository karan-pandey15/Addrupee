import React from "react";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import generalInsurance from "../assets/generalInsurance.png";

const GeneralInsurance = () => {
  return (
    <div>
      <TopNav />
      <NavbarComp />
      <div>
        <div style={{ backgroundColor: "#E7E5E5" }}>
          <div className="container py-5">
            <div className="row ">
              <div className="col-12 col-lg-6">
                <h1 style={{ color: "#264653", fontWeight: 600 }}>
                  Apply For{" "}
                  <span style={{ color: "#3E9B74" }}>General Insurance</span>
                </h1>
                <p>
                  General insurance, also known as non-life insurance, is a
                  broad category of insurance that covers a wide range of assets
                  and risks other than human life. It provides protection for
                  individuals and businesses against unexpected financial losses
                  caused by events like accidents, natural disasters, theft, or
                  damage to property. Common types of general insurance include
                  auto insurance, homeowners' insurance, travel insurance, and
                  commercial policies for businesses. Policyholders pay premiums
                  to insurance companies in exchange for coverage, ensuring they
                  are financially safeguarded from various unforeseen
                  circumstances. General insurance helps individuals and
                  businesses manage risks and recover from unexpected events,
                  providing peace of mind and financial security.
                </p>
                <button
                  className="py-2 px-4 button_class"
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#036E8C",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/apply-now"
                  >
                    Apply Now
                  </Link>
                </button>
              </div>
              <div className="col-12 col-lg-6">
                <img
                  style={{ width: "100%" }}
                  src={generalInsurance}
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GeneralInsurance;