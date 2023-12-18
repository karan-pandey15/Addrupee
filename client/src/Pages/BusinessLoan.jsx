import React from "react";
import { Link } from "react-router-dom";
import businessLoanimg from "../assets/businessLoanimg.png";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";

const BusinessLoan = () => {
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
                <span style={{ color: "#3E9B74" }}>Business Loan</span>
              </h1>
              <p>
                Business loans are financial products provided by banks, credit
                unions, or online lenders to help businesses access capital for
                various purposes, such as expansion, working capital, or
                equipment purchase. These loans come in different forms,
                including term loans, lines of credit, and SBA loans. Lenders
                evaluate a business's creditworthiness, financial history, and
                business plan before approving a loan. Interest rates and terms
                vary based on the type of loan and the borrower's credit
                profile. Businesses use the funds to invest in growth
                opportunities, manage cash flow, or cover unexpected expenses.
                Repayment terms typically range from months to years, depending
                on the loan type.
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
              <img style={{ width: "100%" }} src={businessLoanimg} alt="..." />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusinessLoan;
