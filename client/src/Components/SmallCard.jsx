import React from "react";
import { Link } from "react-router-dom";

const SmallCard = () => {
  const smallCardData = [
    {
      img: require("../assets/loanImg4.png"),
      title: "Credit Card Rewards",
      description:
        "Credit card rewards are incentives, like cashback or points, earned on purchases. They can be redeemed for discounts, travel, or other benefits.",
    },
    {
      img: require("../assets/creditCard1.avif"),
      title: "Credit Card Debt Management",
      description:
        "Credit card debt management involves budgeting, paying bills on time, reducing spending, and exploring consolidation or balance transfer options to control and eliminate high-interest debts.",
    },
    {
      img: require("../assets/creditCard2.avif"),
      title: "Credit Card Security Tips",
      description:
        "Protect your credit card: Use secure websites, check statements regularly, don't share PINs, and set up alerts for unusual activity to prevent fraud. ",
    },
  ];
  return (
    <div>
      {smallCardData.map((items, index) => {
        return (
          <div
            className="card"
            style={{ width: "18rem", marginBottom: "11px" }}
          >
            <img
              style={{ width: "100%", height: "150px" }}
              src={items.img}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{items.title}</h5>
              <p className="card-text" style={{ fontSize: "15px" }}>
                {items.description}
              </p>
              <Link style={{ textDecoration: "none" }} to="#" className="">
                Read more
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SmallCard;