import React, { useState } from "react";

import customerApplyImg from "../assets/aboutImg.png";
import { Link } from "react-router-dom";

const CustomerApply = () => {
  const paragraphText =
    "AddRupee, your trusted partner for financial solutions! We understand that your financial needs vary, so we offer two convenient options for you. Whether you're looking for a loan to meet your immediate requirements or seeking to manage your expenses with a credit card, we've got you covered. Click 'Apply for Loan' to access our range of tailored loan options or 'Apply for Credit Card' to explore our diverse credit card offerings. We're here to make your financial journey smooth and stress-free. Choose the path that suits you best, and let's take the first step toward your financial goals.";

  const [showFullText, setShowFullText] = useState(false);
  const maxLength = 200;
  const truncatedText = showFullText
    ? paragraphText
    : paragraphText.slice(0, maxLength);

  return (
    <div style={{ backgroundColor: "#E7E5E5" }}>
      <style jsx>{`
        .read-more-link {
          color: blue;
          cursor: pointer;
          margin-left: 5px;
        }

        .read-more-link:hover {
          text-decoration: underline;
        }
      `}</style>
      <section style={{ padding: "20px" }}>
        <div className="container d-flex justify-content-center align-items-center flex-column ">
          <h2 style={{ fontWeight: 700, color: "#264653" }}>
            Apply Online For <span style={{ color: "#036E8C" }}>Loan</span> &{" "}
            <span style={{ color: "#3F9E7E" }}>Credit Card</span>
          </h2>
          {/* <p className="mt-2" style={{ fontSize: "18px" }}>
            AddRupee, your trusted partner for financial solutions! We
            understand that your financial needs vary, so we offer two
            convenient options for you. Whether you're looking for a loan to
            meet your immediate requirements or seeking to manage your expenses
            with a credit card, we've got you covered. Click 'Apply for Loan' to
            access our range of tailored loan options or 'Apply for Credit Card'
            to explore our diverse credit card offerings. We're here to make
            your financial journey smooth and stress-free. Choose the path that
            suits you best, and let's take the first step toward your financial
            goals.
          </p> */}
          <h5 className="mt-3" style={{ fontWeight: 600, color: "#264653" }}>
            Unlock Your Financial Potential with Wish Credit Card & Loans –
            Where Dreams Meet Reality
          </h5>
          <hr />

          <div className="pt-3">
            <Link to={"/cust_loan_apply"}>
              <button
                className="cust_apply_box"
                style={{
                  backgroundColor: "#036E8C",
                  border: "none",
                  color: "#ffffff",
                  margin: "20px",
                  padding: "40px 60px",
                  borderRadius: "8px",
                  fontSize: "24px",
                  fontWeight: 600,
                }}
              >
                Apply for <br /> Loan
              </button>
            </Link>
            <Link to={"/cust_card_apply"}>
              <button
                className="cust_apply_box"
                style={{
                  backgroundColor: "#3F9E7E",
                  border: "none",
                  color: "#ffffff",
                  padding: "40px 60px",
                  borderRadius: "8px",
                  fontSize: "24px",
                  fontWeight: 600,
                }}
              >
                Apply for <br /> Credit Card
              </button>
            </Link>
          </div>

          <p className="mt-2" style={{ fontSize: "18px" }}>
            {truncatedText}
            {!showFullText && paragraphText.length > maxLength && (
              <span
                className="read-more-link"
                onClick={() => setShowFullText(true)}
              >
                Read More
              </span>
            )}
          </p>

          <div className="row mb-3">
            <div
              className="col-12 col-lg-8 col-md-6 "
              style={{ paddingTop: "50px" }}
            >
              <p style={{ fontSize: "18px" }}>
                In the digital age, AddRupee redefines the loan and credit card
                application process. Our online services eliminate in-person
                visits, offering personalized credit options based on credit
                history and preferences. Transparent information empowers users
                to make informed choices, with a streamlined application process
                for swift approvals. The platform simplifies comparisons of
                lenders and card issuers for the best deals. Online security is
                a top priority. AddRupee and trusted platforms simplify finance,
                granting control and adaptability for borrowing and spending
                needs. In summary, AddRupee represents the shift towards
                hassle-free, secure, and adaptable financial solutions in the
                modern era.{" "}
              </p>
            </div>
            <div className="col-12 col-lg-4 col-md-6">
              <img style={{ width: "100%" }} src={customerApplyImg} alt="..." />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerApply;
