import React from "react";
// import SignIn from "../Components/SignIn";
import { Link } from "react-router-dom";
import portalImg from "../assets/portalimg.jpg";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";

const ApplyNow = () => {
  return (
    <div>
    <TopNav />
    <NavbarComp />
      <div style={{ backgroundColor: "#E7E5E5" }}>
        <div className="container p-5">
          <div className="row ">
            <div className="col-12 col-lg-6 ">
              <h2 style={{ color: "#264653", fontWeight: 600 }}>
                Welcome to the Addrupee Login Portal!
              </h2>
              <p>
                At Addrupee, we believe in fostering strong relationships and
                providing seamless experiences for all our users. Our
                user-centric approach shines through in our three distinctive
                login options: Employee Login, Customer Login, and Partner
                Login. Each login portal is designed to cater to your specific
                needs, ensuring a personalized and efficient journey every step
                of the way.
              </p>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="pb-3"
              >
                <button
                  style={{ backgroundColor: "#036E8C" }}
                  className="btn m-2"
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={"/customer_signin"}
                  >
                    Customer
                  </Link>
                </button>
                <button
                  style={{ backgroundColor: "#036E8C" }}
                  className="btn m-2"
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={"/signin"}
                  >
                    Employee
                  </Link>
                </button>
                <button style={{ backgroundColor: "#036E8C" }} className="btn ">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={"/signin"}
                  >
                    Partner
                  </Link>
                </button>
              </div>
              <p>
                At Addrupee, your convenience, security, and satisfaction are
                our top priorities. Our login portals are designed to reflect
                these values and offer an exceptional user experience. Join us
                today and discover a world of possibilities through the
                Employee, Customer, and Partner Logins. Your journey with
                Addrupee starts here! Experience innovation, empowerment, and
                collaboration – all with a single login.
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <img
                style={{ width: "100%", borderRadius: "15px" }}
                src={portalImg}
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplyNow;
