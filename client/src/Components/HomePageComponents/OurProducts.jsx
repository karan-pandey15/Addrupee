import React from "react";
import plCard from "../../assets/pl_card.jpg";
import blCard from "../../assets/bl_card.jpg";
import hlCard from "../../assets/hl_card.jpg";
import clCard from "../../assets/cl_card.jpg";
import creditCard from "../../assets/credit_card.jpg";
import lapCard from "../../assets/lap_card.jpg";
import odCard from "../../assets/od_card.jpg";
import MutualFund from "../../assets/MutualFunds.jpg";
import ImproveCibil from "../../assets/ImproveCibil.jpg";
import "../../Styles/App.css";
import { Link } from "react-router-dom";

const OurProducts = () => {
  return (
    <>
      <section style={{ backgroundColor: "#EEECED" }} className="py-3">
        <div className="container">
          <h3
            className="text-center"
            style={{ color: "#264653", fontWeight: "700", fontSize: "32px" }}
          >
            Our Products
          </h3>
          <p
            style={{
              color: "gray",
              fontWeight: "500",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            We have range of product for your loan solutions
          </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div className="card ourProducts_card">
              <img src={plCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Personal Loan</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Personal loans provide financial flexibility, helping
                  individuals meet diverse needs. Unsecured, they require no
                  collateral, simplifying access to funds.
                </p>
                <Link to={"/personal-loan"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <img src={blCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Business Loan</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Business loans empower enterprises with capital for growth,
                  operations, and expansion. Tailored to business needs, they
                  fuel entrepreneurial success.
                </p>
                <Link to={"/business-loan"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <img src={hlCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Home Loan</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Home loans make homeownership a reality, providing funds for
                  property purchases. Repaid over time, they facilitate
                  long-term housing aspirations.
                </p>
                <Link to={"/home-loan"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <img src={lapCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Laon Against Property</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Loan Against Property leverages property value for substantial
                  funds. Secured, it offers financial flexibility for various
                  needs with extended repayment.
                </p>
                <Link to={"/loan-against-property"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <img src={clCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Used Card Loan</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Used Car Loans offer financing for pre-owned vehicles,
                  enabling buyers to afford quality cars. Convenient repayment
                  plans simplify the process.
                </p>
                <Link to={"/car-loan"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <img src={odCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">OD/CC/Working Capital</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  OD/CC/Working Capital loans provide businesses with flexible
                  funds to manage day-to-day operations, ensuring liquidity and
                  supporting growth initiatives.
                </p>
                <Link to={"/od-cc-workingCapital"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <img src={creditCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Credit Card</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Credit cards provide convenient, cashless transactions,
                  offering a revolving credit line. They're versatile for
                  purchases, and often include rewards.
                </p>
                <Link to={"/credit-card"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <img src={MutualFund} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Mutual Funds</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Mutual funds pool money from investors to invest in
                  diversified securities. They offer a convenient way for wealth
                  growth.
                </p>
                <Link to={"/mutal-funds"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <img src={ImproveCibil} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Improve Your Cibil</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Enhance your CIBIL score by timely payments, reducing debt,
                  and monitoring credit reports. Boost financial health for
                  better loan approvals.
                </p>
                <Link to={"/cibil-issue"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>

            <div className="card ourProducts_card">
              <img src={ImproveCibil} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Health Insurance</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Health insurance provides financial protection by covering
                  medical expenses, ensuring access to quality healthcare, and
                  promoting overall well-being for individuals and families.
                </p>
                <Link to={"/cibil-issue"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>

            <div className="card ourProducts_card">
              <img src={ImproveCibil} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">General Insurance</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  General insurance protects against diverse risks like property
                  damage, liability, and unforeseen events, providing
                  comprehensive financial security.
                </p>
                <Link to={"/cibil-issue"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>

            <div className="card ourProducts_card">
              <img src={creditCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">SecureGuard Insurance</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  SecureGuard Insurance provides reliable coverage, protecting
                  you from financial setbacks with a focus on security and peace
                  of mind.
                </p>
                <Link to={"/credit-card"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurProducts;
