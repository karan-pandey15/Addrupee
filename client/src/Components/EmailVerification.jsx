import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import NavbarComp from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import successIcon from "../assets/successIcon.gif";

const EmailVerification = () => {
  const { code } = useParams();

  const [countdown, setCountdown] = useState(5);
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Make API call to the email verification endpoint
      axios
        .get(`http://localhost:5000/api/email-verification/${code}`)
        .then((response) => {
          if (
            response.data.VerificationStatus === "Verified" ||
            response.data.VerificationStatus === "AlreadyVerified"
          ) {
            setVerificationStatus("Mail verified successfully..");

            setTimeout(() => {
              navigate("/signin");
            }, 3000);
          } else {
            setVerificationStatus(response.data.Error);
          }
        })
        .catch((error) => {
          setVerificationStatus(error.response.data.Error);
        });
    }, 5000); // Make the API call after 5 seconds

    // Update the countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(timer);
    };
  }, [code, navigate]);

  return (
    <div>
      <TopNav />
      <NavbarComp />
      <div
        style={{
          backgroundColor: "#E7E5E5",
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {countdown > 0 ? (
          <div>
            <h2
              style={{
                color: "#264653",
                fontWeight: 600,
                paddingBottom: "10px",
              }}
            >
              {verificationStatus}
            </h2>
            <p style={{ color: "darkgray", fontWeight: 500 }}>
              Please wait for {countdown} seconds...
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              style={{ height: "250px" }}
              src={successIcon}
              alt="Success Icon"
            />
            <h2
              style={{
                color: "#264653",
                fontWeight: 600,
                paddingBottom: "10px",
              }}
            >
              {verificationStatus}
            </h2>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EmailVerification;
