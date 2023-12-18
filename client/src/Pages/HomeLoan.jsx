import React from "react";
import { Link } from "react-router-dom";
import homeLoanimg from "../assets/homeLoanimg.png";
import Footer from "../Components/Footer";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";

const HomeLoan = () => {
  return (
    <div>
    <TopNav />
    <NavbarComp />
      <div style={{ backgroundColor: "#E7E5E5" }}>
        <div className="container ">
          <div className="row ">
            <div style={{ padding: "80px 30px" }} className="col-12 col-lg-6">
              <h1 style={{ color: "#264653", fontWeight: 600 }}>
                Apply For <span style={{ color: "#3E9B74" }}>Home Loan</span>
              </h1>
              <p>
                Home loan data refers to information related to loans taken out
                by individuals or families to finance the purchase or renovation
                of a residential property. This data typically includes details
                about the borrower's financial history, credit score, income,
                employment status, loan amount, interest rate, and repayment
                terms. Lenders use this data to assess the borrower's
                creditworthiness and determine the terms of the loan. It also
                plays a crucial role in risk management and compliance for
                financial institutions. Home loan data is subject to privacy
                regulations, and lenders must secure and protect this
                information to ensure the confidentiality and security of their
                customers' financial records.
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
              <img style={{ width: "100%" }} src={homeLoanimg} alt="..." />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default HomeLoan;
