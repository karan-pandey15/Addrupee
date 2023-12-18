import React from "react";
import {
  BsFillPeopleFill,
  BsPersonHeart,
  BsBank2,
  BsFillChatQuoteFill,
} from "react-icons/bs";
import { BiBorderNone, BiCalendarCheck } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

const HomeWrapper = () => {
  return (
    <>
      <section className="homeWrapper--section">
        <div className="container">
          <div className="row">
            <div className="col-6 col-lg-3">
              <h4>
                <span
                  style={{
                    fontSize: "26px",
                    paddingRight: "8px",
                    color: "#64B6A5",
                  }}
                >
                  <BsFillChatQuoteFill />
                </span>
                Quick & Easy Loan Approvals
              </h4>
            </div>
            <div className="col-6 col-lg-3">
              <h4>
                <span
                  style={{
                    fontSize: "26px",
                    paddingRight: "8px",
                    color: "#64B6A5",
                  }}
                >
                  <BsPersonHeart />
                </span>
                5,000K+ Customers Satisfied
              </h4>
            </div>
            <div className="col-6 col-lg-3">
              <h4>
                <span
                  style={{
                    fontSize: "26px",
                    paddingRight: "8px",
                    color: "#64B6A5",
                  }}
                >
                  <BiBorderNone />
                </span>
                No Prepayment or Hidden Fees
              </h4>
            </div>
            <div className="col-6 col-lg-3 p-3 p-lg-0 ">
              <h4>
                <span
                  style={{
                    fontSize: "26px",
                    paddingRight: "8px",
                    color: "#64B6A5",
                  }}
                >
                  <MdOutlineLocationOn />
                </span>
                20+ branches all over India
              </h4>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-6 col-lg-3">
              <h4>
                <span
                  style={{
                    fontSize: "26px",
                    paddingRight: "8px",
                    color: "#64B6A5",
                  }}
                >
                  <BsBank2 />
                </span>
                50+ Banks and NBFCs
              </h4>
            </div>
            <div className="col-6 col-lg-3">
              <h4>
                <span
                  style={{
                    fontSize: "26px",
                    paddingRight: "8px",
                    color: "#64B6A5",
                  }}
                >
                  <BsFillPeopleFill />
                </span>
                100+ Team Members
              </h4>
            </div>
            <div className="col-6 col-lg-3">
              <h4>
                <span
                  style={{
                    fontSize: "26px",
                    paddingRight: "8px",
                    color: "#64B6A5",
                  }}
                >
                  <BiCalendarCheck />
                </span>
                5+ Years of Experience
              </h4>
            </div>
            <div className="col-6 col-lg-3 p-3 p-lg-0 ">
              <h4>
                <span
                  style={{
                    fontSize: "26px",
                    paddingRight: "8px",
                    color: "#64B6A5",
                  }}
                >
                  <FaRupeeSign />
                </span>
                500 Cr+ Loan Disbursed
              </h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeWrapper;
