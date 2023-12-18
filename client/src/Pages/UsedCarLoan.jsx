import React from "react";
import { Link } from "react-router-dom";
import carLoan from "../assets/carLoan.png";
import NavbarComp from "../Components/Navbar";
import TopNav from "../Components/TopNav";
import Footer from "../Components/Footer";

const UsedCarLoan = () => {
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
                <span style={{ color: "#3E9B74" }}>Used Car Loan</span>
              </h1>
              <p>
                A used car loan is a type of financial product designed to help
                individuals purchase pre-owned vehicles. These loans are offered
                by banks, credit unions, and other financial institutions. To
                qualify, borrowers typically need a good credit history and may
                be required to make a down payment. The loan term can vary but
                is often between 36 to 72 months. Interest rates on used car
                loans can depend on factors such as credit score, loan term, and
                the age of the vehicle. It's essential to shop around for the
                best rates and terms to ensure affordability. Used car loans
                make buying a second-hand vehicle more accessible to consumers,
                spreading the cost over time. However, borrowers should be
                mindful of the total cost of borrowing and any additional fees
                associated with the loan.
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
              <img style={{ width: "100%" }} src={carLoan} alt="..." />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UsedCarLoan;
