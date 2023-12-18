import React from "react";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";
import blogImg from "../assets/blogImg.png";
import personalLoanBlog1 from "../assets/personalLoanBlog1.png";
import { Link } from "react-router-dom";
import Card from "../Components/Card";
import SmallCard from "../Components/SmallCard";
import ApplynowBtn from "../Components/ApplynowBtn";

const Blog = () => {
  return (
    <div>
      <TopNav />
      <NavbarComp />
      <div>
        <div style={{ backgroundColor: "#E7E5E5" }}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-4 col-md-4">
                <img style={{ width: "100%" }} src={blogImg} alt="..." />
              </div>
              <div className="col-12 col-lg-8 col-md-8 pt-4">
                <h2 style={{ color: "#264653", fontWeight: 700 }}>
                  <span style={{ color: "#036E8C" }}>Add</span>
                  <span style={{ color: "#3E9A73" }}>Rupee</span> Blogs
                </h2>
                <p>
                  Explore financial insights, loan tips, and credit card
                  expertise on AddRupee for smarter money management and
                  financial well-being.
                </p>
                <div className="input-group pt-5">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div className="row pt-5">
              <div className="col-12 col-lg-8 col-md-8">
                <div>
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={personalLoanBlog1}
                          className="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">What is Personal Loan</h5>
                          <p className="card-text">
                            A personal loan is an unsecured, fixed or
                            variable-interest loan that individuals can borrow
                            from financial institutions, such as banks or online
                            lenders, to meet various personal financial needs,
                            like debt consolidation, home improvements, or
                            unexpected expenses. Repayment is typically in
                            monthly installments.
                          </p>
                          <p className="card-text">
                            <Link
                              style={{ textDecoration: "none" }}
                              to={"#"}
                              className=""
                            >
                              Read more
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <Card />
                </div>
              </div>
              <div className="col-12 col-lg-4 col-md-4">
                <SmallCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ApplynowBtn />
      <Footer />
    </div>
  );
};

export default Blog;
