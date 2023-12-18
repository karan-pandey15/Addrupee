// src/PrivacyPolicy.js
import React from "react";
import "./PrivacyPolicy.css";
import NavbarComp from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const TermConditionPage = () => {
  return (
    <div>
      <NavbarComp />
      <div style={{ marginTop: "50px" }} className="container">
        <h1 className="main-heading">Privacy Policy and Terms of Use</h1>

        <p className="paragraph">
          Welcome to AddRupee We value your trust and want to ensure that you
          have a clear understanding of how we handle your personal data. By
          using our services, you agree to the terms outlined in this Privacy
          Policy and Terms of Use.
        </p>

        <p className="paragraph">
          <strong>1. Collection of Personal Information</strong>
          <br />
          In order to provide you with our services, we collect certain personal
          information, including but not limited to your name, address, email,
          phone number, Aadhar card number, PAN card number, salary slip, and
          other relevant documents. This information is collected with your
          consent and is used for the sole purpose of facilitating our services
          and improving your user experience.
        </p>

        <p className="paragraph">
          <strong>2. Use of Personal Information</strong>
          <br />
          Your personal data is used for the following purposes:
          <ul>
            <li>To verify your identity and eligibility for our services.</li>
            <li>
              To communicate with you regarding our services, updates, and
              promotions.
            </li>
            <li>To process transactions and fulfill your requests.</li>
            <li>
              To enhance and personalize your experience with our platform.
            </li>
          </ul>
        </p>

        <p className="paragraph">
          <strong>3. Sharing of Personal Information</strong>
          <br />
          We may share your personal information under the following
          circumstances:
          <ul>
            <li>
              With third-party service providers who assist us in delivering our
              services.
            </li>
            <li>
              When required by law or to protect our rights and interests.
            </li>
            <li>
              In the event of a merger, acquisition, or sale of all or a portion
              of our assets.
            </li>
          </ul>
        </p>

        <p className="paragraph">
          <strong>4. Security Measures</strong>
          <br />
          We take the security of your personal data seriously. We implement
          industry-standard security measures to protect against unauthorized
          access, disclosure, alteration, and destruction of your personal
          information.
        </p>

        <p className="paragraph">
          <strong>5. Consent</strong>
          <br />
          By using our services, you consent to the collection, use, and sharing
          of your personal information as outlined in this Privacy Policy.
        </p>

        <p className="paragraph">
          <strong>6. Changes to the Privacy Policy</strong>
          <br />
          We reserve the right to update or modify this Privacy Policy at any
          time. Any changes will be effective immediately upon posting the
          updated Privacy Policy on our website.
        </p>

        <p className="paragraph">
          <strong>Contact Us</strong>
          <br />
          If you have any questions or concerns about our Privacy Policy, please
          contact us at forpradeepmishra@gmail.com.
        </p>

        <p className="paragraph">
          Thank you for trusting AddRupee . We are committed to safeguarding
          your privacy and providing you with a secure and enjoyable user
          experience.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermConditionPage;
