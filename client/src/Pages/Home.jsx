import React from "react";
import addrupeeText from "../assets/addrupeeText.png";
import homeImg from "../assets/homeImg.png";
import HomeWrapper from "../Components/HomeWrapper";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";
import BankSlider from "../Components/BankSlider";
import OurProducts from "../Components/HomePageComponents/OurProducts";
import WhyChooseAddRupee from "../Components/HomePageComponents/WhyChooseAddRupee";
import SimpleLoanProcess from "../Components/HomePageComponents/SimpleLoanProcess";
import OurBlogSummary from "../Components/HomePageComponents/OurBlogSummary";
import ApplynowBtn from "../Components/ApplynowBtn";

const Home = () => {
  return (
    <div>
      <TopNav />
      <NavbarComp />
      <section className="home_background pt-5 ">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 ">
              <h1 style={{ color: "#264653", fontWeight: 700 }}>
                If you need <span style={{ color: "#3E9D7C" }}>Rupee</span>?
                Think
                <img
                  style={{ height: "50px", width: "170px" }}
                  src={addrupeeText}
                  alt="..."
                />
              </h1>
              <p
                style={{ fontSize: "19px", fontWeight: 400, color: "#264653" }}
              >
                Addrupee is Distributor of secured and un secured loans. We have
                wide range of loans products like Personal Loans, Business Loan,
                Home Loan, Loans against Property, OD against Property, and Loan
                for Purchase of Commercial Property, Lease Rental Discounting,
                and Business Loans etc. Mind For Cost is professionally managed,
                having about two decades of domain knowledge and expertise.
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <img
                style={{ width: "100%", borderRadius: "15px" }}
                src={homeImg}
                alt="..."
              />
            </div>
          </div>
        </div>
      </section>
      <div>
        <HomeWrapper />
      </div>
      <div>
        <OurProducts />
      </div>
      <div>
        <WhyChooseAddRupee />
      </div>
      <div>
        <SimpleLoanProcess />
      </div>
      <div>
        <BankSlider />
      </div>
      <div>
        <OurBlogSummary />
      </div>
      <ApplynowBtn />
      <Footer />
    </div>
  );
};

export default Home;
