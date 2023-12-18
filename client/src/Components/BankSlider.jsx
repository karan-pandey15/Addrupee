import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuSmallFinanceImg from "../assets/bank-logos/au-small-finance-bank-logo.png";
import AxisImg from "../assets/bank-logos/axis-bank-logo.png";
import CapitalImg from "../assets/bank-logos/capital-bank-logo.jpg";
import HdfcImg from "../assets/bank-logos/hdfc-bank-logo.webp";
import IciciImg from "../assets/bank-logos/icici-bank-logo.png";
import IdfcImg from "../assets/bank-logos/idfc-bank-logo.png";
import IndusIndImg from "../assets/bank-logos/IndusInd-logo.png";
import KotakImg from "../assets/bank-logos/kotak-logo.png";
import UjjivanImg from "../assets/bank-logos/ujjivan-small-finance-bank-logo.png";
import UtkarshImg from "../assets/bank-logos/utkarsh-small-finance-bank-logo.png";
import YesImg from "../assets/bank-logos/Yes_Bank_logo.png";

const BankSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section style={{ backgroundColor: "#3E9B77", padding: "20px 0" }}>
      <div className="container">
        <h2
          style={{
            color: "#ffffff",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          {" "}
          Banks in our Network
        </h2>
        <Slider {...settings}>
          <div className="card" style={{ width: "200px", height: "200px" }}>
            <img src={HdfcImg} alt="..." className="w-100" />
          </div>
          <div className="card" style={{ width: "200px", height: "200px" }}>
            <img src={IdfcImg} alt="..." className="w-100" />
          </div>
          <div className="card" style={{ width: "200px", height: "200px" }}>
            <img src={AuSmallFinanceImg} alt="..." className="w-100" />
          </div>
          <div className="card" style={{ width: "200px", height: "200px" }}>
            <img src={CapitalImg} alt="..." className="w-100" />
          </div>
          <div className="card" style={{ width: "200px", height: "200px" }}>
            <img src={AxisImg} alt="..." className="w-100" />
          </div>
          <div className="card" style={{ width: "200px", height: "200px" }}>
            <img src={IciciImg} alt="..." className="w-100" />
          </div>
          <div className="card" style={{ width: "200px", height: "200px" }}>
            <img src={IndusIndImg} alt="..." className="w-100" />
          </div>
          <div className="card" style={{ width: "200px", height: "200px" }}>
            <img src={KotakImg} alt="..." className="w-100" />
          </div>
          <div className="card" style={{ width: "200px", height: "200px" }}>
            <img src={UjjivanImg} alt="..." className="w-100" />
          </div>
          <div className="card" style={{ width: "200px", height: "200px" }}>
            <img src={YesImg} alt="..." className="w-100" />
          </div>
          <div className="card" style={{ width: "200px", height: "200px" }}>
            <img src={UtkarshImg} alt="..." className="w-100" />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default BankSlider;
