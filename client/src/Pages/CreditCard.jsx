import React from "react";
import { Link } from "react-router-dom";
import creditCard from "../assets/creditCard.png";
import NavbarComp from "../Components/Navbar";
import TopNav from "../Components/TopNav";
import Footer from "../Components/Footer";

const CreditCard = () => {
  return (
    <div>
    <TopNav />
    <NavbarComp />
      <div style={{ backgroundColor: "#E7E5E5" }}>
        <div className="container py-5">
          <div className="row ">
            <div className="col-12 col-lg-6">
              <h1 style={{ color: "#264653", fontWeight: 600 }}>
                Apply For <span style={{ color: "#3E9B74" }}>Credit Card</span>
              </h1>
              <p>
                Credit card data refers to sensitive financial information
                associated with a credit card account. This data typically
                includes the cardholder's name, credit card number, expiration
                date, and CVV (Card Verification Value) code. It is used to
                authorize and process transactions when making purchases or
                payments. Protecting this information is crucial to prevent
                fraud and identity theft. Security measures such as encryption,
                tokenization, and two-factor authentication are employed by
                financial institutions and merchants to safeguard credit card
                data. Unauthorized access or disclosure of this data can lead to
                financial losses and privacy breaches, making it imperative for
                individuals and businesses to prioritize its security.
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
              <img style={{ width: "100%" }} src={creditCard} alt="..." />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreditCard;
