import React from "react";
import careerImg from "../assets/careerImg.png";
import Footer from "../Components/Footer";
import NavbarComp from "../Components/Navbar";
import CareerFrom from "../Components/CareerFrom";
import addrupeeText from "../assets/addrupeeText.png";
import "./CareerPage.css";
import { Link } from "react-router-dom";

export default function CareerPage() {
  return (
    <div style={{ backgroundClip: "#E7E5E5" }}>
      <NavbarComp />
      {/*  First page  */}

      <div className="firstContainer">
        <div className="careerFirstDiv">
          <h3 className="careerHeading">Join Our Team At</h3>
          <img
            style={{ height: "50px", width: "180px" }}
            className="careerImg"
            src={addrupeeText}
            alt="..."
          />
          <p style={{ fontSize: "1rem" }}>
            Work at the most dyanmic and successFull Agency
          </p>
          <a
            style={{
              backgroundColor: "#007C9C",
              padding: "10px",
              borderRadius: 15,
              border: "none",
              fontWeight: "bold",
              color: "white",
              marginTop: "40px",
              width: "160px",
              textDecoration: "none",
            }}
            href={"#applynow"}
          >
            Apply Now
          </a>
        </div>

        <div className="imgContainer">
          <img src={careerImg} alt="careerImg" />
        </div>
      </div>

      {/*  second page  */}

      <div className="secondContainer">
        <div>
          <div
            className="CareerboxContainer"
            // style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
          >
            <div
              style={{
                height: "200px",
                width: "200px",
                borderRadius: "20px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: 10,
                cursor: "pointer",
              }}
              className="box1 box"
            >
              <img
                style={{ height: "50px", width: "50px" }}
                src={careerImg}
                alt="boxImg"
              />
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                Large Beautiful Office
              </p>
              <small
                style={{
                  fontSize: "12px",
                }}
              >
                lorem addiofjk edriojerejior ejreirjerie reijreirj re
                rioerererjerererjk
              </small>
            </div>
            <div
              style={{
                height: "200px",
                width: "200px",
                borderRadius: "20px",
                margin: 25,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: 10,
                cursor: "pointer",
              }}
              className="box2 box"
            >
              <img
                style={{ height: "50px", width: "50px" }}
                src={careerImg}
                alt="boxImg"
              />
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                Large Beautiful Office
              </p>
              <small
                style={{
                  fontSize: "12px",
                }}
              >
                lorem addiofjk edriojerejior ejreirjerie reijreirj re
                rioerererjerererjk
              </small>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div
              style={{
                height: "200px",
                width: "200px",
                borderRadius: "20px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: 10,
                cursor: "pointer",
              }}
              className="box1 box"
            >
              <img
                style={{ height: "50px", width: "50px" }}
                src={careerImg}
                alt="boxImg"
              />
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                Large Beautiful Office
              </p>
              <small
                style={{
                  fontSize: "12px",
                }}
              >
                lorem addiofjk edriojerejior ejreirjerie reijreirj re
                rioerererjerererjk
              </small>
            </div>
            <div
              style={{
                height: "200px",
                width: "200px",
                borderRadius: "20px",
                margin: 25,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: 10,
                cursor: "pointer",
              }}
              className="box2 box"
            >
              <img
                style={{ height: "50px", width: "50px" }}
                src={careerImg}
                alt="boxImg"
              />
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                Large Beautiful Office
              </p>
              <small
                style={{
                  fontSize: "12px",
                }}
              >
                lorem addiofjk edriojerejior ejreirjerie reijreirj re
                rioerererjerererjk
              </small>
            </div>
          </div>
        </div>

        <div
          style={{ width: "500px", padding: "10px", marginTop: "30px" }}
          className="textContainer"
        >
          <h3>Your Life at AddRupee</h3>
          <p style={{ fontSize: "13px", marginTop: 20 }}>
            yadfk dijfds fdsif djf dofji dfjd fdoijfd fjdf djfdfijd fjdf dsfojd
            f dfjdf djf dsfoijd foidjf dfjid fjdf dij fdfja fa fakfj adsf dsfds
            fjodfodsfjeorj dofijad fd fdfj dfidjfd idfjdfjdsfjdofjdofj ajf odd
            ojfao jfodajf ddf djfodo dsfj d a dfjd dfdfij a fdifj
          </p>
          <p style={{ fontSize: "13px", marginTop: 20 }}>
            your ldaifdfdfdf dfodfkdfjkdfjdfo ewafedfdef dfefredrferfe fjadsf
            dsfds fjodfodsfjeorj dofijad fd fdfj dfidjfd idfjdfjdsfjdofjdofj ajf
            oddojfaojfodajf ddfdjfodo dsfj d a dfjd dfdfij a fdifj ererererer
            dfdfdffdfdf
          </p>

          <button
            style={{
              backgroundColor: "#007C9C",
              padding: "10px",
              borderRadius: 15,
              border: "none",
              fontWeight: "bold",
              color: "white",
              marginTop: "40px",
              width: "160px",
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      {/*  Third page  */}

      <section className="homeWrapper--section">
        <div className=" wrapperContainer">
          <div style={{ color: "white", textAlign: "center" }} className="row">
            <div className="col-6 col-lg-3">
              <h4>
                <p>100+</p>
                <p>Team Members</p>
              </h4>
            </div>
            <div className="col-6 col-lg-3">
              <h4>
                <p>5000+</p>
                <p>Happy Customers</p>
              </h4>
            </div>
            <div className="col-6 col-lg-3">
              <h4>
                <p>10k+</p>
                <p>Happy Moments</p>
              </h4>
            </div>
            <div className="col-6 col-lg-3 p-3 p-lg-0 ">
              <h4>
                <p>20+</p>
                <p> branches all over India</p>
              </h4>
            </div>
          </div>
        </div>
      </section>
      <div id="applynow">
        <CareerFrom />
      </div>

      {/*  Four page  */}

      <div style={{ marginTop: "50px" }}>
        <h1 className="careerRec">
          Learn Our Recruiment <span style={{ color: "#007C9C" }}>Process</span>
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            margin: "60px 0",
          }}
        >
          <div
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "5px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: 10,
              cursor: "pointer",
              margin: "3px 0",
            }}
            className="box1 box"
          >
            <img
              style={{ height: "50px", width: "50px" }}
              src={careerImg}
              alt="boxImg"
            />
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Large Beautiful Office
            </p>
            <small
              style={{
                fontSize: "12px",
              }}
            >
              lorem addiofjk edriojerejior ejreirjerie reijreirj re
              rioerererjerererjk
            </small>
          </div>
          <div
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "5px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: 10,
              cursor: "pointer",
              margin: "3px 0",
            }}
            className="box2 box"
          >
            <img
              style={{ height: "50px", width: "50px" }}
              src={careerImg}
              alt="boxImg"
            />
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Large Beautiful Office
            </p>
            <small
              style={{
                fontSize: "12px",
              }}
            >
              lorem addiofjk edriojerejior ejreirjerie reijreirj re
              rioerererjerererjk
            </small>
          </div>
          <div
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "5px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: 10,
              cursor: "pointer",
              margin: "3px 0",
            }}
            className="box1 box"
          >
            <img
              style={{ height: "50px", width: "50px" }}
              src={careerImg}
              alt="boxImg"
            />
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Large Beautiful Office
            </p>
            <small
              style={{
                fontSize: "12px",
              }}
            >
              lorem addiofjk edriojerejior ejreirjerie reijreirj re
              rioerererjerererjk
            </small>
          </div>
          <div
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "5px",

              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: 10,
              cursor: "pointer",
              margin: "3px 0",
            }}
            className="box2 box"
          >
            <img
              style={{ height: "50px", width: "50px" }}
              src={careerImg}
              alt="boxImg"
            />
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Large Beautiful Office
            </p>
            <small
              style={{
                fontSize: "12px",
              }}
            >
              lorem addiofjk edriojerejior ejreirjerie reijreirj re
              rioerererjerererjk
            </small>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
