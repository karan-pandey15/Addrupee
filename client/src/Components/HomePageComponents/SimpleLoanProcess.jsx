import React from "react";
import { TbWriting } from "react-icons/tb";
import { IoDocuments } from "react-icons/io5";
import { FaRupeeSign, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SimpleLoanProcess = () => {
  return (
    <section style={{ backgroundColor: "#EEECED" }} className="py-4">
      <div className="container">
        <h2 style={{ color: "#264653", fontWeight: 700, textAlign: "center" }}>
          Simple Loan Process
        </h2>
        <p style={{ color: "gray", textAlign: "center" }}>
          Streamlined simplicity at AddRupee: hassle-free loan processing. From
          application to approval, experience a straightforward and efficient
          lending journey with us.
        </p>
        <div className="row">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="col-12 col-lg-3 col-md-6 "
          >
            <div
              style={{
                height: "120px",
                width: "120px",
                backgroundColor: "gray",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "#036E8C",
              }}
              className="SimpleLoanProcess_Img"
            >
              <h1 style={{ fontSize: "55px" }}>
                <TbWriting />
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "30px",
              }}
            >
              <h4
                style={{ color: "#264653", fontWeight: 600, fontSize: "23px" }}
              >
                Choose Loan Amount
              </h4>
              <p style={{ textAlign: "center", color: "gray" }}>
                Choose your loan amount and terms to use loan
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="col-12 col-lg-3 col-md-6 "
          >
            <div
              style={{
                height: "120px",
                width: "120px",
                backgroundColor: "gray",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "#036E8C",
                fontSize: "55px",
              }}
              className="SimpleLoanProcess_Img"
            >
              <h1 style={{ fontSize: "55px" }}>
                <IoDocuments />
              </h1>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "30px",
              }}
            >
              <h4
                style={{ color: "#264653", fontWeight: 600, fontSize: "23px" }}
              >
                Provide Document
              </h4>
              <p style={{ textAlign: "center", color: "gray" }}>
                Need to provide some basic document to verification
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="col-12 col-lg-3 col-md-6 "
          >
            <div
              style={{
                height: "120px",
                width: "120px",
                backgroundColor: "gray",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "#036E8C",
                fontSize: "55px",
              }}
              className="SimpleLoanProcess_Img"
            >
              <h1 style={{ fontSize: "55px" }}>
                <FaCheckCircle />
              </h1>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  paddingTop: "30px",
                }}
              >
                <h4
                  style={{
                    color: "#264653",
                    fontWeight: 600,
                    fontSize: "23px",
                  }}
                >
                  Approved Loan
                </h4>
                <p style={{ textAlign: "center", color: "gray" }}>
                  Our loan specialist ask fews question and verify docuements.
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="col-12 col-lg-3 col-md-6 "
          >
            <div
              style={{
                height: "120px",
                width: "120px",
                backgroundColor: "gray",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "#036E8C",
                fontSize: "55px",
              }}
              className="SimpleLoanProcess_Img"
            >
              <h1 style={{ fontSize: "55px" }}>
                <FaRupeeSign />
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "30px",
              }}
            >
              <h4
                style={{ color: "#264653", fontWeight: 600, fontSize: "23px" }}
              >
                Get your Money
              </h4>
              <p style={{ textAlign: "center", color: "gray" }}>
                Once loan aprroved you get loan amount credit.
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            style={{ backgroundColor: "#036E8C", color: "#ffffff" }}
            className="btn"
            to={"/customer_signin"}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SimpleLoanProcess;
