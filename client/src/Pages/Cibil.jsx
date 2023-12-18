import React from "react";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";
import cibilImg from "../assets/cibilImg.png";
import ImproveCibil from "../Components/ImproveCibil";
import CibilBanner from "../Components/CibilBanner";
import KnowMoreCibil from "../Components/KnowMoreCibil";

const Cibil = () => {
  return (
    <div>
      <TopNav />
      <NavbarComp />
      <section style={{ backgroundColor: "#E7E5E5", paddingBottom: "20px" }}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center pb-4">
            <div className="col-12 col-lg-6 margin_cibil">
              <h3
                style={{
                  color: "#264653",
                  fontWeight: 700,
                  paddingBottom: "8px",
                }}
              >
                Unlock Financial Freedom: Elevate Your{" "}
                <span style={{ color: "#a7c957" }}>CIBIL Score</span> with
                <span style={{ color: "#036E8C" }}> Add</span>
                <span style={{ color: "#3E9D7C" }}>Rupee</span>
              </h3>
              <p
                style={{
                  fontWeight: 500,
                  color: "#264653",
                  paddingBottom: "8px",
                }}
              >
                At AddRupee, where we believe in empowering you on your journey
                to financial well-being. Your credit score is a key factor in
                realizing your financial dreams, and we are here to guide you on
                the path to improving it. A healthy CIBIL score not only opens
                doors to better loan opportunities but also reflects your
                financial responsibility.
              </p>
              <ul style={{ listStyle: "none", display: "flex" }}>
                <li>
                  <a
                    className="btn"
                    style={{
                      textDecoration: "none",
                      backgroundColor: "#036E8C",
                      color: "white",
                      fontWeight: 500,
                    }}
                    href="#improveCibil"
                  >
                    Improve Your Cibil
                  </a>
                </li>
                <li>
                  <a
                    className="btn"
                    style={{
                      textDecoration: "none",
                      border: "2px solid #036E8C",
                      color: "#036E8C",
                      marginLeft: "12px",
                      fontWeight: 600,
                    }}
                    href="#knowMore"
                  >
                    Know More
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-6 cibil_img">
              <img style={{ width: "100%" }} src={cibilImg} alt="Cibil" />
            </div>
          </div>
          <div id="improveCibil">
            <h4
              style={{
                color: "#264653",
                fontWeight: 600,
                paddingBottom: "16px",
                textAlign: "start",
              }}
            >
              Take the First Step Towards Improving Your Cibil
            </h4>
            <ImproveCibil />
          </div>
        </div>
        <div>
          <CibilBanner />
        </div>
        <div id="knowMore" className="container">
          <KnowMoreCibil />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cibil;
