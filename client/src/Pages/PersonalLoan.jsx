import React from "react";
import { Link } from "react-router-dom";
import personalLoanimg from "../assets/personalLoanimg.png";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";

const PersonalLoan = () => {
  return (
    <div>
    <TopNav />
    <NavbarComp />
    <div style={{ backgroundColor: "#E7E5E5" }}>
      <div className="container py-5">
        <div className="row ">
          <div className="col-12 col-lg-6">
            <h1 style={{ color: "#264653", fontWeight: 600 }}>
              Apply For <span style={{ color: "#3E9B74" }}>Personal Loan</span>
            </h1>
            <p>
              A personal loan is a versatile financial tool that can help you
              achieve your goals and manage unexpected expenses. Whether you're
              planning a dream vacation, consolidating high-interest debts, or
              covering medical bills, a personal loan can provide the funds you
              need. With competitive interest rates and flexible repayment
              terms, it's a convenient option for individuals seeking quick
              access to cash. The application process is simple, and approval is
              often based on your creditworthiness. Remember to carefully review
              the terms and conditions before committing to a personal loan to
              ensure it aligns with your financial needs and goals.
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
            <img style={{ width: "100%" }} src={personalLoanimg} alt="..." />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default PersonalLoan;
