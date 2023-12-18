import React from "react";
import { Link } from "react-router-dom";
import loanAgainstimg from "../assets/loanAgainstimg.png";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";

const LoanAgainstProperty = () => {
  return (
    <div>
    <TopNav />
    <NavbarComp />
      <div style={{ backgroundColor: "#E7E5E5" }}>
        <div className="container py-5">
          <div className="row ">
            <div className="col-12 col-lg-6">
              <h1 style={{ color: "#264653", fontWeight: 600 }}>
                Apply For{" "}
                <span style={{ color: "#3E9B74" }}>Loan Against Property</span>
              </h1>
              <p>
                A loan against property, also known as a mortgage loan, allows
                individuals to borrow money by leveraging their residential or
                commercial property as collateral. The lender assesses the
                property's value and offers a loan amount based on a percentage
                of that value. Interest rates for such loans are typically lower
                than unsecured loans, making it a cost-effective borrowing
                option. Borrowers can use this type of loan for various
                purposes, such as debt consolidation, business expansion, or
                meeting personal financial needs. However, defaulting on
                payments can lead to the foreclosure of the property, so it's
                essential to manage repayments responsibly.
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
              <img style={{ width: "100%" }} src={loanAgainstimg} alt="..." />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoanAgainstProperty;
