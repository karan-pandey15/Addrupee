import React from "react";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import mutualFund from "../assets/mutualFund.png";

const MutualFund = () => {
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
                  <span style={{ color: "#3E9B74" }}>Mutual Fund</span>
                </h1>
                <p>
                  A mutual fund is an investment vehicle that pools money from
                  numerous investors to purchase a diversified portfolio of
                  stocks, bonds, or other securities managed by professional
                  fund managers. Each investor owns shares in the fund, which
                  represent a portion of the overall holdings. Mutual funds
                  offer individuals a convenient way to diversify their
                  investments, reducing risk and providing access to
                  professional expertise. They come in various types, including
                  equity funds, bond funds, and mixed funds, catering to
                  different risk tolerances and investment goals. Mutual funds
                  offer liquidity, transparency, and the opportunity for capital
                  appreciation, making them a popular choice for long-term
                  investing and retirement planning.
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
                <img style={{ width: "100%" }} src={mutualFund} alt="..." />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MutualFund;